import { useState, useRef, useEffect } from "react";
import {
    useLoaderData,
    useOutletContext,
    useActionData,
    useSearchParams,
    Link,
    Form,
    useSubmit,
} from "react-router";

import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm.tsx";
import PostHistory from "../components/PostHistory.tsx";
import PollForm from "../components/PollForm.tsx";
import {
    outletInterface,
    commentInterface,
    postHistoryInterface,
    postRelatedComments,
} from "../utils/interfaces.ts";
import { createDateString } from "../utils/create-date-string.ts";

import openIconImage from "../assets/images/open-link-icon.png";
import "../assets/styles/post.css";

export default function Post() {
    const loaderData = useLoaderData() as postRelatedComments;
    const postData = loaderData.post;
    const commentData = loaderData.comments;
    const postDateString = createDateString(postData.createdAt, "Posted");
    const postHasBeenEdited = postData.hasBeenEdited;
    const editDateString = postHasBeenEdited
        ? createDateString(postData.lastEditedAt, "Edited")
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
                    key={prevVersion.editNumber}
                    timestamp={prevVersion.timestamp}
                    content={prevVersion.content}
                    editNumber={prevVersion.editNumber}
                />
            );
        }
    );
    const actionData = useActionData();
    const errorModal = useRef<HTMLDialogElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if (Array.isArray(actionData)) {
            setShowCommentForm(false);
        } else if (typeof actionData === "string" && errorModal.current) {
            const splitMessage = actionData.split("-TIMESTAMP-");
            setErrorMessage(splitMessage[0]);
            errorModal.current.showModal();
        } else if (actionData && typeof actionData === "object") {
            if (
                "didUserSave" in actionData &&
                typeof actionData.didUserSave === "boolean"
            ) {
                setUserSavedPost(actionData.didUserSave);
            } else if (
                "didUserLike" in actionData &&
                typeof actionData.didUserLike === "boolean" &&
                "likes" in actionData &&
                typeof actionData.likes === "number"
            ) {
                setPostLikes(actionData.likes);
                setUserLikedPost(actionData.didUserLike);
            }
            if (
                "message" in actionData &&
                actionData.message === "Message reported successfully" &&
                reportModal.current
            ) {
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
                          actionData={actionData}
                          postUrlTitle={postData.urlTitle}
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
                          actionData={actionData}
                          postUrlTitle={postData.urlTitle}
                          isUserLoggedIn={isUserLoggedIn}
                          openReportModal={openReportModal}
                      />
                  );
              })
            : [];

    return (
        <div id={postData._id} className="post-container">
            <dialog
                className="error-modal"
                ref={errorModal}
                onClick={(e) => {
                    if (e.target === e.currentTarget && errorModal.current) {
                        errorModal.current.close();
                    }
                }}
            >
                <button
                    className="close-modal-button"
                    aria-label="Close"
                    onClick={() => {
                        if (errorModal.current) {
                            errorModal.current.close();
                        }
                    }}
                >
                    X
                </button>
                <p className="error-modal-text">
                    {errorMessage ||
                        "There has been an error, please try again later"}
                </p>
            </dialog>
            <article className="post">
                <div className="column-content">
                    <div className="content-top-line">
                        <Link
                            to={`/posts/topics/${postData.topic}/`}
                            className="post-topic-link"
                        >
                            {postData.topic}
                        </Link>
                        {isUserLoggedIn && (
                            <Form method="POST" id="save-post-form">
                                <input
                                    type="hidden"
                                    name="save-post-id"
                                    value={postData._id}
                                />
                                <input
                                    type="hidden"
                                    name="save-post-title"
                                    value={postData.title}
                                />
                                <input
                                    type="hidden"
                                    name="save-url-title"
                                    value={postData.urlTitle}
                                />
                                <button
                                    className={
                                        userSavedPost
                                            ? "save-post-button-selected"
                                            : "save-post-button"
                                    }
                                    aria-label={
                                        userSavedPost
                                            ? "Save post"
                                            : "Unsave post"
                                    }
                                    title="Save or unsave post"
                                    type="submit"
                                ></button>
                            </Form>
                        )}
                    </div>
                    <div className="post-main-content-container">
                        <div className="post-inner-content-container">
                            <h2 className="post-title">{postData.title}</h2>
                            {postData.postType === "Text" && (
                                <p className="text-post-text">
                                    {postData.content}
                                </p>
                            )}
                            {postData.postType === "Link" && (
                                <p className="link-post-text">
                                    <a
                                        href={postData.content}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="link-post-anchor"
                                    >
                                        {postData.content}
                                        <img
                                            src={openIconImage}
                                            alt={
                                                postData.content.startsWith(
                                                    "https://4em.pages.dev"
                                                )
                                                    ? "Opens in a new tab"
                                                    : "External link, opens in a new tab"
                                            }
                                            className="open-link-icon-image"
                                        ></img>
                                    </a>
                                </p>
                            )}
                            {postData.postType === "Poll" && (
                                <PollForm
                                    options={postData.pollData}
                                    postId={postData._id}
                                />
                            )}
                        </div>
                    </div>
                    <div className="post-likes-container">
                        <p className="post-likes">Likes: {postLikes}</p>
                        {isUserLoggedIn && (
                            <div className="button-container">
                                <Form method="POST">
                                    <input
                                        type="hidden"
                                        name="like-post-id"
                                        value={postData._id}
                                    />
                                    <button
                                        type="submit"
                                        className={
                                            userLikedPost
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
                            <h3 className="report-modal-heading">
                                Report to the moderation team?
                            </h3>
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
                        <p className="account-to-comment-text">
                            Log in or create an account to comment
                        </p>
                    )}
                </div>
                <div className="column-info">
                    <div className="author-info-container">
                        <img
                            src={`/profile-images/${postData.profileImageName}`}
                            alt={postData.profileImageAlt}
                            className="post-profile-image"
                        />
                        <div className="author-time-text">
                            <p className="post-author">
                                Author:{" "}
                                {postData.user !== "Deleted" ? (
                                    <Link
                                        to={`/users/details/${postData.user}/`}
                                        className="post-author-link"
                                    >
                                        {postData.user}
                                    </Link>
                                ) : (
                                    <span className="deleted-author">
                                        Deleted
                                    </span>
                                )}
                            </p>
                            <p className="post-time">{postDateString}</p>
                            {postHasBeenEdited && (
                                <p className="post-edited-time">
                                    {editDateString}
                                </p>
                            )}
                        </div>
                    </div>

                    {postHasBeenEdited && (
                        <>
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
                        type={"post"}
                        postId={postData._id}
                        postUrlTitle={postData.urlTitle}
                    />
                </div>
            )}
            <div className="comments-container">
                {commentElements.length > 0 ? (
                    commentElements
                ) : (
                    <div className="no-comments-text-container">
                        <p className="no-comments-text">No comments yet</p>
                        <p className="no-comments-text">
                            Click reply to create one
                        </p>
                    </div>
                )}
            </div>
            {showRemainingComments
                ? remainingCommentElements
                : remainingCommentElements.length > 0 && (
                      <div className="show-more-area">
                          <button
                              type="button"
                              className="button show-more"
                              onClick={() => {
                                  setShowRemainingComments(true);
                              }}
                          >
                              Show More
                          </button>
                      </div>
                  )}
        </div>
    );
}
