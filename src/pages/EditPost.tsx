import { useLoaderData, Form } from "react-router-dom";

export default function EditPost() {
    const loaderData = useLoaderData();
    let postTitle = "";
    let prevPostContent = "";
    if (loaderData && typeof loaderData === "object") {
        if ("title" in loaderData && typeof loaderData.title === "string") {
            postTitle = loaderData.title;
        }
        if ("content" in loaderData && typeof loaderData.content === "string") {
            prevPostContent = loaderData.content;
        }
    }

    return (
        <Form method="patch" className="edit-post-form">
            <h2 className="edit-post-form-heading">Edit Post</h2>
            <p className="edit-post-title">{postTitle}</p>
            <label htmlFor="content-input">Content:</label>
            <textarea
                id="content-input"
                className="input textarea"
                name="content"
                minLength={4}
                maxLength={900}
                rows={12}
                cols={50}
                defaultValue={prevPostContent}
                required
            ></textarea>
            <button type="submit" className="button">
                Update
            </button>
        </Form>
    );
}
