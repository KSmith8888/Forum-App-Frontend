import { useState } from "react";
import {
    Form,
    redirect,
    useActionData,
    useSearchParams,
} from "react-router-dom";

import { loaderActionInterface } from "../utils/interfaces";
import "../assets/styles/create-post.css";

export async function createPostAction({ request }: loaderActionInterface) {
    try {
        const postData = await request.formData();
        const topic = postData.get("topic");
        const title = postData.get("title");
        const postType = postData.get("post-type");
        const content = postData.get("content");
        const keywords = postData.get("keywords");
        if (
            typeof topic !== "string" ||
            typeof title !== "string" ||
            typeof content !== "string" ||
            typeof postType !== "string"
        ) {
            throw new Error("There has been an error");
        }
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const reg = new RegExp("^[a-zA-Z0-9 .:,?/_'!-]+$", "m");
        if (
            !reg.test(title) ||
            !reg.test(content) ||
            !reg.test(topic) ||
            !reg.test(postType)
        ) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/create`,
            {
                method: "POST",
                body: JSON.stringify({
                    topic: topic.toLowerCase(),
                    title,
                    postType,
                    content,
                    keywords,
                }),
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
    const errorMessage = useActionData();
    const [typeOfPost, setTypeOfPost] = useState("Text");
    const [searchParams] = useSearchParams();
    const topicParam = searchParams.get("topic");

    return (
        <Form action="/profile/create" method="post" className="post-form">
            <h2>Create a new post</h2>
            <div className="post-type-container">
                <button
                    type="button"
                    className="button post-button post-type-button"
                    disabled={typeOfPost === "Text" ? true : false}
                    onClick={() => {
                        setTypeOfPost("Text");
                    }}
                >
                    Text
                </button>
                <button
                    type="button"
                    className="button post-button post-type-button"
                    disabled={typeOfPost === "Link" ? true : false}
                    onClick={() => {
                        setTypeOfPost("Link");
                    }}
                >
                    Link
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
                {typeof errorMessage === "string" ? errorMessage : ""}
            </p>
        </Form>
    );
}
