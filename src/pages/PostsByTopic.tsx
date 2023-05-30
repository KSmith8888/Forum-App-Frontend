import React from "react";
import {
    useLoaderData,
    useParams,
    Link,
    useOutletContext,
} from "react-router-dom";

import { outletInterface, postInterface } from "../utils/interfaces";

export async function postsTopicLoader({ ...args }) {
    try {
        const topic = args.params.topic;
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/${topic}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return [];
    }
}

export default function PostsByTopic() {
    const { isUserLoggedIn } = useOutletContext() as outletInterface;
    const topic = useParams().topic;
    const postData = useLoaderData() as Array<postInterface>;
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
            <h2 className="posts-topic-heading">Posts about {topic}</h2>
            {isUserLoggedIn && <Link to="/profile/create">Create a post</Link>}
            {postData.length > 0 ? (
                <div className="posts-topic-container">{postElements}</div>
            ) : (
                <p>
                    No posts exist for that topic, or there was a problem
                    getting the data
                </p>
            )}
        </>
    );
}
