import { useLoaderData, Form, useActionData } from "react-router-dom";

import "../assets/styles/edit-content.css";

export default function EditComment() {
    const loaderData = useLoaderData();
    const errorMessage = useActionData();
    const prevContent = typeof loaderData === "string" ? loaderData : "";

    return (
        <Form method="PATCH" className="edit-content-form">
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
            <p className="edit-error-message">
                {typeof errorMessage === "string" ? errorMessage : ""}
            </p>
        </Form>
    );
}
