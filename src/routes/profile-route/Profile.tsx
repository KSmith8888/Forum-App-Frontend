import { useRef, useState, useEffect } from "react";
import { useLoaderData, useActionData, useOutletContext } from "react-router";

import BioChangeForm from "../../components/profile-components/BioChangeForm";
import UpdatePassword from "../../components/profile-components/UpdatePassword";
import UpdateEmail from "../../components/profile-components/UpdateEmail";
import DeleteAccountModal from "../../components/profile-components/DeleteAccountModal";
import ContentSettings from "../../components/profile-components/ContentSettings";
import {
    outletInterface,
    notificationInterface,
    userProfilePost,
    savedPostInterface,
    userProfileComment,
    profileLoaderData,
} from "../../utils/interfaces";
import ProfilePicSelector from "../../components/profile-components/ProfilePicSelector";
import ProfileComment from "../../components/profile-components/ProfileComment";
import ProfilePost from "../../components/profile-components/ProfilePost";
import ProfileSaved from "../../components/profile-components/ProfileSaved";
import ProfileNotification from "../../components/profile-components/ProfileNotification";

import "../../assets/styles/profile.css";

import profileLoader from "./profile-loader.tsx";
import profileAction from "./profile-action.tsx";

function Profile() {
    const username = sessionStorage.getItem("username");

    const loaderData = useLoaderData() as profileLoaderData;

    const messageModal = useRef<HTMLDialogElement>(null);
    const actionMessage = useActionData();
    const [modalMessage, setModalMessage] = useState("");
    const [emailUpdateStep, setEmailUpdateStep] = useState(1);
    const { profilePic, setProfilePic } = useOutletContext<outletInterface>();
    useEffect(() => {
        if (actionMessage === "Email update initiated successfully") {
            setEmailUpdateStep(2);
        } else if (actionMessage === "Email updated successfully") {
            setEmailUpdateStep(1);
        } else if (typeof actionMessage === "string" && messageModal.current) {
            const splitMessage = actionMessage.split("-Target ID-");
            setModalMessage(splitMessage[0]);
            messageModal.current.showModal();
            if (actionMessage === "View NSFW setting is now turned Off") {
                sessionStorage.removeItem("view-nsfw");
            } else if (actionMessage === "View NSFW setting is now turned On") {
                sessionStorage.setItem("view-nsfw", "true");
            }
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
    const allPosts = loaderData.posts.length > 0 ? loaderData.posts : [];
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
    const allComments =
        loaderData.comments.length > 0 ? loaderData.comments : [];
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
    const allSaved =
        loaderData.savedPosts.length > 0 ? loaderData.savedPosts : [];
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
    const allNotes =
        loaderData.notifications.length > 0 ? loaderData.notifications : [];
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
                        Account Options:
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
                            <BioChangeForm profileBio={loaderData.bio} />
                        </div>
                        <div className="update-password-container">
                            <h4 className="profile-security-heading">
                                Account Information:
                            </h4>
                            <UpdateEmail
                                currentEmail={loaderData.email}
                                updateStep={emailUpdateStep}
                            />
                            <UpdatePassword
                                pswdLastUpdated={loaderData.pswdLastUpdated}
                                actionMessage={actionMessage}
                            />
                        </div>
                        <ContentSettings
                            getReplyNotifications={
                                loaderData.profileSettings.getReplyNotifications
                            }
                            viewNSFW={loaderData.profileSettings.viewNSFW}
                        />
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
                        Notifications ({loaderData.notifications.length}):
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

export { Profile as Component };
export { profileLoader as loader };
export { profileAction as action };
