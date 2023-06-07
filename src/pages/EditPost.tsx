import { redirect, useLoaderData, Form } from "react-router-dom";

import {
    postInterface,
    postRelatedComments,
    loaderActionInterface,
} from "../utils/interfaces";

export async function editPostLoader({ params }: loaderActionInterface) {
    const userId = sessionStorage.getItem("_id");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    const postId = params.id;
    const res = await fetch(
        `http://127.0.0.1:3000/api/v1/posts/details/${postId}`
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data: postRelatedComments = await res.json();
    return data.post;
}

export async function editPostAction({
    params,
    request,
}: loaderActionInterface) {
    const postId = params.id;
    const postData = await request.formData();
    const title = postData.get("title");
    const content = postData.get("content");
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    const reg = new RegExp("^[a-zA-Z0-9 .:,!-]+$");
    if (
        (typeof title === "string" && !reg.test(title)) ||
        (typeof content === "string" && !reg.test(content))
    ) {
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
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    return redirect(`/posts/details/${postId}`);
}

export default function EditPost() {
    const prevPostData = useLoaderData() as postInterface;
    const prevPostTitle = prevPostData.title || "";
    const prevPostContent = prevPostData.content || "";

    return (
        <Form method="patch" className="post-form">
            <h2>Edit Post</h2>
            <label htmlFor="title-input">Title:</label>
            <input
                id="title-input"
                name="title"
                className="input"
                type="text"
                minLength={4}
                maxLength={60}
                defaultValue={prevPostTitle}
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
                defaultValue={prevPostContent}
                required
            ></textarea>
            <button type="submit" className="button">
                Update
            </button>
        </Form>
    );
}
