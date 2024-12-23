import { Form } from "react-router";

import { savePostFormProps } from "../utils/interfaces";

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
            <button
                className={
                    userSavedPost
                        ? "save-post-button-selected"
                        : "save-post-button"
                }
                aria-label={userSavedPost ? "Save post" : "Unsave post"}
                title="Save or unsave post"
                type="submit"
            ></button>
        </Form>
    );
}
