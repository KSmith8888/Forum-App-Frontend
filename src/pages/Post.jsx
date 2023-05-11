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
    const postTime = new Date(String(postData.time)) || "Unknown";
    const commentElements = postData.comments.map((comment) => {
        const commentTime = new Date(String(comment.time)) || "Unknown";
        return (
            <div className="comment" key={comment._id}>
                <p className="comment-text">{comment.content}</p>
                <p className="post-info">
                    <span className="comment-time">
                        Posted at: {commentTime}
                    </span>
                    <span className="comment-likes">
                        Likes: {comment.likes}
                    </span>
                </p>
            </div>
        );
    });

    return (
        <>
            <article className="post-container">
                <h2 className="post-title">{postData.title}</h2>
                <p className="post-text">{postData.content}</p>
                <p className="post-info">
                    <span className="post-time">Posted at: {postTime}</span>
                    <span className="post-likes">Likes: {postData.likes}</span>
                </p>
            </article>
            <div className="comments-container">{commentElements}</div>
        </>
    );
}
