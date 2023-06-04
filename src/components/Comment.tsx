import React, { useState } from "react";

import { likeComment } from "../utils/like";
import { commentHistoryInterface, commentInterface } from "../utils/interfaces";

interface commentProps {
    commentData: commentInterface;
    isUserLoggedIn: boolean;
}

export default function Comment({ commentData, isUserLoggedIn }: commentProps) {
    const commentTimestamp = commentData.createdAt;
    const commentDate = new Date(commentTimestamp);
    const commentHours = commentDate.getHours();
    const commentMinutes = commentDate.getMinutes();
    const commentDateString = commentDate.toDateString();
    const commentHoursAmPm = commentHours >= 12 ? "PM" : "AM";
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
            const prevCommentTimestamp = prevComment.timestamp;
            const prevCommentDate = new Date(prevCommentTimestamp);
            const prevCommentHours = prevCommentDate.getHours();
            const prevCommentHoursAmPm = prevCommentHours >= 12 ? "PM" : "AM";
            const prevCommentMinutes = prevCommentDate.getMinutes();
            const prevCommentDateString = prevCommentDate.toDateString();
            return (
                <div key={index} className="previous-comment">
                    <p className="previous-comment-content">
                        {prevComment.content}
                    </p>
                    <p className="previous-comment-time">
                        Posted:{" "}
                        {`${
                            prevCommentHours > 12
                                ? prevCommentHours - 12
                                : prevCommentHours
                        }:${
                            prevCommentMinutes > 9
                                ? `${prevCommentMinutes} ${prevCommentHoursAmPm}`
                                : `0${prevCommentMinutes} ${prevCommentHoursAmPm}`
                        } ${prevCommentDateString}`}
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
                                const likesData = await likeComment(
                                    commentData._id
                                );
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
                <p className="comment-time">
                    Posted:{" "}
                    {`${commentHours > 12 ? commentHours - 12 : commentHours}:${
                        commentMinutes > 9
                            ? `${commentMinutes} ${commentHoursAmPm}`
                            : `0${commentMinutes} ${commentHoursAmPm}`
                    } ${commentDateString}`}
                </p>

                {commentData.hasBeenEdited && (
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
