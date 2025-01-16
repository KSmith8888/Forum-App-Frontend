import { Form } from "react-router";

import savePostIcon from "../../assets/images/save-post-icon.png";
import unsavePostIcon from "../../assets/images/unsave-post-icon.png";

import { savePostFormProps } from "../../utils/interfaces";

export default function SavePostForm({
    _id,
    title,
    urlTitle,
    userSavedPost,
}: savePostFormProps) {
    return (
        <Form method="POST" id="save-post-form">
            <input type="hidden" name="save-post-id" value={_id} />
            <input type="hidden" name="save-post-title" value={title} />
            <input type="hidden" name="save-url-title" value={urlTitle} />
            {userSavedPost ? (
                <input
                    type="image"
                    className="save-unsave-post-button"
                    src={unsavePostIcon}
                    alt="A blue floppy disk indicating that the post has been saved, click to unsave it"
                    title="Unsave post"
                />
            ) : (
                <input
                    type="image"
                    className="save-unsave-post-button"
                    src={savePostIcon}
                    alt="A grey floppy disk indicating that the post is not saved, click to save it"
                    title="Save post"
                />
            )}
        </Form>
    );
}
