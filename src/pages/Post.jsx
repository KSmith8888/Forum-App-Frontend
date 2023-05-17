import React from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";

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
    const [isUserLoggedIn, setIsUserLoggedIn] = useOutletContext();
    const postData = useLoaderData();
    const postTimestamp = postData.createdAt;
    const postHasBeenEdited =
        postData.createdAt !== postData.updatedAt ? true : false;
    const postDate = new Date(postTimestamp);
    const postHours = postDate.getHours();
    const postMinutes = postDate.getMinutes();
    const postDateString = postDate.toDateString();
    const commentElements = postData.comments.map((comment) => {
        const commentTimestamp = comment.createdAt;
        const commentHasBeenEdited =
            comment.createdAt !== comment.updatedAt ? true : false;
        const commentDate = new Date(commentTimestamp);
        const commentHours = commentDate.getHours();
        const commentMinutes = commentDate.getMinutes();
        const commentDateString = commentDate.toDateString();
        return (
            <div className="comment" key={comment._id}>
                <p className="comment-text">{comment.content}</p>
                <p className="comment-info">
                    <span className="comment-time">
                        Posted:{" "}
                        {`${
                            commentHours > 12 ? commentHours - 12 : commentHours
                        }:${
                            commentMinutes > 9
                                ? commentMinutes
                                : `0${commentMinutes}`
                        } ${commentDateString}`}
                    </span>
                    <span className="comment-likes">
                        Likes: {comment.likes}
                    </span>
                    <span className="comment-edited">
                        {commentHasBeenEdited ? "Edited" : ""}
                    </span>
                </p>
            </div>
        );
    });

    return (
        <>
            <article className="post-container">
                <h2 className="post-title">{postData.title}</h2>
                <p className="post-author">
                    Author: {postData.user ? postData.user : "Unknown"}
                </p>
                <p className="post-info">
                    <span className="post-time">
                        Posted:{" "}
                        {`${postHours > 12 ? postHours - 12 : postHours}:${
                            postMinutes > 9 ? postMinutes : `0${postMinutes}`
                        } ${postDateString}`}
                    </span>
                    <span className="post-likes">Likes: {postData.likes}</span>
                    <span className="post-edited">
                        {postHasBeenEdited ? "Edited" : ""}
                    </span>
                </p>
                <p className="post-text">{postData.content}</p>
            </article>
            <div className="comments-container">{commentElements}</div>
            {isUserLoggedIn && <div className="comment-form">Comment Form</div>}
        </>
    );
}
