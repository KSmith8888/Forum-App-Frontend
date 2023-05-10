import React from "react";
import { useLoaderData } from "react-router-dom";

export async function postLoader({ params }) {
    try {
        const postId = params.id;
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/details/${postId}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export default function Post() {
    const postData = useLoaderData();
    const commentElements = postData.comments.map((comment) => {
        return (
            <div className="comment" key={comment._id}>
                <p className="comment-text">{comment.content}</p>
                <p>Likes: {comment.likes}</p>
            </div>
        );
    });

    return (
        <>
            <article className="post-container">
                <h2 className="post-title">{postData.title}</h2>
                <p className="post-text">{postData.content}</p>
            </article>
            <div className="comments-container">{commentElements}</div>
        </>
    );
}
