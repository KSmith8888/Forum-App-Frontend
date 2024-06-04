import { useEffect, useRef } from "react";
import { Form } from "react-router-dom";

interface commentFormProps {
    commentErrorMsg: string | null;
    type: "post" | "comment";
    postId: string;
    commentId?: string;
}

export default function CommentForm({
    commentErrorMsg,
    type,
    postId,
    commentId = "none",
}: commentFormProps) {
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
                rows={6}
                cols={40}
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
