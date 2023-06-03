import { useRef, useState, useEffect } from "react";
import {
    Link,
    useLoaderData,
    redirect,
    Form,
    useActionData,
} from "react-router-dom";

import { commentInterface, loaderActionInterface } from "../utils/interfaces";

export async function profileLoader() {
    try {
        const userId = sessionStorage.getItem("_id");
        if (!userId) {
            return redirect("/?message=Please log in");
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/user/${userId}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return [];
    }
}

export async function profileAction({ request }: loaderActionInterface) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const formData = await request.formData();
        let type = "";
        const id = formData.get("id");
        const post = formData.get("post");
        const comment = formData.get("comment");
        if (
            (post && typeof post !== "string") ||
            (comment && typeof comment !== "string")
        ) {
            throw new Error("Post or comment data not provided");
        }
        if (post) {
            type = post;
        } else if (comment) {
            type = comment;
        }
        if (!token || !userId) {
            throw new Error("You must log in before deleting a post");
        }
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/${type}/details/${id}`,
            {
                method: "DELETE",
                body: JSON.stringify({ status: "Delete request" }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        const data = await res.json();
        return data.message;
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}

interface userPost {
    id: string;
    title: string;
}

interface postAndComment {
    posts: userPost[];
    comments: commentInterface[];
}

export default function Profile() {
    const username = sessionStorage.getItem("username");
    const postAndCommentData = useLoaderData() as postAndComment;
    const messageModal = useRef<HTMLDialogElement>(null);
    const actionMessage = useActionData() as string;
    const [modalMessage, setModalMessage] = useState("");
    useEffect(() => {
        if (actionMessage && messageModal.current) {
            setModalMessage(actionMessage);
            messageModal.current.showModal();
        }
    }, [actionMessage]);
    let profileImageName = "blank.png";
    let profileImageAlt = "A generic blank avatar image of a mans head";
    const profileImage = localStorage.getItem("profileImageName");
    const profileAltText = localStorage.getItem("profileImageAlt");
    if (profileImage && profileAltText) {
        profileImageName = profileImage;
        profileImageAlt = profileAltText;
    }
    const [updatedProfilePic, setUpdatedProfilePic] = useState("");
    const postElements = postAndCommentData.posts.map((post: userPost) => {
        return (
            <div key={post.id} className="post-link-container">
                <Link to={`/posts/details/${post.id}`} className="post-link">
                    <h4 className="post-link-title">{post.title}</h4>
                </Link>
                <div className="button-container">
                    <Link to={`/posts/edit/${post.id}`} className="button-link">
                        Edit
                    </Link>
                    <Form method="POST">
                        <input type="hidden" name="post" value="posts" />
                        <input type="hidden" name="id" value={post.id} />
                        <button className="button">Delete</button>
                    </Form>
                </div>
            </div>
        );
    });
    const commentElements = postAndCommentData.comments.map((comment) => {
        return (
            <div key={comment._id} className="comment-link-container">
                <h5 className="comment-link-title">{comment.content}</h5>
                <div className="button-container">
                    <Link
                        to={`/posts/details/${comment.relatedPost}`}
                        className="button-link"
                    >
                        Post
                    </Link>
                    <Link
                        to={`/posts/comments/edit/${comment._id}`}
                        className="button-link"
                    >
                        Edit
                    </Link>
                    <Form method="POST">
                        <input type="hidden" name="comment" value="comments" />
                        <input type="hidden" name="id" value={comment._id} />
                        <button type="submit" className="button">
                            Delete
                        </button>
                    </Form>
                </div>
            </div>
        );
    });

    return (
        <>
            <h2>{`Profile Page: ${username}`}</h2>
            <div className="profile-image-info">
                <h3>Profile Image:</h3>
                <img
                    src={`/profile-images/${profileImageName}`}
                    alt={profileImageAlt}
                    className="profile-image"
                />
                <button>Change</button>
            </div>
            <dialog className="profile-image-modal">
                <div className="profile-image-grid">
                    <img
                        src="/profile-images/blank.png"
                        alt="A generic blank avatar image of a mans head"
                        className="profile-image-grid-item"
                        onClick={() => {
                            setUpdatedProfilePic("blank.png");
                        }}
                    />
                    <img
                        src="/profile-images/apple.jpg"
                        alt="A red apple with sunlit trees in the background"
                        className="profile-image-grid-item"
                    />
                </div>
                <form>
                    <input
                        type="hidden"
                        name="filename"
                        value={updatedProfilePic}
                    />
                    <button type="submit">Update</button>
                </form>
                <button>Close</button>
            </dialog>
            <Link to="create">Create a new post</Link>
            {postAndCommentData.posts.length > 0 ? (
                <>
                    <h3>Your Posts:</h3>
                    <div className="user-posts-container">{postElements}</div>
                </>
            ) : (
                <h4>You have not created any posts yet</h4>
            )}
            {postAndCommentData.comments.length > 0 ? (
                <>
                    <h3>Your Comments:</h3>
                    <div className="user-comments-container">
                        {commentElements}
                    </div>
                </>
            ) : (
                <h4>You have not created any comments yet</h4>
            )}
            <dialog className="message-modal" ref={messageModal}>
                <p className="message-modal-text">
                    {modalMessage ||
                        "There has been an error, please try again later"}
                </p>
                <button
                    className="button"
                    onClick={() => {
                        if (messageModal.current) {
                            messageModal.current.close();
                        }
                    }}
                >
                    Close
                </button>
            </dialog>
        </>
    );
}
