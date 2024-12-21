import { Link, Form } from "react-router";

import { reportInterface } from "../utils/interfaces.ts";
import { createDateString } from "../utils/create-date-string.ts";
import clipboardImg from "../assets/images/clipboard-icon.png";

export default function ModReport({
    messageId,
    postUrlTitle,
    messageType,
    relatedPost,
    createdAt,
    messageContent,
    _id,
}: reportInterface) {
    const linkId =
        messageType === "Post"
            ? `/posts/${messageId}/${postUrlTitle}/`
            : `/posts/${relatedPost}/${postUrlTitle}/?commentId=${messageId}`;
    const reportDateString = createDateString(createdAt, "Reported");
    return (
        <div className="report-container" key={messageId}>
            <p className="report-text">{`Report Type: ${messageType}`}</p>
            <div className="report-id-container">
                <p className="report-text">{`Id: ${messageId}`}</p>
                <button
                    className="clipboard-button"
                    title="Copy ID to clipboard"
                    type="button"
                    onClick={async () => {
                        await navigator.clipboard.writeText(messageId);
                    }}
                >
                    <img
                        className="clipboard-image"
                        src={clipboardImg}
                        alt="A grey and blue clipboard with white paper on it, signifying copy to clipboard functionality"
                    />
                </button>
            </div>
            <p className="report-text">{messageContent}</p>
            <div className="button-container">
                <Link to={linkId} className="moderation-link">
                    Reported Message
                </Link>
                <Form action="/moderation" method="DELETE">
                    <input type="hidden" value={_id} name="delete-report-id" />
                    <button type="submit" className="button">
                        Delete
                    </button>
                </Form>
            </div>
            <p className="report-text">{reportDateString}</p>
        </div>
    );
}
