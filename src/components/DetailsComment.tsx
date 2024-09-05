import { Link } from "react-router-dom";

import { userProfileComment } from "../utils/interfaces.ts";

export default function DetailsComment({
    commentId,
    content,
    relatedPost,
}: userProfileComment) {
    return (
        <div key={commentId} className="user-details-comment-container">
            <p className="details-comment-text">{content}</p>
            <Link
                to={`/posts/details/${relatedPost}?commentId=${commentId}`}
                className="user-details-comment-link"
            >
                Related Post
            </Link>
        </div>
    );
}
