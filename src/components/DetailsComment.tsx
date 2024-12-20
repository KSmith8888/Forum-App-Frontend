import { Link } from "react-router";

import { userProfileComment } from "../utils/interfaces.ts";

export default function DetailsComment({
    commentId,
    previewText,
    relatedPost,
    postUrlTitle,
}: userProfileComment) {
    return (
        <div key={commentId} className="user-details-comment-container">
            <p className="details-comment-text">{previewText}</p>
            <Link
                to={`/posts/${relatedPost}/${postUrlTitle}/?commentId=${commentId}`}
                className="user-details-comment-link"
            >
                Related Post
            </Link>
        </div>
    );
}
