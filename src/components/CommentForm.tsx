import { useEffect, useRef } from "react";
import { Form } from "react-router-dom";

interface commentFormProps {
    commentErrorMsg: string | null;
    id: string;
    type: "post" | "comment";
}

export default function CommentForm({
    commentErrorMsg,
    id,
    type,
}: commentFormProps) {
    const commentForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (commentForm.current) {
            commentForm.current.reset();
        }
    }, [commentErrorMsg]);
    return (
        <Form
            action={`/posts/details/${id}`}
            className="comment-form"
            method="POST"
            ref={commentForm}
        >
            <label htmlFor="comment-input" className="comment-form-label">
                Leave a comment:
            </label>
            <textarea
                id="comment-input"
                className="input textarea"
                name="content"
                maxLength={300}
                minLength={4}
                rows={6}
                cols={40}
            ></textarea>
            <input type="hidden" value={id} name="relatedId" />
            <input type="hidden" value={type} name="type" />
            <button type="submit" className="button">
                Submit
            </button>
            <p className="error-message">
                {typeof commentErrorMsg === "string" ? commentErrorMsg : ""}
            </p>
        </Form>
    );
}
