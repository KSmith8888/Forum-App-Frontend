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
        const bio = formData.get("bio");
        const bioContent = formData.get("bio-content");
        let reqMethod = "DELETE";
        let reqStatus = "Delete request";
        let reqUrl = "";
        let reqBio = "none";
        if (
            (post && typeof post !== "string") ||
            (comment && typeof comment !== "string")
        ) {
            throw new Error("Post or comment data not provided");
        }
        if (post) {
            reqUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/${post}/details/${id}`;
        } else if (comment) {
            reqUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/${comment}/details/${id}`;
        } else if (notification) {
            reqUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/users/profile/notifications/${id}`;
        } else if (bio && typeof bioContent === "string") {
            reqUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/users/profile/${id}/bio`;
            reqMethod = "PATCH";
            reqStatus = "Update user bio";
            reqBio = bioContent;
        }
        if (!token || !userId) {
            throw new Error("You must log in before performing that action");
        }
        const res = await fetch(reqUrl, {
            method: reqMethod,
            body: JSON.stringify({ status: reqStatus, bioContent: reqBio }),
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
        return data.message;
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
