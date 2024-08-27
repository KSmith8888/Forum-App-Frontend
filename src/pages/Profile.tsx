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
    let postsData = [];
    let commentsData = [];
    let savedPostsData = [];
    let notificationsData = [];
    let profileBio = "";
    let pswdLastUpdated = "";
    let replySettingText = "";
    if (loaderData && typeof loaderData === "object") {
        if ("posts" in loaderData && Array.isArray(loaderData.posts)) {
            postsData = loaderData.posts;
        }
        if ("comments" in loaderData && Array.isArray(loaderData.comments)) {
            commentsData = loaderData.comments;
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
    const [isPicModalOpen, setIsPicModalOpen] = useState(false);
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
                setIsPicModalOpen(false);
                setProfilePic({
                    name: actionMessage.newProfilePicName,
                    alt: actionMessage.newProfilePicAlt,
                });
            } else if ("bioUpdatedAt" in actionMessage) {
                setIsBioModalOpen(false);
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
    const firstFivePosts =
        postsData.length > 0
            ? postsData
                  .reverse()
                  .slice(0, 5)
                  .map((post: userProfilePost) => {
                      return (
                          <ProfilePost
                              key={post.id}
                              id={post.id}
                              title={post.title}
                          />
                      );
                  })
            : [];
    const remainingPosts =
        postsData.length > 5
            ? postsData
                  .reverse()
                  .slice(5)
                  .map((post: userProfilePost) => {
                      return (
                          <ProfilePost
                              key={post.id}
                              id={post.id}
                              title={post.title}
                          />
                      );
                  })
            : [];
    const firstFiveComments =
        commentsData.length > 0
            ? commentsData
                  .reverse()
                  .slice(0, 5)
                  .map((comment: userProfileComment) => {
                      return (
                          <ProfileComment
                              key={comment._id}
                              _id={comment._id}
                              content={comment.content}
                              relatedPost={comment.relatedPost}
                          />
                      );
                  })
            : [];
    const remainingComments =
        commentsData.length > 5
            ? commentsData
                  .reverse()
                  .slice(5)
                  .map((comment: userProfileComment) => {
                      return (
                          <ProfileComment
                              key={comment._id}
                              _id={comment._id}
                              content={comment.content}
                              relatedPost={comment.relatedPost}
                          />
                      );
                  })
            : [];
    const savedPostsElements = savedPostsData.map((savedPost) => {
        return (
            <div key={savedPost.id} className="saved-post-link-container">
                <Link
                    to={`/posts/details/${savedPost.id}`}
                    className="profile-notification-link"
                >
                    {savedPost.title}
                </Link>
            </div>
        );
    });
    const notificationElements = notificationsData.map(
        (notification: notificationInterface) => {
            return (
                <ProfileNotification
                    key={notification._id}
                    _id={notification._id}
                    message={notification.message}
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
                            <button
                                onClick={() => {
                                    setIsPicModalOpen(true);
                                }}
                                className="button"
                            >
                                Update
                            </button>
                            <ProfilePicSelector
                                isPicModalOpen={isPicModalOpen}
                                setIsPicModalOpen={setIsPicModalOpen}
                            />
                        </div>
                        <div className="profile-bio-container">
                            <h4 className="profile-bio-heading">
                                Profile Bio:
                            </h4>
                            <p className="profile-bio-text">{profileBio}</p>
                            <button
                                className="button"
                                onClick={() => {
                                    setIsBioModalOpen(true);
                                }}
                            >
                                Update
                            </button>
                            <BioChangeForm
                                isBioModalOpen={isBioModalOpen}
                                setIsBioModalOpen={setIsBioModalOpen}
                            />
                        </div>
                        <div className="update-password-container">
                            <h4 className="profile-security-heading">
                                Account Security:
                            </h4>
                            <h5 className="profile-password-heading">
                                Password:
                            </h5>
                            <p className="update-password-text">
                                {pswdLastUpdated}
                            </p>
                            <button
                                className="button"
                                onClick={() => {
                                    setIsPassModalOpen(true);
                                }}
                            >
                                Update
                            </button>
                            <UpdatePassword
                                isPassModalOpen={isPassModalOpen}
                                setIsPassModalOpen={setIsPassModalOpen}
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
                            <h3 className="delete-account-heading">
                                Delete Account:
                            </h3>
                            <p className="warning-message">
                                This action will delete your account, along with
                                all of your posts and comments
                            </p>
                            <button
                                className="delete-account-button"
                                onClick={() => {
                                    setIsDeleteModalOpen(true);
                                }}
                            >
                                Delete
                            </button>
                            <DeleteAccountModal
                                isDeleteModalOpen={isDeleteModalOpen}
                                setIsDeleteModalOpen={setIsDeleteModalOpen}
                            />
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

                    {firstFivePosts.length > 0 ? (
                        <div className="user-posts-container">
                            {firstFivePosts}
                            {showRemainingPosts
                                ? remainingPosts
                                : remainingPosts.length > 0 && (
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
                    {firstFiveComments.length > 0 ? (
                        <div className="user-comments-container">
                            {firstFiveComments}
                            {showRemainingComments
                                ? remainingComments
                                : remainingComments.length > 0 && (
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
