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

    return (
        <>
            {postData ? (
                <div>
                    <h2>{postData.title}</h2>
                    <p>{postData.content}</p>
                </div>
            ) : (
                <p>Post is unavailable, it may have been deleted</p>
            )}
        </>
    );
}
