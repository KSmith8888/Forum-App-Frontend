import React from "react";
import { useLoaderData } from "react-router-dom";

export async function homeLoader() {
    try {
        const response = await fetch("/src/assets/test-data.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
    return null;
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
            <div>{postElements}</div>
        </>
    );
}
