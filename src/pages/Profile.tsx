import { useRef, useState, useEffect } from "react";
import {
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
    savedPostInterface,
    userProfileComment,
} from "../utils/interfaces";
import ProfilePicSelector from "../components/ProfilePicSelector";
import ProfileComment from "../components/ProfileComment";
import ProfilePost from "../components/ProfilePost";
import ProfileSaved from "../components/ProfileSaved";
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
    let userEmail = "No email provided";
    let isEmailVerified = false;
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
        if (
            "email" in loaderData &&
            typeof loaderData.email === "string" &&
            loaderData.email !== "4em@example.com"
        ) {
            userEmail = loaderData.email;
        }
        if (
            "verifiedEmail" in loaderData &&
            loaderData.verifiedEmail === "true"
        ) {
            isEmailVerified = true;
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
            }
        }
    }, [actionMessage]);
    const [showRemainingPosts, setShowRemainingPosts] = useState(false);
    const [showRemainingComments, setShowRemainingComments] = useState(false);
    const [showRemainingSaved, setShowRemainingSaved] = useState(false);
    const [showRemainingNotes, setShowRemainingNotes] = useState(false);
    const allPosts = postsData.length > 0 ? postsData : [];
    const firstFivePosts = allPosts.length > 0 ? allPosts.slice(0, 5) : [];
    const firstFivePostEls = firstFivePosts.map((post: userProfilePost) => {
        return (
            <ProfilePost
                key={post.postId}
                postId={post.postId}
                title={post.title}
                previewText={post.previewText}
                urlTitle={post.urlTitle}
            />
        );
    });
    const remainingPosts = allPosts.length > 5 ? allPosts.slice(5) : [];
    const remainingPostEls =
        remainingPosts.length > 0
            ? remainingPosts.map((post: userProfilePost) => {
                  return (
                      <ProfilePost
                          key={post.postId}
                          postId={post.postId}
                          title={post.title}
                          previewText={post.previewText}
                          urlTitle={post.urlTitle}
                      />
                  );
              })
            : [];
    const allComments = commentsData.length > 0 ? commentsData : [];
    const firstFiveComments =
        allComments.length > 0 ? allComments.slice(0, 5) : [];
    const firstFiveCommentEls = firstFiveComments.map(
        (comment: userProfileComment) => {
            return (
                <ProfileComment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    previewText={comment.previewText}
                    relatedPost={comment.relatedPost}
                    postUrlTitle={comment.postUrlTitle}
                />
            );
        }
    );
    const remainingComments =
        allComments.length > 5 ? allComments.slice(5) : [];
    const remainingCommentEls =
        remainingComments.length > 0
            ? remainingComments.map((comment: userProfileComment) => {
                  return (
                      <ProfileComment
                          key={comment.commentId}
                          commentId={comment.commentId}
                          previewText={comment.previewText}
                          relatedPost={comment.relatedPost}
                          postUrlTitle={comment.postUrlTitle}
                      />
                  );
              })
            : [];
    const allSaved = savedPostsData.length > 0 ? savedPostsData : [];
    const firstTenSaved = allSaved.length > 0 ? allSaved.slice(0, 10) : [];
    const firstTenSavedEls = firstTenSaved.map(
        (savedPost: savedPostInterface) => {
            return (
                <ProfileSaved
                    key={savedPost.postId}
                    postId={savedPost.postId}
                    title={savedPost.title}
                    urlTitle={savedPost.urlTitle}
                />
            );
        }
    );
    const remainingSaved = allSaved.length > 10 ? allSaved.slice(10) : [];
    const remainingSavedEls =
        remainingSaved.length > 0
            ? remainingSaved.map((savedPost: savedPostInterface) => {
                  return (
                      <ProfileSaved
                          key={savedPost.postId}
                          postId={savedPost.postId}
                          title={savedPost.title}
                          urlTitle={savedPost.urlTitle}
                      />
                  );
              })
            : [];
    const allNotes = notificationsData.length > 0 ? notificationsData : [];
    const firstFiveNotes = allNotes.length > 0 ? allNotes.slice(0, 5) : [];
    const firstFiveNoteEls = firstFiveNotes.map(
        (notification: notificationInterface) => {
            return (
                <ProfileNotification
                    key={notification._id}
                    _id={notification._id}
                    message={notification.message}
                    relatedPostId={notification.relatedPostId}
                    type={notification.type}
                    postUrlTitle={notification.postUrlTitle}
                    commentId={notification.commentId}
                    createdAt={notification.createdAt}
                />
            );
        }
    );
    const remainingNotes = allNotes.length > 5 ? allNotes.slice(5) : [];
    const remainingNoteEls =
        remainingNotes.length > 0
            ? remainingNotes.map((notification: notificationInterface) => {
                  return (
                      <ProfileNotification
                          key={notification._id}
                          _id={notification._id}
                          message={notification.message}
                          relatedPostId={notification.relatedPostId}
                          type={notification.type}
                          postUrlTitle={notification.postUrlTitle}
                          commentId={notification.commentId}
                          createdAt={notification.createdAt}
                      />
                  );
              })
            : [];

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
                            <h4 className="profile-security-heading">
                                Account Security:
                            </h4>
                            <h5 className="update-email-heading">
                                Email{" "}
                                <span className="email-verified-text">
                                    {isEmailVerified
                                        ? "(Verified):"
                                        : "(Not verified):"}
                                </span>
                            </h5>
                            <p
                                className={
                                    isEmailVerified
                                        ? "user-email verified"
                                        : "user-email warning"
                                }
                            >
                                {userEmail}
                            </p>
                            <button className="button" type="button">
                                {userEmail === "No email provided"
                                    ? "Add"
                                    : "Update"}
                            </button>
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
                    {firstTenSavedEls.length > 0 ? (
                        <div className="saved-posts-container">
                            {firstTenSavedEls}
                            {showRemainingSaved
                                ? remainingSavedEls
                                : remainingSavedEls.length > 0 && (
                                      <button
                                          className="button"
                                          type="button"
                                          onClick={() => {
                                              setShowRemainingSaved(true);
                                          }}
                                      >
                                          Show more
                                      </button>
                                  )}
                        </div>
                    ) : (
                        <p>You have not saved any posts yet</p>
                    )}
                </section>
                <section className="profile-notifications-section">
                    <h3 className="notifications-heading">
                        Notifications ({notificationsData.length}):
                    </h3>
                    {firstFiveNoteEls.length > 0 ? (
                        <div className="notifications-container">
                            {firstFiveNoteEls}
                            {showRemainingNotes
                                ? remainingNoteEls
                                : remainingNoteEls.length > 0 && (
                                      <button
                                          className="button"
                                          type="button"
                                          onClick={() => {
                                              setShowRemainingNotes(true);
                                          }}
                                      >
                                          Show more
                                      </button>
                                  )}
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
