import { useState } from "react";

import { likeComment } from "../utils/like";
import {
    commentHistoryInterface,
    likeInterface,
    commentProps,
} from "../utils/interfaces";
import { createDateString } from "../utils/create-date-string";

export default function Comment({ commentData, isUserLoggedIn }: commentProps) {
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
        <div className="comment">
            <p className="comment-text">{commentData.content}</p>
            <div className="comment-likes-container">
                <p className="comment-likes">Likes: {commentLikes}</p>
                {isUserLoggedIn && (
                    <button
                        className={
                            userLikedComment
                                ? "like-button selected"
                                : "like-button"
                        }
                        onClick={async () => {
                            try {
                                const likesData: likeInterface =
                                    await likeComment(commentData._id);
                                setCommentLikes(likesData.likes);
                                setUserLikedComment(likesData.didUserLike);
                            } catch (error) {
                                if (error instanceof Error) {
                                    console.error(error.message);
                                }
                            }
                        }}
                    >
                        Like
                    </button>
                )}
            </div>
            <div className="comment-info-container">
                <img
                    src={`/profile-images/${commentData.profileImageName}`}
                    alt={commentData.profileImageAlt}
                    className="comment-profile-image"
                />
                <p className="comment-author">Author: {commentData.user}</p>
                <p className="comment-time">{commentDateString}</p>
                {commentHasBeenEdited && (
                    <>
                        <p className="comment-edited-time">{editDateString}</p>
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

            {showHistory && (
                <div className="comment-history-container">
                    <h3>Previous Comment Versions</h3>
                    {historyElements}
                </div>
            )}
        </div>
    );
}
