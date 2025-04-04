import { Link, Form } from "react-router";
import { notificationInterface } from "../../utils/interfaces.ts";

import { createDateString } from "../../utils/create-date-string.ts";

export default function ProfileNotification({
    _id,
    type,
    message,
    relatedPostId,
    commentId,
    postUrlTitle,
    createdAt,
}: notificationInterface) {
    const userRole = sessionStorage.getItem("role");
    const canDelete = type !== "Warning" || userRole === "admin";
    const dateString = createDateString(createdAt, "Created");
    return (
        <div key={_id} className="profile-notification-container">
            <p
                className={`notification-message ${
                    type === "Warning" ? "warning" : ""
                }`}
            >
                {type === "Warning" && "Warning - "}
                {message}
            </p>
            <div className="notification-options">
                {type === "Reply" && (
                    <Link
                        to={`/posts/${relatedPostId}/${postUrlTitle}/?commentId=${commentId}`}
                        className="profile-notification-link"
                    >
                        View Reply
                    </Link>
                )}
                {type === "Achievement" && (
                    <Link
                        to={`/posts/${relatedPostId}/${postUrlTitle}/`}
                        className="profile-notification-link"
                    >
                        View Post
                    </Link>
                )}
                {canDelete && (
                    <Form method="DELETE">
                        <input
                            type="hidden"
                            name="notificationId"
                            value={_id}
                        />
                        <button className="button">Delete</button>
                    </Form>
                )}
            </div>
            <p className="notification-date">{dateString}</p>
        </div>
    );
}
