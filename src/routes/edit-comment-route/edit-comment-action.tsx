import { redirect } from "react-router";
import { loaderActionInterface } from "../../utils/interfaces";

export default async function editCommentAction({
    params,
    request,
}: loaderActionInterface) {
    try {
        const commentId = params.id;
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const commentData = await request.formData();
        const content = commentData.get("content");
        const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!@=%\\r\\n-]+$");
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        if (
            typeof commentId !== "string" ||
            commentId === "" ||
            typeof content !== "string" ||
            !reg.test(content) ||
            content.toLowerCase().includes("javascript:") ||
            content.toLowerCase().includes("data:")
        ) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/comments/${commentId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ content }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        if (!res.ok) {
            const errorData = await res.json();
            if (errorData && errorData.message) {
                throw new Error(errorData.message);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
        }
        const data = await res.json();
        if (
            data &&
            typeof data === "object" &&
            "relatedPostId" in data &&
            "postUrlTitle" in data
        ) {
            return redirect(
                `/posts/${data.relatedPostId}/${data.postUrlTitle}/?commentId=${commentId}`
            );
        } else {
            throw new Error("Incorrect data returned from server");
        }
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
