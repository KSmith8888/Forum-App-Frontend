import { useState, useEffect } from "react";
import { Link, Form } from "react-router-dom";

import CommentForm from "./CommentForm.tsx";
import InnerContent from "./InnerContent.tsx";
import { commentHistoryInterface, commentProps } from "../utils/interfaces";
import { createDateString } from "../utils/create-date-string";

export default function Comment({
    commentData,
    isUserLoggedIn,
    commentErrorMsg,
    actionData,
    openReportModal,
}: commentProps) {
    const commentDateString = createDateString(commentData.createdAt, "Posted");
    const commentHasBeenEdited = commentData.hasBeenEdited;
    const editDateString = commentHasBeenEdited
        ? createDateString(commentData.updatedAt, "Edited")
        : "";
    const [commentLikes, setCommentLikes] = useState(commentData.likes);
    let didUserAlreadyLike = false;
    const savedLikedComments = sessionStorage.getItem("likedComments");
    if (savedLikedComments) {
        const parsedLikedComments = JSON.parse(savedLikedComments);
        if (parsedLikedComments.includes(commentData._id)) {
            didUserAlreadyLike = true;
        }
    }
    const [userLikedComment, setUserLikedComment] =
        useState(didUserAlreadyLike);
    const [showHistory, setShowHistory] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);

    useEffect(() => {
        if (
            actionData &&
            typeof actionData === "object" &&
            "didLikeComment" in actionData &&
            typeof actionData.didLikeComment === "boolean" &&
            "commentLikes" in actionData &&
            typeof actionData.commentLikes === "number" &&
            "likeCommentId" in actionData
        ) {
            if (actionData.likeCommentId === commentData._id) {
                setUserLikedComment(actionData.didLikeComment);
                setCommentLikes(actionData.commentLikes);
            }
        }
    }, [actionData]);
    const historyElements = commentData.history.map(
        (prevComment: commentHistoryInterface) => {
            const prevCommentDateString = createDateString(
                prevComment.timestamp,
                "Posted"
            );
            return (
                <div key={prevComment.editNumber} className="previous-comment">
                    <p className="previous-comment-content">
                        {prevComment.content}
                    </p>
                    <p className="previous-comment-time">
                        {prevCommentDateString}
                    </p>
                </div>
            );
        }
    );

    return (
        <>
            <article
                id={commentData._id}
                className={`comment ${commentData.commentReply ? "reply" : ""}`}
            >
                <div className="column-content">
                    <InnerContent
                        content={commentData.content}
                        type="Comment"
                    />
                    <div className="comment-likes-container">
                        <p className="comment-likes">Likes: {commentLikes}</p>
                        {isUserLoggedIn && (
                            <>
                                <div className="button-container">
                                    <Form method="POST">
                                        <input
                                            type="hidden"
                                            name="like-comment-id"
                                            value={commentData._id}
                                        />
                                        <button
                                            className={
                                                userLikedComment
                                                    ? "button selected"
                                                    : "button"
                                            }
                                        >
                                            Like
                                        </button>
                                    </Form>
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() => {
                                            setShowReplyForm(
                                                (prevState) => !prevState
                                            );
                                        }}
                                    >
                                        Reply
                                    </button>
                                    <button
                                        className="button"
                                        onClick={async () => {
                                            try {
                                                openReportModal(
                                                    commentData._id,
                                                    "Comment",
                                                    commentData.relatedPost
                                                );
                                            } catch (error) {
                                                if (error instanceof Error) {
                                                    console.log(error.message);
                                                }
                                            }
                                        }}
                                    >
                                        Report
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="column-info">
                    <div className="author-info-container">
                        <img
                            src={`/profile-images/${commentData.profileImageName}`}
                            alt={commentData.profileImageAlt}
                            className="comment-profile-image"
                        />
                        <div className="author-time-text">
                            <p className="comment-author">
                                Author:{" "}
                                {commentData.user !== "Deleted" ? (
                                    <Link
                                        to={`/users/details/${commentData.user}`}
                                        className="comment-author-link"
                                    >
                                        {commentData.user}
                                    </Link>
                                ) : (
                                    <span className="deleted-author">
                                        Deleted
                                    </span>
                                )}
                            </p>
                            <p className="comment-time">{commentDateString}</p>
                            {commentHasBeenEdited && (
                                <p className="comment-edited-time">
                                    {editDateString}
                                </p>
                            )}
                        </div>
                    </div>
                    {commentHasBeenEdited && (
                        <>
                            <button
                                className="button"
                                onClick={() => {
                                    setShowHistory((prevShowHistory) => {
                                        return !prevShowHistory;
                                    });
                                }}
                            >
                                Edit History
                            </button>
                        </>
                    )}
                </div>
            </article>
            {showHistory && (
                <div className="comment-history-container">
                    <h3 className="comment-history-container-heading">
                        Previous Comment Versions
                    </h3>
                    <div className="comment-history-elements">
                        {historyElements}
                    </div>
                </div>
            )}
            {showReplyForm && (
                <div className="comment-form-container">
                    <CommentForm
                        commentErrorMsg={commentErrorMsg}
                        type="comment"
                        postId={commentData.relatedPost}
                        commentId={commentData._id}
                    />
                </div>
            )}
        </>
    );
}
