import { useState, useEffect } from "react";

import CommentForm from "./CommentForm.tsx";
import { likeComment } from "../utils/like";
import {
    commentHistoryInterface,
    likeInterface,
    commentProps,
} from "../utils/interfaces";
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
    const savedLikedComments = localStorage.getItem("likedComments");
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
        if (showReplyForm && Array.isArray(actionData)) {
            setShowReplyForm(false);
        }
    }, [actionData]);
    const historyElements = commentData.history.map(
        (prevComment: commentHistoryInterface, index: number) => {
            const prevCommentDateString = createDateString(
                prevComment.timestamp,
                "Posted"
            );
            return (
                <div key={index} className="previous-comment">
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
                className={`comment ${commentData.commentReply ? "reply" : ""}`}
            >
                <div className="column-content">
                    <p className="comment-text">{commentData.content}</p>
                    <div className="comment-likes-container">
                        <p className="comment-likes">Likes: {commentLikes}</p>
                        {isUserLoggedIn && (
                            <>
                                <div className="button-container">
                                    <button
                                        className={
                                            userLikedComment
                                                ? "like-button selected"
                                                : "like-button"
                                        }
                                        onClick={async () => {
                                            try {
                                                const likesData: likeInterface =
                                                    await likeComment(
                                                        commentData._id
                                                    );
                                                setCommentLikes(
                                                    likesData.likes
                                                );
                                                setUserLikedComment(
                                                    likesData.didUserLike
                                                );
                                            } catch (error) {
                                                if (error instanceof Error) {
                                                    console.error(
                                                        error.message
                                                    );
                                                }
                                            }
                                        }}
                                    >
                                        Like
                                    </button>
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
                        <p className="comment-author">
                            Author:{" "}
                            <span className="comment-author-span">
                                {commentData.user}
                            </span>
                        </p>
                    </div>
                    <p className="comment-time">{commentDateString}</p>
                    {commentHasBeenEdited && (
                        <>
                            <p className="comment-edited-time">
                                {editDateString}
                            </p>
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
                    <h3>Previous Comment Versions</h3>
                    {historyElements}
                </div>
            )}
            {showReplyForm && (
                <CommentForm
                    commentErrorMsg={commentErrorMsg}
                    type="comment"
                    postId={commentData.relatedPost}
                    commentId={commentData._id}
                />
            )}
        </>
    );
}
