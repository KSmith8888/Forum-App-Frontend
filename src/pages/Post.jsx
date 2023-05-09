import React from "react";
import { useLoaderData } from "react-router-dom";

export async function postLoader({ params }) {
    try {
        const response = await fetch("/src/assets/test-data.json");
        const data = await response.json();
        //const topic = params.id;
        return data[0];
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
                <p>Post data is unavailable at this time</p>
            )}
        </>
    );
}
