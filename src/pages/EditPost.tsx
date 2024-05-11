import { useLoaderData, Form } from "react-router-dom";

export default function EditPost() {
    const loaderData = useLoaderData();
    let prevPostTitle = "";
    let prevPostContent = "";
    if (loaderData && typeof loaderData === "object") {
        if ("title" in loaderData && typeof loaderData.title === "string") {
            prevPostTitle = loaderData.title;
        }
        if ("content" in loaderData && typeof loaderData.content === "string") {
            prevPostContent = loaderData.content;
        }
    }

    return (
        <Form method="patch" className="post-form">
            <h2>Edit Post</h2>
            <label htmlFor="title-input">Title:</label>
            <input
                id="title-input"
                name="title"
                className="input"
                type="text"
                minLength={4}
                maxLength={60}
                defaultValue={prevPostTitle}
            ></input>
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
