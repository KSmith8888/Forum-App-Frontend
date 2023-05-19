import React, { useState, useRef, useEffect } from "react";
import {
    useLoaderData,
    useOutletContext,
    Form,
    useActionData,
} from "react-router-dom";

import { likePost, likeComment } from "../utils/like.js";

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

export async function commentAction({ request }) {
    try {
        const commentData = await request.formData();
        const comment = commentData.get("comment");
        const post = commentData.get("post");
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const reg = new RegExp("^[a-zA-Z0-9 .:,!-]+$");
        if (!reg.test(comment)) {
            throw new Error(
                "Please do not include special characters in your message"
            );
        }
        if (!token || !userId) {
            throw new Error("You must log in before creating a post");
        }
        const res = await fetch(
            "http://127.0.0.1:3000/api/v1/comments/create",
            {
                method: "POST",
                body: JSON.stringify({ content: comment, postId: post }),
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
        return "Comment created successfully";
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export default function Post() {
    const postData = useLoaderData();
    const postTimestamp = postData.createdAt;
    const postHasBeenEdited = postData.hasBeenEdited;
    const postDate = new Date(postTimestamp);
    const postHours = postDate.getHours();
    const postMinutes = postDate.getMinutes();
    const postDateString = postDate.toDateString();
    const [isUserLoggedIn, setIsUserLoggedIn] = useOutletContext();
    const [userLikedPost, setUserLikedPost] = useState(false);
    const [postLikes, setPostLikes] = useState(postData.likes);
    const commentErrorMsg = useActionData();
    const commentForm = useRef();
    useEffect(() => {
        if (commentForm.current) {
            commentForm.current.reset();
        }
    }, [commentErrorMsg]);
    const commentElements = postData.comments.map((comment) => {
        const commentTimestamp = comment.createdAt;
        const commentHasBeenEdited = comment.hasBeenEdited;
        const commentDate = new Date(commentTimestamp);
        const [commentLikes, setCommentLikes] = useState(comment.likes);
        const [userLikedComment, setUserLikedComment] = useState(false);
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
                    <span className="comment-likes">Likes: {commentLikes}</span>
                    <span className="comment-edited">
                        {commentHasBeenEdited ? "Edited" : ""}
                    </span>
                </p>
                {isUserLoggedIn && (
                    <button
                        className={
                            userLikedComment
                                ? "like-button-selected"
                                : "like-button"
                        }
                        onClick={async () => {
                            try {
                                const likes = await likeComment(comment._id);
                                setCommentLikes(likes);
                                setUserLikedComment(true);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        Like
                    </button>
                )}
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
                    <span className="post-likes">Likes: {postLikes}</span>
                    <span className="post-edited">
                        {postHasBeenEdited ? "Edited" : ""}
                    </span>
                </p>
                <p className="post-text">{postData.content}</p>
                {isUserLoggedIn && (
                    <button
                        className={
                            userLikedPost
                                ? "like-button-selected"
                                : "like-button"
                        }
                        onClick={async () => {
                            try {
                                const likes = await likePost(postData._id);
                                setPostLikes(likes);
                                setUserLikedPost(true);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        Like
                    </button>
                )}
            </article>
            <div className="comments-container">{commentElements}</div>
            {isUserLoggedIn && (
                <Form className="comment-form" method="POST" ref={commentForm}>
                    <label htmlFor="comment-input">Leave a comment:</label>
                    <input
                        id="comment-input"
                        className="input"
                        type="text"
                        name="comment"
                        maxLength={300}
                        minLength={4}
                    />
                    <input type="hidden" value={postData._id} name="post" />
                    <button type="submit" className="button">
                        Submit
                    </button>
                    <p className="error-message">
                        {commentErrorMsg ? commentErrorMsg : ""}
                    </p>
                </Form>
            )}
        </>
    );
}
