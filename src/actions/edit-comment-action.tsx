import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

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
        const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!@=%\r\n-]+$");
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
        if (content.includes("https://")) {
            const attemptedLinks: string[] = [];
            const contentWords = content.split(" ");
            const reg = new RegExp("^[a-zA-Z0-9.:/_-]+$");
            contentWords.forEach((word) => {
                if (word.startsWith("https://")) {
                    attemptedLinks.push(word);
                }
            });
            attemptedLinks.forEach((link) => {
                const isValid = URL.canParse(link);
                if (!isValid || !reg.test(link) || !link.includes(".")) {
                    throw new Error(
                        "Bad Request Error: Invalid link content provided"
                    );
                }
            });
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
            if (errorData && errorData.message) {
                throw new Error(errorData.message);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
        }
        const data = await res.json();
        return redirect(`/posts/details/${data.relatedPostId}`);
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
