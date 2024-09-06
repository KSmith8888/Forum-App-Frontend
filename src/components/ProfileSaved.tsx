import { Link } from "react-router-dom";

import { savedPostInterface } from "../utils/interfaces";

export default function ProfileSaved({ postId, title }: savedPostInterface) {
    return (
        <div className="saved-post-link-container">
            <Link
                to={`/posts/details/${postId}`}
                className="profile-notification-link"
            >
                {title}
            </Link>
        </div>
    );
}
