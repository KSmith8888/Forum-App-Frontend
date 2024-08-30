import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function editPostAction({
    params,
    request,
}: loaderActionInterface) {
    const postId = params.id;
    const postData = await request.formData();
    const content = postData.get("content");
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!-]+$", "m");
    if (typeof content !== "string" || !reg.test(content)) {
        throw new Error(
            "Please do not include special characters in your message"
        );
    }
    if (!token || !userId) {
        throw new Error("You must log in before creating a post");
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/details/${postId}`,
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
    return redirect(`/posts/details/${postId}`);
}
