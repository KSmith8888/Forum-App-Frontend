import React from "react";
import { Form, redirect } from "react-router-dom";

export async function createPostAction({ request }) {
    try {
        const postData = await request.formData();
        const topic = postData.get("topic").toLowerCase();
        const title = postData.get("title");
        const content = postData.get("content");
        const res = await fetch("http://127.0.0.1:3000/api/v1/posts/create", {
            method: "POST",
            body: JSON.stringify({ topic, title, content }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error(`Response error: ${res.status}`);
        }
        const data = await res.json();
        return redirect(`/posts/details/${data._id}`);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default function CreatePost() {
    return (
        <>
            <Form action="/create" method="post" className="post-form">
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
                </select>
                <label htmlFor="title-input">Title:</label>
                <input
                    id="title-input"
                    className="input"
                    type="text"
                    name="title"
                    minlength="4"
                    maxlength="60"
                    required
                />
                <label htmlFor="content-input">Content:</label>
                <textarea
                    id="content-input"
                    className="input textarea"
                    name="content"
                    minlength="4"
                    maxlength="900"
                    rows="12"
                    cols="50"
                    required
                ></textarea>
                <button type="submit" className="button post-button">
                    Post
                </button>
            </Form>
        </>
    );
}
