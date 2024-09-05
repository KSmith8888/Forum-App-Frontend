import { Link } from "react-router-dom";

import { userProfilePost } from "../utils/interfaces.ts";

export default function DetailsPost({ postId, title }: userProfilePost) {
    return (
        <div key={postId} className="user-details-post-container">
            <Link
                to={`/posts/details/${postId}`}
                className="user-details-post-link"
            >
                {title}
            </Link>
        </div>
    );
}
