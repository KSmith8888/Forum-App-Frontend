import { useRef, useState, useEffect } from "react";
import {
    Link,
    useLoaderData,
    useActionData,
    useOutletContext,
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
    }
    const messageModal = useRef<HTMLDialogElement>(null);
    const actionMessage = useActionData();
    const [modalMessage, setModalMessage] = useState("");
    useEffect(() => {
        if (typeof actionMessage === "string" && messageModal.current) {
            const splitMessage = actionMessage.split("-Target ID-");
            setModalMessage(splitMessage[0]);
            messageModal.current.showModal();
        }
    }, [actionMessage]);
    const [isPicModalOpen, setIsPicModalOpen] = useState(false);
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { profilePic } = useOutletContext<outletInterface>();
    const postElements = postsData.map((post: userProfilePost) => {
        return <ProfilePost key={post.id} id={post.id} title={post.title} />;
    });
    const commentElements = commentsData.map((comment: userProfileComment) => {
        return (
            <ProfileComment
                key={comment._id}
                _id={comment._id}
                content={comment.content}
                relatedPost={comment.relatedPost}
            />
        );
    });
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
                                actionMessage={actionMessage}
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

                    {postElements.length > 0 ? (
                        <div className="user-posts-container">
                            {postElements}
                        </div>
                    ) : (
                        <h4>You have not created any posts yet</h4>
                    )}
                </section>
                <section className="profile-comments-section">
                    <h3 className="your-comments-heading">Your Comments:</h3>
                    {commentElements.length > 0 ? (
                        <div className="user-comments-container">
                            {commentElements}
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
