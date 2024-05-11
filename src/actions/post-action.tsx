import { loaderActionInterface } from "../utils/interfaces";

export default async function postAction({ request }: loaderActionInterface) {
    try {
        const commentForm = await request.formData();
        const content = commentForm.get("content");
        const postId = commentForm.get("postId");
        const commentId = commentForm.get("commentId");
        const replyType = commentForm.get("type");
        if (
            !content ||
            typeof content !== "string" ||
            typeof postId !== "string" ||
            typeof replyType !== "string" ||
            typeof commentId !== "string"
        ) {
            throw new Error("Please provide a message for your comment");
        }
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!-]+$", "m");
        if (!reg.test(content)) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/comments/create`,
            {
                method: "POST",
                body: JSON.stringify({ content, postId, commentId, replyType }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        if (!res.ok) {
            const errorData = await res.json();
            if (errorData && errorData.msg) {
                throw new Error(errorData.msg);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error("Data Error");
        }
        return data;
    } catch (error) {
        let message = "There was an error, please try again later";
        if (error instanceof Error) {
            console.error(error.message);
            message = error.message;
        }
        return `Error: ${message}`;
    }
}
