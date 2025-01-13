import { Link, Form } from "react-router";
import { userProfilePost } from "../../utils/interfaces.ts";

export default function ProfilePost({
    postId,
    title,
    urlTitle,
}: userProfilePost) {
    return (
        <div key={postId} className="post-link-container">
            <Link
                to={`/posts/${postId}/${urlTitle}/`}
                className="profile-post-link"
            >
                {title}
            </Link>
            <div className="button-container">
                <Link
                    to={`/posts/edit/${postId}/${urlTitle}/`}
                    className="button-link"
                >
                    Edit
                </Link>
                <Form method="DELETE">
                    <input type="hidden" name="postId" value={postId} />
                    <button className="button">Delete</button>
                </Form>
            </div>
        </div>
    );
}
