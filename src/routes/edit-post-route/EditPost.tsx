import { useLoaderData, Form, useActionData } from "react-router";

import editPostLoader from "./edit-post-loader";
import editPostAction from "./edit-post-action";

import { editPostLoaderData } from "../../utils/interfaces";
import "../../assets/styles/edit-content.css";

function EditPost() {
    const loaderData = useLoaderData() as editPostLoaderData;
    const errorMessage = useActionData();

    return (
        <Form method="PATCH" className="edit-content-form">
            <h2 className="edit-post-form-heading">Edit Post</h2>
            <p className="edit-post-title">{loaderData.title}</p>
            <label htmlFor="content-input">Content:</label>
            <textarea
                id="content-input"
                className="input textarea"
                name="content"
                minLength={loaderData.postType === "Text" ? 50 : 12}
                maxLength={loaderData.postType === "Text" ? 900 : 200}
                rows={loaderData.postType === "Text" ? 12 : 1}
                cols={50}
                defaultValue={loaderData.content}
                required
            ></textarea>
            <input type="hidden" name="post-type" value={loaderData.postType} />
            <button type="submit" className="button">
                Update
            </button>
            <p className="edit-error-message">
                {typeof errorMessage === "string" ? errorMessage : ""}
            </p>
        </Form>
    );
}

export { EditPost as Component };
export { editPostLoader as loader };
export { editPostAction as action };
