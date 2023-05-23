import React from "react";
import { Link, useLoaderData, redirect } from "react-router-dom";

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
        return error.message;
    }
}

export default function Profile() {
    const username = sessionStorage.getItem("username");
    const userPosts = useLoaderData();
    const postElements = userPosts.map((post) => {
        return (
            <div key={post.id} className="post-link-container">
                <Link to={`/posts/details/${post.id}`} className="post-link">
                    <h4 className="post-link-title">{post.title}</h4>
                </Link>
                <div className="button-container">
                    <button
                        className="button"
                        onClick={() => {
                            console.log(`Edit post ${post.id}`);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="button"
                        onClick={() => {
                            console.log(`Delete post ${post.id}`);
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
            {userPosts.length > 0 ? (
                <>
                    <h3>Your Posts:</h3>
                    <div className="posts-topic-container">{postElements}</div>
                </>
            ) : (
                <h4>You have not created any posts yet</h4>
            )}
            <h3>Your Comments:</h3>
            <h4>You have not created any comments yet</h4>
        </>
    );
}
