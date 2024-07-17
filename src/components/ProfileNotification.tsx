import { Link, Form } from "react-router-dom";
import { notificationInterface } from "../utils/interfaces.ts";

export default function ProfileNotification({
    _id,
    type,
    message,
    replyMessageId,
    commentId,
}: notificationInterface) {
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
                        to={`/posts/details/${replyMessageId}?commentId=${commentId}`}
                        className="profile-notification-link"
                    >
                        See Reply
                    </Link>
                )}
                <Form method="POST">
                    <input
                        type="hidden"
                        name="notification"
                        value="notifications"
                    />
                    <input type="hidden" name="id" value={_id} />
                    <button className="button">Delete</button>
                </Form>
            </div>
        </div>
    );
}
