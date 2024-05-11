import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function editCommentAction({
    params,
    request,
}: loaderActionInterface) {
    const commentId = params.id;
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    const commentData = await request.formData();
    const content = commentData.get("content");
    const reg = new RegExp("^[a-zA-Z0-9 .:,?'!-]+$", "m");
    if (typeof content === "string" && !reg.test(content)) {
        throw new Error(
            "Please do not include special characters in your message"
        );
    }

    if (!token || !userId) {
        throw new Error("You must log in before creating a post");
    }
    const res = await fetch(
        `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/comments/details/${commentId}`,
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
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    return redirect(`/posts/details/${data.relatedPostId}`);
}
