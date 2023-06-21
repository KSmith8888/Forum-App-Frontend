import {
    useLoaderData,
    useParams,
    Link,
    useOutletContext,
} from "react-router-dom";

import {
    outletInterface,
    postInterface,
    loaderActionInterface,
} from "../utils/interfaces";

export async function postsTopicLoader({ params }: loaderActionInterface) {
    const topic = params.topic;
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${topic}`
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
        throw new Error("Invalid data returned from server");
    }
    return data;
}

export default function PostsByTopic() {
    const { isUserLoggedIn } = useOutletContext<outletInterface>();
    let topic = useParams().topic || "";
    if (topic.length > 0) {
        const firstLetter = topic.charAt(0).toUpperCase();
        const restOfTopic = topic.slice(1);
        topic = `${firstLetter}${restOfTopic}`;
    }
    const loader = useLoaderData();
    const postData = loader instanceof Array ? loader : [];
    const postElements = postData.map((post: postInterface) => {
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
            <h2 className="posts-topic-heading">{topic} Posts</h2>
            {isUserLoggedIn && <Link to="/profile/create">Create a post</Link>}
            {postData.length > 0 ? (
                <div className="posts-topic-container">{postElements}</div>
            ) : (
                <p>No posts exist for that topic yet</p>
            )}
        </>
    );
}
