import { Link, Form } from "react-router-dom";
import { userProfileComment } from "../utils/interfaces.ts";

export default function ProfileComment({
    commentId,
    previewText,
    relatedPost,
}: userProfileComment) {
    return (
        <div key={commentId} className="comment-link-container">
            <Link
                to={`/posts/details/${relatedPost}?commentId=${commentId}`}
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
                <Form method="POST">
                    <input type="hidden" name="comment" value="comments" />
                    <input type="hidden" name="id" value={commentId} />
                    <button type="submit" className="button">
                        Delete
                    </button>
                </Form>
            </div>
        </div>
    );
}
