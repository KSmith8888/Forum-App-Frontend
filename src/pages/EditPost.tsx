import { useState } from "react";
import { redirect, useLoaderData, Form } from "react-router-dom";

import { postInterface, commentInterface } from "../utils/interfaces";

interface postRelatedComments {
    post: postInterface;
    comments: Array<commentInterface>;
}

export async function editPostLoader({ ...args }) {
    try {
        const userId = sessionStorage.getItem("_id");
        if (!userId) {
            return redirect("/?message=Please log in");
        }
        const postId = args.params.id;
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/details/${postId}`
        );
        if (!res.ok) {
            throw new Error(`Status error: ${res.status}`);
        }
        const data: postRelatedComments = await res.json();
        return data.post;
    } catch (error) {
        const errorObj = {
            msg: "There has been an error, please try again later",
        };
        if (error instanceof Error) {
            errorObj.msg = error.message;
        }
        return errorObj.msg;
    }
}

export async function editPostAction({ ...args }) {
    try {
        const postId = args.params.id;
        const postData = await args.request.formData();
        const title = postData.get("title");
        const content = postData.get("content");
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const reg = new RegExp("^[a-zA-Z0-9 .:,!-]+$");
        if ((title && !reg.test(title)) || !reg.test(content)) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/details/${postId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ title, content }),
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
        return redirect(`/posts/details/${postId}`);
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}

export default function EditPost() {
    const loader = useLoaderData() as postInterface | string;
    const [errorMsg, setErrorMsg] = useState("");
    const postData = { title: "", content: "" };
    if (typeof loader !== "string") {
        postData.title = loader.title;
        postData.content = loader.content;
    } else {
        setErrorMsg(loader);
    }

    return (
        <div className="edit-post-container">
            <Form method="post" className="post-form">
                <h2>Edit Post</h2>
                <label htmlFor="title-input">Title:</label>
                <input
                    id="title-input"
                    name="title"
                    className="input"
                    type="text"
                    minLength={4}
                    maxLength={60}
                ></input>
                <label htmlFor="content-input">Content:</label>
                <textarea
                    id="content-input"
                    className="input textarea"
                    name="content"
                    minLength={4}
                    maxLength={900}
                    rows={12}
                    cols={50}
                    required
                ></textarea>
                <button type="submit" className="button">
                    Update
                </button>
                <p className="error-message">{errorMsg}</p>
            </Form>
            <div className="previous-post">
                <h2>Previous Post Content</h2>
                <p>{postData.title}</p>
                <p>{postData.content}</p>
            </div>
        </div>
    );
}
