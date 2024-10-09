import {
    useLoaderData,
    useParams,
    Link,
    useOutletContext,
} from "react-router-dom";

import { outletInterface, searchResultPost } from "../utils/interfaces";
import textIconImg from "../assets/images/text-post-icon.png";
import linkIconImg from "../assets/images/link-post-icon.png";
import "../assets/styles/search.css";

export default function PostsByTopic() {
    const { isUserLoggedIn } = useOutletContext<outletInterface>();
    let topic = useParams().topic || "";
    if (topic.length > 0) {
        const firstLetter = topic.charAt(0).toUpperCase();
        const restOfTopic = topic.slice(1);
        topic = `${firstLetter}${restOfTopic}`;
    }
    const loader = useLoaderData();
    const postData = Array.isArray(loader) ? loader : [];
    const postEls = postData.map((post: searchResultPost) => {
        return (
            <div key={post._id} className="results-posts-link-container">
                <div className="results-inner-content-container">
                    <Link
                        to={`/posts/details/${post._id}`}
                        className="results-post-link"
                    >
                        <h3 className="results-post-title">{post.title}</h3>
                    </Link>
                    <p
                        className={
                            post.postType === "Link"
                                ? "results-post-link-type"
                                : "results-post-text-type"
                        }
                    >
                        {post.previewText}
                    </p>
                </div>
                <div className="results-inner-image-container">
                    {post.postType === "Text" && (
                        <img
                            src={textIconImg}
                            alt="A white sheet of paper with blue text representing a text post"
                            className="results-text-post-image"
                        />
                    )}
                    {post.postType === "Link" && (
                        <img
                            src={linkIconImg}
                            alt="A grey and blue chain link representing a hyperlink"
                            className="results-link-post-image"
                        />
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
