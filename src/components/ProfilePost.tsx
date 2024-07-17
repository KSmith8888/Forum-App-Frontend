import { Link, Form } from "react-router-dom";
import { userProfilePost } from "../utils/interfaces.ts";

export default function ProfilePost({ id, title }: userProfilePost) {
    return (
        <div key={id} className="post-link-container">
            <Link to={`/posts/details/${id}`} className="profile-post-link">
                {title}
            </Link>
            <div className="button-container">
                <Link to={`/posts/edit/${id}`} className="button-link">
                    Edit
                </Link>
                <Form method="POST">
                    <input type="hidden" name="post" value="posts" />
                    <input type="hidden" name="id" value={id} />
                    <button className="button">Delete</button>
                </Form>
            </div>
        </div>
    );
}
