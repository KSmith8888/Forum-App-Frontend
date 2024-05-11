import { useLoaderData, Form } from "react-router-dom";

export default function EditComment() {
    const loaderData = useLoaderData();
    const prevContent = typeof loaderData === "string" ? loaderData : "";

    return (
        <Form method="POST" className="edit-comment-form">
            <h2>Edit Comment</h2>
            <label htmlFor="content-input">Content:</label>
            <textarea
                id="content-input"
                name="content"
                className="input textarea"
                minLength={4}
                maxLength={300}
                rows={6}
                cols={40}
                defaultValue={prevContent}
                required
            ></textarea>
            <button type="submit" className="button">
                Update
            </button>
        </Form>
    );
}
