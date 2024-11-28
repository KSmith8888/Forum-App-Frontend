import { Link, Form } from "react-router-dom";
import { userProfileComment } from "../utils/interfaces.ts";

export default function ProfileComment({
    commentId,
    previewText,
    relatedPost,
    postUrlTitle,
}: userProfileComment) {
    return (
        <div key={commentId} className="comment-link-container">
            <Link
                to={`/posts/${relatedPost}/${postUrlTitle}/?commentId=${commentId}`}
                className="related-post-link"
            >
                {previewText}
            </Link>
            <div className="button-container">
                <Link
                    to={`/posts/comments/edit/${commentId}`}
                    className="button-link"
                >
                    Edit
                </Link>
                <Form method="DELETE">
                    <input type="hidden" name="commentId" value={commentId} />
                    <button type="submit" className="button">
                        Delete
                    </button>
                </Form>
            </div>
        </div>
    );
}
