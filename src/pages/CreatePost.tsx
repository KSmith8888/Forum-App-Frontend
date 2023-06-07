import { Form, redirect, useActionData } from "react-router-dom";

import "../assets/styles/create-post.css";

export async function createPostAction({ ...args }) {
    try {
        const postData = await args.request.formData();
        const topic = postData.get("topic").toLowerCase();
        const title = postData.get("title");
        const content = postData.get("content");
        const keywords = postData.get("keywords");
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const reg = new RegExp("^[a-zA-Z0-9 .:,!-]+$", "m");
        if (
            !reg.test(title) ||
            !reg.test(content) ||
            (keywords && !reg.test(keywords))
        ) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        const res = await fetch("http://127.0.0.1:3000/api/v1/posts/create", {
            method: "POST",
            body: JSON.stringify({ topic, title, content, keywords }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user_id": userId,
            },
        });
        if (!res.ok) {
            throw new Error(`Response error: ${res.status}`);
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

export default function CreatePost() {
    const errorMessage = useActionData() as string;

    return (
        <>
            <Form action="/profile/create" method="post" className="post-form">
                <h2>Create a new post</h2>
                <label htmlFor="topic-input">Topic:</label>
                <select
                    id="topic-input"
                    className="input select"
                    name="topic"
                    required
                >
                    <option value="">Please select a topic</option>
                    <option value="Movies">Movies</option>
                    <option value="Games">Games</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor="title-input">Title:</label>
                <input
                    id="title-input"
                    className="input"
                    type="text"
                    name="title"
                    minLength={4}
                    maxLength={60}
                    required
                />
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
                <label htmlFor="keywords-input">
                    Keywords (Words that relate to your post to help other users
                    find it):
                </label>
                <input
                    id="keywords-input"
                    className="input"
                    type="text"
                    name="keywords"
                    maxLength={60}
                />
                <button type="submit" className="button post-button">
                    Post
                </button>
                <p className="error-message">
                    {errorMessage ? errorMessage : ""}
                </p>
            </Form>
        </>
    );
}
