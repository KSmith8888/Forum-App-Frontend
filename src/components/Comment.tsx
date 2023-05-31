import React, { useState } from "react";

import { likeComment } from "../utils/like.js";

interface commentProps {
    _id: string;
    content: string;
    commentHours: number;
    commentMinutes: number;
    commentDateString: string;
    commentHasBeenEdited: boolean;
    isUserLoggedIn: boolean;
    history: Array<string>;
    likes: number;
    username: string;
}

export default function Comment({
    _id,
    content,
    commentHours,
    commentMinutes,
    commentDateString,
    commentHasBeenEdited,
    history,
    isUserLoggedIn,
    likes,
    username,
}: commentProps) {
    const [commentLikes, setCommentLikes] = useState(likes);
    const [userLikedComment, setUserLikedComment] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const historyElements = history.map((prevContent: string, index) => {
        return <p key={index}>{prevContent}</p>;
    });

    return (
        <div className="comment">
            <p className="comment-text">{content}</p>
            <p className="comment-info">
                <span className="comment-author">Author: {username}</span>
                <span className="comment-time">
                    Posted:{" "}
                    {`${commentHours > 12 ? commentHours - 12 : commentHours}:${
                        commentMinutes > 9
                            ? commentMinutes
                            : `0${commentMinutes}`
                    } ${commentDateString}`}
                </span>
                <span className="comment-likes">Likes: {commentLikes}</span>
                {commentHasBeenEdited && (
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
            </p>
            {showHistory && (
                <div className="comment-history-container">
                    <h3>Previous Comment Versions</h3>
                    {historyElements}
                </div>
            )}
            {isUserLoggedIn && (
                <button
                    className={
                        userLikedComment
                            ? "like-button selected"
                            : "like-button"
                    }
                    onClick={async () => {
                        try {
                            const likesData = await likeComment(_id);
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
    );
}
