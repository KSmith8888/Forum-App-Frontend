import { Link, Form } from "react-router-dom";
import { userProfileComment } from "../utils/interfaces.ts";

export default function ProfileComment({
    _id,
    content,
    relatedPost,
}: userProfileComment) {
    const startingChars = content.substring(0, 50);
    return (
        <div key={_id} className="comment-link-container">
            <Link
                to={`/posts/details/${relatedPost}?commentId=${_id}`}
                className="related-post-link"
            >
                {`${startingChars}...`}
            </Link>
            <div className="button-container">
                <Link
                    to={`/posts/comments/edit/${_id}`}
                    className="button-link"
                >
                    Edit
                </Link>
                <Form method="POST">
                    <input type="hidden" name="comment" value="comments" />
                    <input type="hidden" name="id" value={_id} />
                    <button type="submit" className="button">
                        Delete
                    </button>
                </Form>
            </div>
        </div>
    );
}
