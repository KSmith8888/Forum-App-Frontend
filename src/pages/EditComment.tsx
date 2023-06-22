import { redirect, useLoaderData, Form } from "react-router-dom";

import { loaderActionInterface } from "../utils/interfaces";

export async function editCommentLoader({ params }: loaderActionInterface) {
    const userId = sessionStorage.getItem("_id");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    const commentId = params.id;
    const res = await fetch(
        `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/comments/details/${commentId}`
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
    if (typeof data === "object" && "content" in data) {
        return data.content;
    } else {
        throw new Error("Something went wrong, please try again later");
    }
}

export async function editCommentAction({
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

export default function EditComment() {
    const loaderData = useLoaderData();
    const prevContent = typeof loaderData === "string" ? loaderData : "";

    return (
        <Form method="POST" className="edit-comment-form">
            <h2>Edit Comment</h2>
            <label htmlFor="content-input">Content:</label>
            <textarea
                id="content-input"
                name="content"
                className="input textarea"
                minLength={4}
                maxLength={300}
                rows={6}
                cols={40}
                defaultValue={prevContent}
                required
            ></textarea>
            <button type="submit" className="button">
                Update
            </button>
        </Form>
    );
}
