import React from "react";
import { redirect, useLoaderData, Form } from "react-router-dom";

export async function editCommentLoader({ params }) {
    try {
        const userId = sessionStorage.getItem("_id");
        if (!userId) {
            return redirect("/?message=Please log in");
        }
        const commentId = params.id;
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/comments/details/${commentId}`
        );
        if (!res.ok) {
            throw new Error(`Status error: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return { msg: error.message };
    }
}

export async function editCommentAction({ params, request }) {
    try {
        const commentId = params.id;
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const commentData = await request.formData();
        const content = commentData.get("content");
        const reg = new RegExp("^[a-zA-Z0-9 .,:!]+$");
        if (!reg.test(content)) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }

        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/comments/details/${commentId}`,
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
            throw new Error(`Response error: ${res.status}`);
        }
        const data = await res.json();
        return redirect(`/posts/details/${data.relatedPostId}`);
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export default function EditComment() {
    const initialComment = useLoaderData();

    return (
        <>
            <Form method="POST">
                <h2>Edit Comment</h2>
                <label htmlFor="content-input">Content:</label>
                <input
                    id="content-input"
                    type="text"
                    name="content"
                    className="input"
                    pattern="[a-zA-Z0-9 .,:!]+"
                    minLength="4"
                    maxLength="300"
                    required
                />
                <button type="submit" className="button">
                    Update
                </button>
            </Form>
            {initialComment && (
                <div className="previous-comment">
                    <h2>Previous Comment</h2>
                    <p>{initialComment.content}</p>
                </div>
            )}
        </>
    );
}
