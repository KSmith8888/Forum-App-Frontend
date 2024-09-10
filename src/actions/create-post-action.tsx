import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function createPostAction({
    request,
}: loaderActionInterface) {
    try {
        const postData = await request.formData();
        const topic = postData.get("topic");
        const title = postData.get("title");
        const postType = postData.get("post-type");
        const content = postData.get("content");
        const keywords = postData.get("keywords");
        const pinned = postData.get("pinned-post");
        const isPinned = pinned ? "pinned" : "";
        if (
            typeof topic !== "string" ||
            typeof title !== "string" ||
            typeof content !== "string" ||
            typeof postType !== "string"
        ) {
            throw new Error("There has been an error");
        }
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!@-]+$", "m");
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        if (
            !reg.test(title) ||
            !reg.test(content) ||
            !reg.test(topic) ||
            !reg.test(postType) ||
            content.toLowerCase().includes("javascript:") ||
            content.toLowerCase().includes("data:")
        ) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }
        if (postType === "Link") {
            const isValid = URL.canParse(content);
            const reg = new RegExp("^[a-zA-Z0-9.:/_-]+$");
            if (
                !isValid ||
                !reg.test(content) ||
                !content.startsWith("https://") ||
                !content.includes(".")
            ) {
                throw new Error(
                    "Please do not include special characters in your message"
                );
            }
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/create`,
            {
                method: "POST",
                body: JSON.stringify({
                    topic: topic.toLowerCase(),
                    title,
                    postType,
                    content,
                    keywords,
                    isPinned,
                }),
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
        return redirect(`/posts/details/${data._id}`);
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
