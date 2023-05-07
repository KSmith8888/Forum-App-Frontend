import React from "react";
import { useLoaderData, redirect } from "react-router-dom";

export async function homeLoader() {
    try {
        const response = await fetch("/src/assets/test-data.json");
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export default function Home() {
    const postData = useLoaderData();
    const postElements = postData.map((post) => {
        return (
            <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
        );
    });

    return (
        <>
            <h2>This is the home page</h2>
            <p>See some popular posts below</p>
            {postData ? (
                <div>{postElements}</div>
            ) : (
                <p>Post data is unavailable at this time</p>
            )}
        </>
    );
}
