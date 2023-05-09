import React from "react";
import { Form, redirect } from "react-router-dom";

export async function createPostAction({ request }) {
    try {
        const postData = await request.formData();
        const topic = postData.get("topic");
        const title = postData.get("title");
        const content = postData.get("content");
        console.log(topic, title, content);
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
        const data = res.json();
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
                <select id="topic-input" name="topic">
                    <option>Movies</option>
                    <option>Games</option>
                    <option>Books</option>
                </select>
                <label htmlFor="title-input">Title:</label>
                <input id="title-input" type="text" name="title" />
                <label htmlFor="content-input">Content:</label>
                <textarea id="content-input" name="content"></textarea>
                <button type="submit">Post</button>
            </Form>
        </>
    );
}
