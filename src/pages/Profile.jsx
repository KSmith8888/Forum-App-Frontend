import React, { useRef } from "react";
import { Link, useLoaderData, redirect } from "react-router-dom";

import MessageModal from "../components/MessageModal";
import { deletePostRequest, deleteCommentRequest } from "../utils/delete.js";

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
        console.error(error.message);
        return [];
    }
}

export default function Profile() {
    const username = sessionStorage.getItem("username");
    const postAndCommentData = useLoaderData();
    const messageModal = useRef();
    //const [isModalOpen, setIsModalOpen] = useState(false);
    //pass state to modal and update to use on click
    const postElements = postAndCommentData.posts.map((post) => {
        return (
            <div key={post.id} className="post-link-container">
                <Link to={`/posts/details/${post.id}`} className="post-link">
                    <h4 className="post-link-title">{post.title}</h4>
                </Link>
                <div className="button-container">
                    <Link to={`/posts/edit/${post.id}`} className="button-link">
                        Edit
                    </Link>
                    <button
                        className="button"
                        onClick={async () => {
                            try {
                                const message = await deletePostRequest(
                                    post.id
                                );
                                console.log(message);
                            } catch (error) {
                                console.error(error.message);
                            }
                        }}
                    >
                        Delete
                    </button>
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
                    <button
                        className="button"
                        onClick={async () => {
                            try {
                                const message = await deleteCommentRequest(
                                    comment._id
                                );
                                console.log(message);
                            } catch (error) {
                                console.error(error.message);
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    });

    return (
        <>
            <h2>{`Profile Page: ${username}`}</h2>
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
            <MessageModal ref={messageModal} />
        </>
    );
}
