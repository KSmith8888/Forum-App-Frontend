import React, { useState, useRef, useEffect } from "react";
import {
    useLoaderData,
    useOutletContext,
    Form,
    Link,
    useActionData,
} from "react-router-dom";

import Comment from "../components/Comment.js";
import { likePost } from "../utils/like.js";

interface postInterface {
    _id: string;
    title: string;
    content: string;
    topic: string;
    likes: number;
    user: string;
    keywords: string[];
    comments: string[];
    hasBeenEdited: boolean;
    history: object[];
    createdAt: string;
    updatedAt: string;
}

interface commentInterface {
    _id: string;
    content: string;
    likes: number;
    user: string;
    relatedPost: string;
    hasBeenEdited: boolean;
    history: string[];
    createdAt: string;
    updatedAt: string;
}

type requestType = {
    request: Request;
};
type paramsType = {
    id: string;
};

interface outletInterface {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: Function;
}

export async function postLoader({ ...args }) {
    try {
        const postId = args.params.id;
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/details/${postId}`
        );
        const data: postInterface = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return error;
    }
}

export async function commentAction({ request }: requestType): Promise<string> {
    try {
        const commentData = await request.formData();
        const comment = commentData.get("comment") as string;
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
        const data = await res.json();
        return data._id;
    } catch (error) {
        let message = "Please try again later";
        if (error instanceof Error) {
            console.error(error.message);
            message = error.message;
        }
        return `Error: ${message}`;
    }
}

export default function Post() {
    const loaderData = useLoaderData() as {
        post: postInterface;
        comments: commentInterface[];
    };
    const postTimestamp = loaderData.post.createdAt;
    const postHasBeenEdited = loaderData.post.hasBeenEdited;
    const postDate = new Date(postTimestamp);
    const postHours = postDate.getHours();
    const postMinutes = postDate.getMinutes();
    const postDateString = postDate.toDateString();
    const { isUserLoggedIn } = useOutletContext<outletInterface>();
    const [userLikedPost, setUserLikedPost] = useState(false);
    const [postLikes, setPostLikes] = useState(loaderData.post.likes);
    const commentErrorMsg = (useActionData() as string) || "";
    const commentForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (commentForm.current) {
            commentForm.current.reset();
        }
    }, [commentErrorMsg]);
    const commentElements = loaderData.comments.map(
        (comment: commentInterface) => {
            const commentTimestamp = comment.createdAt;
            const commentDate = new Date(commentTimestamp);
            const commentHours = commentDate.getHours();
            const commentMinutes = commentDate.getMinutes();
            const commentDateString = commentDate.toDateString();
            return (
                <Comment
                    key={comment._id}
                    _id={comment._id}
                    content={comment.content}
                    commentHours={commentHours}
                    commentMinutes={commentMinutes}
                    commentDateString={commentDateString}
                    commentHasBeenEdited={comment.hasBeenEdited}
                    isUserLoggedIn={isUserLoggedIn}
                    likes={comment.likes}
                    username={comment.user}
                />
            );
        }
    );

    return (
        <>
            <article className="post-container">
                <h2 className="post-title">{loaderData.post.title}</h2>
                <p className="post-author">Author: {loaderData.post.user}</p>
                <p className="post-info">
                    <span className="post-time">
                        Posted:{" "}
                        {`${postHours > 12 ? postHours - 12 : postHours}:${
                            postMinutes > 9 ? postMinutes : `0${postMinutes}`
                        } ${postDateString}`}
                    </span>
                    <span className="post-likes">Likes: {postLikes}</span>
                    {postHasBeenEdited && (
                        <Link to="." className="button-link">
                            Edit History
                        </Link>
                    )}
                </p>
                <p className="post-text">{loaderData.post.content}</p>
                {isUserLoggedIn && (
                    <button
                        className={
                            userLikedPost
                                ? "like-button selected"
                                : "like-button"
                        }
                        onClick={async () => {
                            try {
                                const likesData = await likePost(
                                    loaderData.post._id
                                );
                                setPostLikes(likesData.likes);
                                setUserLikedPost(likesData.didUserLike);
                            } catch (error) {
                                if (error instanceof Error) {
                                    console.error(error.message);
                                }
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
                        pattern="[a-zA-Z0-9 .,:!]+"
                    />
                    <input
                        type="hidden"
                        value={loaderData.post._id}
                        name="post"
                    />
                    <button type="submit" className="button">
                        Submit
                    </button>
                    <p className="error-message">
                        {commentErrorMsg.startsWith("Error:")
                            ? commentErrorMsg
                            : ""}
                    </p>
                </Form>
            )}
        </>
    );
}