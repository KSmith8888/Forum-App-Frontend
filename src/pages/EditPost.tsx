import { useLoaderData, Form, useActionData } from "react-router";

import "../assets/styles/edit-content.css";

export default function EditPost() {
    const loaderData = useLoaderData();
    const errorMessage = useActionData();
    let postTitle = "";
    let prevPostContent = "";
    let typeOfPost = "Text";
    if (loaderData && typeof loaderData === "object") {
        if ("title" in loaderData && typeof loaderData.title === "string") {
            postTitle = loaderData.title;
        }
        if ("content" in loaderData && typeof loaderData.content === "string") {
            prevPostContent = loaderData.content;
        }
        if ("postType" in loaderData && loaderData.postType === "Link") {
            typeOfPost = "Link";
        }
    }

    return (
        <Form method="PATCH" className="edit-content-form">
            <h2 className="edit-post-form-heading">Edit Post</h2>
            <p className="edit-post-title">{postTitle}</p>
            <label htmlFor="content-input">Content:</label>
            <textarea
                id="content-input"
                className="input textarea"
                name="content"
                minLength={typeOfPost === "Text" ? 50 : 12}
                maxLength={typeOfPost === "Text" ? 900 : 200}
                rows={typeOfPost === "Text" ? 12 : 1}
                cols={50}
                defaultValue={prevPostContent}
                required
            ></textarea>
            <input type="hidden" name="post-type" value={typeOfPost} />
            <button type="submit" className="button">
                Update
            </button>
            <p className="edit-error-message">
                {typeof errorMessage === "string" ? errorMessage : ""}
            </p>
        </Form>
    );
}
