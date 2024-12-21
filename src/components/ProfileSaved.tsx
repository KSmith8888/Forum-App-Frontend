import { Link } from "react-router";

import { savedPostInterface } from "../utils/interfaces";

export default function ProfileSaved({
    postId,
    title,
    urlTitle,
}: savedPostInterface) {
    return (
        <div className="saved-post-link-container">
            <Link
                to={`/posts/${postId}/${urlTitle}/`}
                className="profile-notification-link"
            >
                {title}
            </Link>
        </div>
    );
}
