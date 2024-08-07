import { redirect } from "react-router-dom";

import { loaderActionInterface } from "../utils/interfaces";

export default async function profileAction({
    request,
}: loaderActionInterface) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const formData = await request.formData();
        const id = formData.get("id");
        const post = formData.get("post");
        const comment = formData.get("comment");
        const notification = formData.get("notification");
        const bioContent = formData.get("bio-content");
        const currentPass = formData.get("current-password");
        const newPass = formData.get("new-password");
        const confirmPass = formData.get("confirm-password");
        const deleteAccount = formData.get("delete-account");
        const pfpImage = formData.get("pfp");
        const pfpAlt = formData.get("pfp-alt");
        let reqMethod = "DELETE";
        let reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/`;
        let reqBody = {};
        if (!token || !userId) {
            throw new Error("You must log in before performing that action");
        }
        if (
            (post && typeof post !== "string") ||
            (comment && typeof comment !== "string")
        ) {
            throw new Error("Post or comment data not provided");
        }
        if (post) {
            reqUrl = `${reqUrl}${post}/details/${id}`;
        } else if (comment) {
            reqUrl = `${reqUrl}${comment}/details/${id}`;
        } else if (notification) {
            reqUrl = `${reqUrl}users/profile/notifications/${id}`;
        } else if (bioContent && typeof bioContent === "string") {
            reqUrl = `${reqUrl}users/profile/${id}/bio`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Update user bio",
                bioContent,
            };
        } else if (deleteAccount) {
            reqUrl = `${reqUrl}users/profile/${userId}`;
        } else if (pfpImage && pfpAlt) {
            reqUrl = `${reqUrl}users/profile/${userId}/image`;
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
            reqUrl = `${reqUrl}users/profile/${id}/password`;
            reqMethod = "PATCH";
            reqBody = {
                status: "Update password request",
                reqCurrentPass: currentPass,
                reqNewPass: newPass,
            };
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
        if (data.message === "Account deleted successfully") {
            return redirect("/?message=Account deleted successfully");
        } else if (typeof data === "object") {
            if ("newProfilePicName" in data && "newProfilePicAlt" in data) {
                return data;
            } else if ("bioUpdatedAt" in data) {
                return data;
            } else if ("message" in data) {
                return data.message;
            }
        } else {
            return "Unspecified profile action completed";
        }
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
