import { redirect } from "react-router";

import { loaderActionInterface } from "../../utils/interfaces";

export default async function profileAction({
    request,
}: loaderActionInterface) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const formData = await request.formData();
        const postId = formData.get("postId");
        const commentId = formData.get("commentId");
        const notificationId = formData.get("notificationId");
        const bioContent = formData.get("bio-content");
        const currentPass = formData.get("current-password");
        const newPass = formData.get("new-password");
        const confirmPass = formData.get("confirm-password");
        const email = formData.get("email");
        const emailPass = formData.get("email-password");
        const emailCode = formData.get("update-code");
        const deleteAccount = formData.get("delete-account");
        const pfpImage = formData.get("pfp");
        const pfpAlt = formData.get("pfp-alt");
        const replySetting = formData.get("notification-setting");
        let reqMethod = "";
        let reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/`;
        let reqBody = {};
        if (!token || !userId) {
            throw new Error("You must log in before performing that action");
        }
        if (typeof postId === "string") {
            reqMethod = "DELETE";
            reqUrl = `${reqUrl}posts/${postId}`;
        } else if (typeof commentId === "string") {
            reqMethod = "DELETE";
            reqUrl = `${reqUrl}comments/${commentId}`;
        } else if (typeof notificationId === "string") {
            reqMethod = "DELETE";
            reqUrl = `${reqUrl}users/profile/notifications/${notificationId}`;
        } else if (typeof bioContent === "string") {
            const bioReg = new RegExp("^[a-zA-Z0-9 .:,?/_'!@=%\r\n-]+$");
            if (!bioReg.test(bioContent)) {
                throw new Error(
                    "Please do not include special characters in your message"
                );
            }
            reqUrl = `${reqUrl}users/profile/bio`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Update user bio",
                bioContent,
            };
        } else if (typeof deleteAccount === "string") {
            reqMethod = "DELETE";
            reqUrl = `${reqUrl}users/profile`;
        } else if (typeof pfpImage === "string" && typeof pfpAlt === "string") {
            reqUrl = `${reqUrl}users/profile/image`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Update user pfp",
                pfpName: pfpImage,
                pfpAlt,
            };
        } else if (
            typeof currentPass === "string" &&
            typeof newPass === "string" &&
            typeof confirmPass === "string"
        ) {
            if (newPass !== confirmPass) {
                throw new Error(
                    "The values in the password and confirm password fields must match"
                );
            }
            const passReg = new RegExp("^[a-zA-Z0-9.:,?/_'!@-]+$");
            if (!passReg.test(newPass)) {
                throw new Error(
                    "Please do not include special characters in your message"
                );
            }
            reqUrl = `${reqUrl}users/profile/password`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Update password request",
                reqCurrentPass: currentPass,
                reqNewPass: newPass,
            };
        } else if (typeof email === "string" && typeof emailPass === "string") {
            reqUrl = `${reqUrl}users/profile/email`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Update email request",
                email: email,
                password: emailPass,
            };
        } else if (typeof emailCode === "string") {
            reqUrl = `${reqUrl}users/profile/email/complete`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Verify epdate email request",
                code: emailCode,
            };
        } else if (typeof replySetting === "string") {
            reqUrl = `${reqUrl}users/profile/notifications`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Update notification setting request",
            };
        } else {
            throw new Error("No profile action selected");
        }
        const fetchReq =
            reqMethod === "POST" || reqMethod === "PATCH"
                ? new Request(reqUrl, {
                      method: reqMethod,
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                          "user_id": userId,
                      },
                      body: JSON.stringify(reqBody),
                  })
                : new Request(reqUrl, {
                      method: reqMethod,
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                          "user_id": userId,
                      },
                  });
        const res = await fetch(fetchReq);
        if (!res.ok) {
            const errorData = await res.json();
            if (errorData && errorData.message) {
                throw new Error(errorData.message);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
        }
        const data = await res.json();
        if (data && typeof data === "object" && "message" in data) {
            if (data.message === "Account deleted successfully") {
                return redirect("/?message=Account_deleted_successfully");
            } else if (
                "newProfilePicName" in data &&
                "newProfilePicAlt" in data
            ) {
                return data;
            } else {
                return data.message;
            }
        } else {
            throw new Error("Unspecified profile action completed");
        }
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        const errorTime = new Date();
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return `Error: ${errorMsg}-Target ID-${errorTime}`;
    }
}
