//import { useEffect, useRef } from "react";
import { Form } from "react-router-dom";

import { commentFormProps } from "../utils/interfaces.ts";

export default function CommentForm({
    type,
    postId,
    commentId = "none",
}: commentFormProps) {
    /*
    const commentForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (commentForm.current && commentErrorMsg === null) {
            commentForm.current.reset();
        }
    }, [commentErrorMsg]);
    */
    return (
        <Form
            action={`/posts/details/${postId}`}
            className="comment-form"
            method="POST"
            autoComplete="off"
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
            ></textarea>
            <input type="hidden" value={postId} name="postId" />
            <input type="hidden" value={commentId} name="commentId" />
            <input type="hidden" value={type} name="type" />
            <button type="submit" className="button">
                Submit
            </button>
        </Form>
    );
}
