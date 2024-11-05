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
        const initKeywords = postData.get("keywords");
        const keywords = initKeywords ? initKeywords : "none";
        const pinned = postData.get("pinned-post");
        const isPinned = pinned ? "pinned" : "not-pinned";
        if (
            typeof topic !== "string" ||
            typeof title !== "string" ||
            typeof content !== "string" ||
            typeof postType !== "string" ||
            typeof keywords !== "string"
        ) {
            throw new Error("There has been an error");
        }
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        if (postType === "Link") {
            const isValid = URL.canParse(content);
            const linkReg = new RegExp("^[a-zA-Z0-9?&=@.:/_-]+$");
            if (
                !isValid ||
                !linkReg.test(content) ||
                !content.startsWith("https://") ||
                !content.includes(".")
            ) {
                throw new Error(
                    "Please do not include special characters in your message"
                );
            }
        }
        const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!@=%\r\n-]+$");
        const strictReg = new RegExp("^[a-zA-Z0-9 .:,?/_'!@=%-]+$");
        if (
            !strictReg.test(title) ||
            !reg.test(content) ||
            !strictReg.test(topic) ||
            !strictReg.test(postType) ||
            !reg.test(keywords) ||
            content.toLowerCase().includes("javascript:") ||
            content.toLowerCase().includes("data:")
        ) {
            throw new Error(
                "Please do not include special characters in your message"
            );
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
        if (
            data &&
            typeof data === "object" &&
            "_id" in data &&
            "urlTitle" in data
        ) {
            return redirect(`/posts/${data._id}/${data.urlTitle}/`);
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
