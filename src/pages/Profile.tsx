import { useRef, useState, useEffect } from "react";
import {
    Link,
    useLoaderData,
    useActionData,
    useOutletContext,
    Form,
} from "react-router-dom";

import BioChangeForm from "../components/BioChangeForm";
import UpdatePassword from "../components/UpdatePassword";
import DeleteAccountModal from "../components/DeleteAccountModal";
import {
    outletInterface,
    notificationInterface,
    userProfilePost,
    userProfileComment,
} from "../utils/interfaces";
import ProfilePicSelector from "../components/ProfilePicSelector";
import ProfileComment from "../components/ProfileComment";
import ProfilePost from "../components/ProfilePost";
import ProfileNotification from "../components/ProfileNotification";

import "../assets/styles/profile.css";

export default function Profile() {
    const username = sessionStorage.getItem("username");

    const loaderData = useLoaderData();
    let postsData: Array<userProfilePost> = [];
    let commentsData: Array<userProfileComment> = [];
    let savedPostsData = [];
    let notificationsData = [];
    let profileBio = "";
    let pswdLastUpdated = "";
    let replySettingText = "";
    if (loaderData && typeof loaderData === "object") {
        if ("posts" in loaderData && Array.isArray(loaderData.posts)) {
            postsData = [...loaderData.posts];
        }
        if ("comments" in loaderData && Array.isArray(loaderData.comments)) {
            commentsData = [...loaderData.comments];
        }
        if (
            "savedPosts" in loaderData &&
            Array.isArray(loaderData.savedPosts)
        ) {
            savedPostsData = loaderData.savedPosts;
        }
        if (
            "notifications" in loaderData &&
            Array.isArray(loaderData.notifications)
        ) {
            notificationsData = loaderData.notifications;
        }
        if ("bio" in loaderData && typeof loaderData.bio === "string") {
            profileBio = loaderData.bio;
        }
        if (
            "pswdLastUpdated" in loaderData &&
            typeof loaderData.pswdLastUpdated === "string"
        ) {
            pswdLastUpdated = loaderData.pswdLastUpdated;
        }
        if (
            "replySetting" in loaderData &&
            typeof loaderData.replySetting === "boolean"
        ) {
            replySettingText = loaderData.replySetting ? "Turn Off" : "Turn On";
        }
    }
    const messageModal = useRef<HTMLDialogElement>(null);
    const actionMessage = useActionData();
    const [modalMessage, setModalMessage] = useState("");
    const { profilePic, setProfilePic } = useOutletContext<outletInterface>();
    useEffect(() => {
        if (typeof actionMessage === "string" && messageModal.current) {
            const splitMessage = actionMessage.split("-Target ID-");
            setModalMessage(splitMessage[0]);
            messageModal.current.showModal();
        } else if (actionMessage && typeof actionMessage === "object") {
            if (
                "newProfilePicName" in actionMessage &&
                "newProfilePicAlt" in actionMessage &&
                typeof actionMessage.newProfilePicName === "string" &&
                typeof actionMessage.newProfilePicAlt === "string"
            ) {
                setProfilePic({
                    name: actionMessage.newProfilePicName,
                    alt: actionMessage.newProfilePicAlt,
                });
            } else if (
                "message" in actionMessage &&
                typeof actionMessage.message === "string" &&
                messageModal.current
            ) {
                setModalMessage(actionMessage.message);
                messageModal.current.showModal();
            }
        }
    }, [actionMessage]);
    const [showRemainingPosts, setShowRemainingPosts] = useState(false);
    const [showRemainingComments, setShowRemainingComments] = useState(false);
    const reversedPosts = postsData.length > 0 ? postsData.reverse() : [];
    const firstFivePosts =
        reversedPosts.length > 0 ? reversedPosts.slice(0, 5) : [];
    const firstFivePostEls =
        firstFivePosts.length > 0
            ? firstFivePosts.map((post: userProfilePost) => {
                  return (
                      <ProfilePost
                          key={post.postId}
                          postId={post.postId}
                          title={post.title}
                      />
                  );
              })
            : [];
    const remainingPosts =
        reversedPosts.length > 5 ? reversedPosts.slice(5) : [];
    const remainingPostEls =
        remainingPosts.length > 0
            ? remainingPosts.map((post: userProfilePost) => {
                  return (
                      <ProfilePost
                          key={post.postId}
                          postId={post.postId}
                          title={post.title}
                      />
                  );
              })
            : [];
    const reversedComments =
        commentsData.length > 0 ? commentsData.reverse() : [];
    const firstFiveComments =
        reversedComments.length > 0 ? reversedComments.slice(0, 5) : [];
    const firstFiveCommentEls =
        firstFiveComments.length > 0
            ? firstFiveComments.map((comment: userProfileComment) => {
                  return (
                      <ProfileComment
                          key={comment.commentId}
                          commentId={comment.commentId}
                          content={comment.content}
                          relatedPost={comment.relatedPost}
                      />
                  );
              })
            : [];
    const remainingComments =
        reversedComments.length > 5 ? reversedComments.slice(5) : [];
    const remainingCommentEls =
        remainingComments.length > 0
            ? remainingComments.map((comment: userProfileComment) => {
                  return (
                      <ProfileComment
                          key={comment.commentId}
                          commentId={comment.commentId}
                          content={comment.content}
                          relatedPost={comment.relatedPost}
                      />
                  );
              })
            : [];
    const savedPostsElements = savedPostsData.map(
        (savedPost: userProfilePost) => {
            return (
                <div
                    key={savedPost.postId}
                    className="saved-post-link-container"
                >
                    <Link
                        to={`/posts/details/${savedPost.postId}`}
                        className="profile-notification-link"
                    >
                        {savedPost.title}
                    </Link>
                </div>
            );
        }
    );
    const notificationElements = notificationsData.map(
        (notification: notificationInterface) => {
            return (
                <ProfileNotification
                    key={notification._id}
                    _id={notification._id}
                    message={notification.message}
                    replyMessageId={notification.replyMessageId}
                    type={notification.type}
                    commentId={notification.commentId}
                />
            );
        }
    );

    return (
        <>
            <h2 className="username-heading">
                {username || "Something went wrong"}
            </h2>
            <div className="profile-section-row">
                <section className="profile-settings-section">
                    <h3 className="account-settings-heading">
                        Account Settings:
                    </h3>
                    <div className="account-settings-container">
                        <div className="profile-image-info">
                            <h4 className="profile-image-heading">
                                Profile Image:
                            </h4>
                            <img
                                src={`/profile-images/${profilePic.name}`}
                                alt={profilePic.alt}
                                className="profile-image"
                            />
                            <ProfilePicSelector />
                        </div>
                        <div className="profile-bio-container">
                            <BioChangeForm profileBio={profileBio} />
                        </div>
                        <div className="update-password-container">
                            <UpdatePassword
                                pswdLastUpdated={pswdLastUpdated}
                                actionMessage={actionMessage}
                            />
                        </div>
                        <div className="notification-setting-container">
                            <h4 className="notification-setting-heading">
                                Notifications:
                            </h4>
                            <p className="reply-setting-text">
                                Get notifications when a user replies to your
                                post or comment
                            </p>
                            <Form
                                method="POST"
                                className="notification-setting-form"
                            >
                                <input
                                    type="hidden"
                                    name="notification-setting"
                                    value="update"
                                />
                                <button type="submit" className="button">
                                    {replySettingText}
                                </button>
                            </Form>
                        </div>
                        <div className="delete-account-container">
                            <DeleteAccountModal />
                        </div>
                    </div>
                </section>
                <section className="profile-saved-posts-section">
                    <h3 className="saved-posts-heading">Saved Posts:</h3>
                    {savedPostsElements.length > 0 ? (
                        <div className="saved-posts-container">
                            {savedPostsElements}
                        </div>
                    ) : (
                        <p>You have not saved any posts yet</p>
                    )}
                </section>
                <section className="profile-notifications-section">
                    <h3 className="notifications-heading">
                        Notifications ({notificationsData.length}):
                    </h3>
                    {notificationElements.length > 0 ? (
                        <div className="notifications-container">
                            {notificationElements}
                        </div>
                    ) : (
                        <p>No notifications at this time</p>
                    )}
                </section>
            </div>
            <div className="profile-section-row">
                <section className="profile-posts-section">
                    <h3 className="your-posts-heading">Your Posts:</h3>

                    {firstFivePostEls.length > 0 ? (
                        <div className="user-posts-container">
                            {firstFivePostEls}
                            {showRemainingPosts
                                ? remainingPostEls
                                : remainingPostEls.length > 0 && (
                                      <button
                                          className="button"
                                          type="button"
                                          onClick={() => {
                                              setShowRemainingPosts(true);
                                          }}
                                      >
                                          Show more
                                      </button>
                                  )}
                        </div>
                    ) : (
                        <h4>You have not created any posts yet</h4>
                    )}
                </section>
                <section className="profile-comments-section">
                    <h3 className="your-comments-heading">Your Comments:</h3>
                    {firstFiveCommentEls.length > 0 ? (
                        <div className="user-comments-container">
                            {firstFiveCommentEls}
                            {showRemainingComments
                                ? remainingCommentEls
                                : remainingCommentEls.length > 0 && (
                                      <button
                                          className="button"
                                          type="button"
                                          onClick={() => {
                                              setShowRemainingComments(true);
                                          }}
                                      >
                                          Show more
                                      </button>
                                  )}
                        </div>
                    ) : (
                        <h4>You have not created any comments yet</h4>
                    )}
                </section>
                <dialog
                    className="message-modal"
                    ref={messageModal}
                    onClick={(e) => {
                        if (
                            e.target === e.currentTarget &&
                            messageModal.current
                        ) {
                            messageModal.current.close();
                        }
                    }}
                >
                    <div id="message-modal-content">
                        <button
                            className="close-modal-button"
                            aria-label="Close"
                            onClick={() => {
                                if (messageModal.current) {
                                    messageModal.current.close();
                                }
                            }}
                        >
                            X
                        </button>
                        <p className="message-modal-text">
                            {modalMessage ||
                                "There has been an error, please try again later"}
                        </p>
                    </div>
                </dialog>
            </div>
        </>
    );
}
