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
    const postEls = postData.map((post: postInterface) => {
        const startingChars = post.content.substring(0, 50);
        return (
            <div key={post._id} className="results-posts-link-container">
                <div className="results-main-content-container">
                    <div className="post-inner-content-container">
                        <Link
                            to={`/posts/details/${post._id}`}
                            className="results-post-link"
                        >
                            <h3 className="results-post-title">{post.title}</h3>
                        </Link>
                        <p className="results-post-text">
                            {post.postType === "Link" ? (
                                <a
                                    href={post.content}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {post.content}
                                </a>
                            ) : (
                                `${startingChars}...`
                            )}
                        </p>
                    </div>
                    {post.postType === "Text" && (
                        <img
                            src="/icon-images/text-post-icon.png"
                            alt="A white sheet of paper with black text representing a text post"
                            className="results-text-post-image"
                        />
                    )}
                    {post.postType === "Link" && (
                        <a href={post.content} target="_blank" rel="noreferrer">
                            <img
                                src="/icon-images/link-post-icon.png"
                                alt={`A grey and blue chain link representing a hyperlink to ${post.content}`}
                                className="results-link-post-image"
                            />
                        </a>
                    )}
                </div>
            </div>
        );
    });

    return (
        <>
            <h2 className="posts-topic-heading">{topic} Posts</h2>
            {isUserLoggedIn && (
                <Link
                    to={`/profile/create${
                        topic !== "" ? `?topic=${topic}` : ""
                    }`}
                    className="button-link"
                >
                    Create a post
                </Link>
            )}
            {postData.length > 0 ? (
                <div className="posts-topic-container">{postEls}</div>
            ) : (
                <p>No posts exist for that topic yet</p>
            )}
        </>
    );
}
