import React from "react";
import { redirect, useLoaderData, Form } from "react-router-dom";

import { commentInterface } from "../utils/interfaces";

export async function editCommentLoader({ ...args }) {
    try {
        const userId = sessionStorage.getItem("_id");
        if (!userId) {
            return redirect("/?message=Please log in");
        }
        const commentId = args.params.id;
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/comments/details/${commentId}`
        );
        if (!res.ok) {
            throw new Error(`Status error: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}

export async function editCommentAction({ ...args }) {
    try {
        const commentId = args.params.id;
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const commentData = await args.request.formData();
        const content = commentData.get("content");
        const reg = new RegExp("^[a-zA-Z0-9 .,:!]+$", "m");
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
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}

export default function EditComment() {
    const initialComment = useLoaderData() as commentInterface | string;

    return (
        <>
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
                    required
                ></textarea>
                <button type="submit" className="button">
                    Update
                </button>
            </Form>
            {typeof initialComment !== "string" && (
                <div className="previous-comment">
                    <h2>Previous Comment</h2>
                    <p>{initialComment.content}</p>
                </div>
            )}
        </>
    );
}
