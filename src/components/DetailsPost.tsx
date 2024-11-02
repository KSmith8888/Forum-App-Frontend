import { Link } from "react-router-dom";

import { userProfilePost } from "../utils/interfaces.ts";

export default function DetailsPost({
    postId,
    title,
    previewText,
    urlTitle,
}: userProfilePost) {
    return (
        <div key={postId} className="user-details-post-container">
            <Link
                to={`/posts/${postId}/${urlTitle}/`}
                className="user-details-post-link"
            >
                {title}
            </Link>
            <p className="user-details-post-preview">{previewText}</p>
        </div>
    );
}
