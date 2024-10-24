import {
    useLoaderData,
    useParams,
    Link,
    useOutletContext,
} from "react-router-dom";

import PostPreview from "../components/PostPreview";

import { outletInterface, postPreviewInfo } from "../utils/interfaces";

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
    const postEls = postData.map((preview: postPreviewInfo) => {
        return (
            <PostPreview
                key={preview.postId}
                postId={preview.postId}
                title={preview.title}
                previewText={preview.previewText}
                postType={preview.postType}
            />
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
