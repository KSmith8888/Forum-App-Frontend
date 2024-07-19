import { loaderActionInterface } from "../utils/interfaces";

export default async function postAction({ request }: loaderActionInterface) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        const postForm = await request.formData();
        const content = postForm.get("content");
        const postId = postForm.get("postId");
        const commentId = postForm.get("commentId");
        const replyType = postForm.get("type");
        const reportRelated = postForm.get("report-related-id");
        const reportId = postForm.get("report-message-id");
        const reportType = postForm.get("report-type");
        const reportContent = postForm.get("report-content");
        let dataUrl = `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/comments/create`;
        let dataBody = null;
        if (
            content &&
            typeof content === "string" &&
            typeof postId === "string" &&
            typeof replyType === "string" &&
            typeof commentId === "string"
        ) {
            const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!-]+$", "m");
            if (!reg.test(content)) {
                throw new Error(
                    "Please do not include special characters in your message"
                );
            }
            dataBody = JSON.stringify({
                content,
                postId,
                commentId,
                replyType,
            });
        } else if (
            typeof reportId === "string" &&
            typeof reportRelated === "string" &&
            typeof reportType === "string" &&
            typeof reportContent === "string"
        ) {
            if (reportId === "none" || reportType === "none") {
                throw new Error("Invalid non value");
            }
            dataUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/report`;
            dataBody = JSON.stringify({
                reportId,
                reportType,
                reportRelated,
                reportContent,
            });
        } else {
            throw new Error("Proper data not provided");
        }

        const res = await fetch(dataUrl, {
            method: "POST",
            body: dataBody,
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
