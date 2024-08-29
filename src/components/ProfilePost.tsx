import { Link, Form } from "react-router-dom";
import { userProfilePost } from "../utils/interfaces.ts";

export default function ProfilePost({ postId, title }: userProfilePost) {
    return (
        <div key={postId} className="post-link-container">
            <Link to={`/posts/details/${postId}`} className="profile-post-link">
                {title}
            </Link>
            <div className="button-container">
                <Link to={`/posts/edit/${postId}`} className="button-link">
                    Edit
                </Link>
                <Form method="POST">
                    <input type="hidden" name="post" value="posts" />
                    <input type="hidden" name="id" value={postId} />
                    <button className="button">Delete</button>
                </Form>
            </div>
        </div>
    );
}
