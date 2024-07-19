import { useState, useRef, useEffect } from "react";
import {
    useLoaderData,
    useOutletContext,
    useActionData,
    useSearchParams,
    Link,
    Form,
    useSubmit,
} from "react-router-dom";

import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm.tsx";
import PostHistory from "../components/PostHistory.tsx";
import { likePost } from "../utils/like.ts";
import { savePost } from "../utils/save-post.ts";
import {
    outletInterface,
    commentInterface,
    postHistoryInterface,
    postRelatedComments,
    likeInterface,
} from "../utils/interfaces.ts";
import { createDateString } from "../utils/create-date-string.ts";

import "../assets/styles/post.css";

export default function Post() {
    const loaderData = useLoaderData() as postRelatedComments;
    const postData = loaderData.post;
    const commentData = loaderData.comments;
    const postDateString = createDateString(postData.createdAt, "Posted");
    const postHasBeenEdited = postData.hasBeenEdited;
    const editDateString = postHasBeenEdited
        ? createDateString(postData.updatedAt, "Edited")
        : "";
    const { isUserLoggedIn } = useOutletContext<outletInterface>();
    let didUserAlreadyLike = false;
    let didUserAlreadySave = false;
    const savedLikedPosts = sessionStorage.getItem("likedPosts");
    if (savedLikedPosts) {
        const parsedLikedPosts = JSON.parse(savedLikedPosts);
        if (parsedLikedPosts.includes(postData._id)) {
            didUserAlreadyLike = true;
        }
    }
    const localSavedPosts = sessionStorage.getItem("saved-posts");
    if (localSavedPosts) {
        const parsedSavedPosts = JSON.parse(localSavedPosts);
        if (parsedSavedPosts.includes(postData._id)) {
            didUserAlreadySave = true;
        }
    }
    const [userLikedPost, setUserLikedPost] = useState(didUserAlreadyLike);
    const [userSavedPost, setUserSavedPost] = useState(didUserAlreadySave);
    const [postLikes, setPostLikes] = useState(postData.likes);
    const [showHistory, setShowHistory] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [reportId, setReportId] = useState("none");
    const [reportType, setReportType] = useState("none");
    const [reportRelated, setReportRelated] = useState("none");
    const historyElements = postData.history.map(
        (prevVersion: postHistoryInterface) => {
            return (
                <PostHistory
                    key={prevVersion.id}
                    timestamp={prevVersion.timestamp}
                    title={prevVersion.title}
                    content={prevVersion.content}
                />
            );
        }
    );
    const actionData = useActionData();
    const [commentErrorMsg, setCommentErrorMsg] = useState<null | string>(null);
    useEffect(() => {
        if (Array.isArray(actionData)) {
            setShowCommentForm(false);
        } else if (typeof actionData === "string") {
            setCommentErrorMsg(actionData);
        } else if (
            actionData &&
            typeof actionData === "object" &&
            "msg" in actionData
        ) {
            if (
                reportForm &&
                reportForm.current &&
                reportModal &&
                reportModal.current
            ) {
                reportForm.current.reset();
                reportModal.current.close();
            }
        }
    }, [actionData]);
    const formSubmit = useSubmit();
    const [searchParams] = useSearchParams();
    const commentId = searchParams.get("commentId");
    useEffect(() => {
        if (commentId) {
            const commentEl = document.getElementById(commentId);
            if (commentEl) {
                commentEl.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, []);
    const reportModal = useRef<HTMLDialogElement>(null);
    const reportForm = useRef<HTMLFormElement>(null);
    function openReportModal(
        messageId: string,
        reportType: string,
        relatedId: string
    ) {
        if (reportModal.current) {
            setReportId(messageId);
            setReportType(reportType);
            setReportRelated(relatedId);
            reportModal.current.showModal();
        }
    }

    const [showRemainingComments, setShowRemainingComments] = useState(false);
    const firstTenComments = commentData.slice(0, 10);
    const commentElements =
        firstTenComments.length > 0
            ? firstTenComments.map((comment: commentInterface) => {
                  return (
                      <Comment
                          key={comment._id}
                          commentData={comment}
                          commentErrorMsg={commentErrorMsg}
                          actionData={actionData}
                          isUserLoggedIn={isUserLoggedIn}
                          openReportModal={openReportModal}
                      />
                  );
              })
            : [];
    const remainingComments = commentData.slice(10);
    const remainingCommentElements =
        remainingComments.length > 0
            ? remainingComments.map((comment: commentInterface) => {
                  return (
                      <Comment
                          key={comment._id}
                          commentData={comment}
                          commentErrorMsg={commentErrorMsg}
                          actionData={actionData}
                          isUserLoggedIn={isUserLoggedIn}
                          openReportModal={openReportModal}
                      />
                  );
              })
            : [];

    return (
        <div id={postData._id} className="post-container">
            <article className="post">
                <div className="column-content">
                    {isUserLoggedIn && (
                        <button
                            className={
                                userSavedPost
                                    ? "save-post-button-selected"
                                    : "save-post-button"
                            }
                            onClick={async () => {
                                try {
                                    const savePostData = await savePost(
                                        postData._id,
                                        postData.title
                                    );
                                    setUserSavedPost(savePostData.didUserSave);
                                } catch (error) {
                                    if (error instanceof Error) {
                                        console.error(error.message);
                                    }
                                }
                            }}
                            aria-label={
                                userSavedPost ? "Save post" : "Unsave post"
                            }
                            title="Save or unsave post"
                        ></button>
                    )}
                    <div className="post-main-content-container">
                        <div className="post-inner-content-container">
                            <h2 className="post-title">{postData.title}</h2>

                            {postData.postType === "Link" ? (
                                <p className="link-post-text">
                                    <a
                                        href={postData.content}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="link-post-anchor"
                                    >
                                        {postData.content}
                                    </a>
                                </p>
                            ) : (
                                <p className="text-post-text">
                                    {` ${postData.content}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="post-likes-container">
                        <p className="post-likes">Likes: {postLikes}</p>
                        {isUserLoggedIn && (
                            <div className="button-container">
                                <button
                                    className={
                                        userLikedPost
                                            ? "button selected"
                                            : "button"
                                    }
                                    onClick={async () => {
                                        try {
                                            const likesData: likeInterface =
                                                await likePost(postData._id);
                                            setPostLikes(likesData.likes);
                                            setUserLikedPost(
                                                likesData.didUserLike
                                            );
                                        } catch (error) {
                                            if (error instanceof Error) {
                                                console.error(error.message);
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
                                        setShowCommentForm(
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
                                                postData._id,
                                                "Post",
                                                "none"
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
                        )}
                    </div>
                    <dialog className="report-modal" ref={reportModal}>
                        <Form method="POST" ref={reportForm} id="report-form">
                            <button
                                className="close-modal-button"
                                type="button"
                                aria-label="Close report form"
                                onClick={() => {
                                    if (reportModal.current) {
                                        reportModal.current.close();
                                    }
                                }}
                            >
                                X
                            </button>
                            <p className="report-modal-text">
                                Report to the moderation team?
                            </p>
                            <label htmlFor="report-message-input">
                                Message:
                            </label>
                            <textarea
                                id="report-message-input"
                                className="input textarea"
                                name="report-content"
                                minLength={4}
                                maxLength={120}
                                rows={6}
                                required
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Enter" &&
                                        reportForm.current
                                    ) {
                                        e.preventDefault();
                                        formSubmit(reportForm.current);
                                    }
                                }}
                            ></textarea>
                            <input
                                type="hidden"
                                name="report-related-id"
                                value={reportRelated}
                            />
                            <input
                                type="hidden"
                                name="report-message-id"
                                value={reportId}
                            />
                            <input
                                type="hidden"
                                name="report-type"
                                value={reportType}
                            />
                            <button className="button" type="submit">
                                Submit
                            </button>
                        </Form>
                    </dialog>
                    {!isUserLoggedIn && (
                        <p>Log in or create an account to comment</p>
                    )}
                </div>
                <div className="column-info">
                    <Link
                        to={`/posts/${postData.topic}`}
                        className="post-topic-link"
                    >
                        {postData.topic} Topic
                    </Link>
                    <div className="author-info-container">
                        <img
                            src={`/profile-images/${postData.profileImageName}`}
                            alt={postData.profileImageAlt}
                            className="post-profile-image"
                        />
                        <p className="post-author">
                            Author:{" "}
                            {postData.user !== "Deleted" ? (
                                <Link
                                    to={`/users/details/${postData.user}`}
                                    className="post-author-link"
                                >
                                    {postData.user}
                                </Link>
                            ) : (
                                <span className="deleted-author">Deleted</span>
                            )}
                        </p>
                    </div>
                    <p className="post-time">{postDateString}</p>

                    {postHasBeenEdited && (
                        <>
                            <p className="post-edited-time">{editDateString}</p>
                            <button
                                className="button"
                                type="button"
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
                <div className="post-history-container">
                    <h3 className="post-history-container-heading">
                        Previous Post Versions
                    </h3>
                    <div className="post-history-elements">
                        {historyElements}
                    </div>
                </div>
            )}
            {showCommentForm && (
                <div className="comment-form-container">
                    <CommentForm
                        commentErrorMsg={commentErrorMsg}
                        type={"post"}
                        postId={postData._id}
                    />
                </div>
            )}
            <div className="comments-container">{commentElements}</div>
            {showRemainingComments
                ? remainingCommentElements
                : remainingCommentElements.length > 0 && (
                      <button
                          type="button"
                          className="button"
                          onClick={() => {
                              setShowRemainingComments(true);
                          }}
                      >
                          Show More
                      </button>
                  )}
        </div>
    );
}
