import { useEffect, useRef } from "react";
import { Form, useSubmit } from "react-router-dom";

import { commentFormProps } from "../utils/interfaces.ts";

export default function CommentForm({
    commentErrorMsg,
    type,
    postId,
    commentId = "none",
}: commentFormProps) {
    const formSubmit = useSubmit();
    const commentForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (commentForm.current && commentErrorMsg === null) {
            commentForm.current.reset();
        }
    }, [commentErrorMsg]);
    return (
        <Form
            action={`/posts/details/${postId}`}
            className="comment-form"
            method="POST"
            autoComplete="off"
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
                onKeyDown={(e) => {
                    if (e.key === "Enter" && commentForm.current) {
                        e.preventDefault();
                        formSubmit(commentForm.current);
                    }
                }}
            ></textarea>
            <input type="hidden" value={postId} name="postId" />
            <input type="hidden" value={commentId} name="commentId" />
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
