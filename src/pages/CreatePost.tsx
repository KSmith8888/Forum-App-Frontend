import { useState } from "react";
import { Form, useActionData, useSearchParams } from "react-router-dom";

import "../assets/styles/create-post.css";

export default function CreatePost() {
    const errorMessage = useActionData();
    const [typeOfPost, setTypeOfPost] = useState("Text");
    const [searchParams] = useSearchParams();
    const topicParam = searchParams.get("topic");

    return (
        <Form
            action="/profile/create"
            method="post"
            autoComplete="off"
            className="post-form"
        >
            <h2 className="create-post-form-heading">Create a new post</h2>
            <div className="post-type-container">
                <button
                    type="button"
                    className="post-type-button"
                    disabled={typeOfPost === "Text" ? true : false}
                    onClick={() => {
                        setTypeOfPost("Text");
                    }}
                >
                    Text Post
                </button>
                <button
                    type="button"
                    className="post-type-button"
                    disabled={typeOfPost === "Link" ? true : false}
                    onClick={() => {
                        setTypeOfPost("Link");
                    }}
                >
                    Link Post
                </button>
            </div>
            <label htmlFor="topic-input">Topic:</label>
            <select
                id="topic-input"
                className="input select"
                name="topic"
                defaultValue={topicParam ? topicParam : ""}
                required
            >
                <option value="">Please select a topic</option>
                <option value="Programming">Programming</option>
                <option value="News">News</option>
                <option value="Movies">Movies</option>
                <option value="Politics">Politics</option>
                <option value="Games">Games</option>
                <option value="Space">Space</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
            </select>

            <input type="hidden" name="post-type" value={typeOfPost} />
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
                maxLength={typeOfPost === "Text" ? 900 : 90}
                rows={typeOfPost === "Text" ? 12 : 1}
                required
            ></textarea>
            <label htmlFor="keywords-input">Keywords:</label>
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
                {typeof errorMessage === "string" ? errorMessage : ""}
            </p>
        </Form>
    );
}
