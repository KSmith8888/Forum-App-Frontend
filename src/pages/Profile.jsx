import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export async function profileLoader() {
    try {
        const userId = sessionStorage.getItem("_id");
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/user/${userId}`
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export default function Profile() {
    const username = sessionStorage.getItem("username");
    const userPosts = useLoaderData();
    const postElements = userPosts.map((post) => {
        return (
            <div key={post}>
                <Link to={`/posts/details/${post}`} className="post-link">
                    <h3>{post}</h3>
                </Link>
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
                <h3>You have not created any posts yet</h3>
            )}
        </>
    );
}
