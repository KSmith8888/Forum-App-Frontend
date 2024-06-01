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
        let reqMethod = "DELETE";
        let reqStatus = "Delete request";
        let reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/`;
        let reqBio = "none";
        let reqCurrentPass = "none";
        let reqNewPass = "none";
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
            reqStatus = "Update user bio";
            reqBio = bioContent;
        } else if (deleteAccount) {
            reqUrl = `${reqUrl}users/profile/${userId}`;
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
            reqStatus = "Update password request";
            reqCurrentPass = currentPass;
            reqNewPass = newPass;
        }
        const res = await fetch(reqUrl, {
            method: reqMethod,
            body: JSON.stringify({
                status: reqStatus,
                bioContent: reqBio,
                reqCurrentPass,
                reqNewPass,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user_id": userId,
            },
        });
        if (!res.ok) {
            const errorData = await res.json();
            if (errorData && errorData.msg) {
                throw new Error(errorData.msg);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
        }
        const data = await res.json();
        if (data.message === "Account deleted successfully") {
            return redirect("/?message=Account deleted successfully");
        } else {
            return data.message;
        }
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
