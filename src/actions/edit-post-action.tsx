import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function editPostAction({
    params,
    request,
}: loaderActionInterface) {
    try {
        const postId = params.id;
        const postTitle = params.title;
        const postData = await request.formData();
        const content = postData.get("content");
        const postType = postData.get("post-type");
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!@=%\r\n-]+$");
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        if (
            typeof postId !== "string" ||
            postId === "" ||
            typeof content !== "string" ||
            !reg.test(content) ||
            content.toLowerCase().includes("javascript:") ||
            content.toLowerCase().includes("data:")
        ) {
            throw new Error(
                "Please do not include special characters in your message"
            );
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
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${postId}`,
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
        return redirect(`/posts/${postId}/${postTitle}/`);
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
