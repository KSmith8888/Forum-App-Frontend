import React from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";

export async function postsTopicLoader({ params }) {
    try {
        const topic = params.topic;
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/${topic}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export default function PostsByTopic() {
    const topic = useParams().topic;
    const postData = useLoaderData() || [];
    const postElements = postData.map((post) => {
        return (
            <div key={post._id}>
                <Link to={`/posts/details/${post._id}`} className="post-link">
                    <h3>{post.title}</h3>
                </Link>
            </div>
        );
    });

    return (
        <>
            <h2>Posts about {topic}</h2>
            {postData.length > 0 ? (
                <div>{postElements}</div>
            ) : (
                <p>No posts exist for that topic</p>
            )}
        </>
    );
}
