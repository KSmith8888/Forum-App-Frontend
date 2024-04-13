import { useRef, useState, useEffect } from "react";
import {
    Link,
    useLoaderData,
    redirect,
    Form,
    useActionData,
    useOutletContext,
    useNavigate,
} from "react-router-dom";

import {
    loaderActionInterface,
    outletInterface,
    notificationInterface,
} from "../utils/interfaces";
import { deleteAccount } from "../utils/delete-account";
import { deleteNotification } from "../utils/delete-notification";
import ProfilePicSelector from "../components/ProfilePicSelector";

import "../assets/styles/profile.css";

interface userProfilePost {
    id: string;
    title: string;
}

export async function profileLoader() {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!userId || !token) {
        return redirect("/?message=Please log in");
    }
    const res = await fetch(
        `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/profile/details/${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user_id": userId,
            },
        }
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    return data;
}

export async function profileAction({ request }: loaderActionInterface) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        const formData = await request.formData();
        let type = "";
        const id = formData.get("id");
        const post = formData.get("post");
        const comment = formData.get("comment");
        if (
            (post && typeof post !== "string") ||
            (comment && typeof comment !== "string")
        ) {
            throw new Error("Post or comment data not provided");
        }
        if (post) {
            type = post;
        } else if (comment) {
            type = comment;
        }
        if (!token || !userId) {
            throw new Error("You must log in before performing that action");
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/${type}/details/${id}`,
            {
                method: "DELETE",
                body: JSON.stringify({ status: "Delete request" }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        if (!res.ok) {
            const errorData = await res.json();
            if (errorData && errorData.msg) {
                throw new Error(errorData.msg);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
        }
        const data = await res.json();
        return data.message;
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}

export default function Profile() {
    const username = sessionStorage.getItem("username");

    const loaderData = useLoaderData();
    let postsData = [];
    let commentsData = [];
    let notificationsData = [];
    if (loaderData && typeof loaderData === "object") {
        if ("posts" in loaderData && Array.isArray(loaderData.posts)) {
            postsData = loaderData.posts;
        }
        if ("comments" in loaderData && Array.isArray(loaderData.comments)) {
            commentsData = loaderData.comments;
        }
        if (
            "notifications" in loaderData &&
            Array.isArray(loaderData.notifications)
        ) {
            notificationsData = loaderData.notifications;
        }
    }
    const messageModal = useRef<HTMLDialogElement>(null);
    const actionMessage = useActionData();
    const [modalMessage, setModalMessage] = useState("");
    useEffect(() => {
        if (typeof actionMessage === "string" && messageModal.current) {
            console.log(actionMessage);
            setModalMessage(actionMessage);
            messageModal.current.showModal();
        }
    }, [actionMessage]);

    const [isPicModalOpen, setIsPicModalOpen] = useState(false);
    const postElements = postsData.map((post: userProfilePost) => {
        return (
            <div key={post.id} className="post-link-container">
                <Link
                    to={`/posts/details/${post.id}`}
                    className="profile-post-link"
                >
                    {post.title}
                </Link>
                <div className="button-container">
                    <Link to={`/posts/edit/${post.id}`} className="button-link">
                        Edit
                    </Link>
                    <Form method="POST">
                        <input type="hidden" name="post" value="posts" />
                        <input type="hidden" name="id" value={post.id} />
                        <button className="button">Delete</button>
                    </Form>
                </div>
            </div>
        );
    });
    const commentElements = commentsData.map((comment) => {
        const startingChars = comment.content.substring(0, 50);
        return (
            <div key={comment._id} className="comment-link-container">
                <Link
                    to={`/posts/details/${comment.relatedPost}`}
                    className="related-post-link"
                >
                    {`${startingChars}...`}
                </Link>
                <div className="button-container">
                    <Link
                        to={`/posts/comments/edit/${comment._id}`}
                        className="button-link"
                    >
                        Edit
                    </Link>
                    <Form method="POST">
                        <input type="hidden" name="comment" value="comments" />
                        <input type="hidden" name="id" value={comment._id} />
                        <button type="submit" className="button">
                            Delete
                        </button>
                    </Form>
                </div>
            </div>
        );
    });
    const notificationElements = notificationsData.map(
        (notification: notificationInterface) => {
            return (
                <div
                    key={notification._id}
                    className="profile-notification-container"
                >
                    <p className="notification-message">
                        {notification.message}
                    </p>
                    <div className="notification-options">
                        {notification.isReply && (
                            <Link
                                to={`/posts/details/${notification.replyMessageId}`}
                                className="profile-notification-link"
                            >
                                See Thread
                            </Link>
                        )}
                        <button
                            type="button"
                            className="button"
                            onClick={async () => {
                                try {
                                    const message = await deleteNotification(
                                        notification._id
                                    );
                                    if (
                                        typeof message === "string" &&
                                        messageModal.current
                                    ) {
                                        setModalMessage(message);
                                        messageModal.current.showModal();
                                    }
                                } catch (error) {
                                    if (error instanceof Error) {
                                        console.log(error.message);
                                    }
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            );
        }
    );

    const { setIsUserLoggedIn, profilePic, setProfilePic } =
        useOutletContext<outletInterface>();
    const navigate = useNavigate();

    function logoutUser(msg: string) {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("_id");
        sessionStorage.removeItem("token");
        setIsUserLoggedIn(false);
        setProfilePic({
            name: "blank.png",
            alt: "A generic, blank outline of a mans upper body",
        });
        navigate(`/?message=${msg}`);
    }

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
                                Change
                            </button>
                            <ProfilePicSelector
                                isPicModalOpen={isPicModalOpen}
                                setIsPicModalOpen={setIsPicModalOpen}
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
                                type="button"
                                className="delete-account-button"
                                onClick={async () => {
                                    const id = sessionStorage.getItem("_id");
                                    if (id) {
                                        const deleteData = await deleteAccount(
                                            id
                                        );
                                        if (
                                            deleteData instanceof Error &&
                                            messageModal.current
                                        ) {
                                            setModalMessage(deleteData.message);
                                            messageModal.current.showModal();
                                        } else {
                                            localStorage.clear();
                                            logoutUser(
                                                "Your account has been deleted"
                                            );
                                        }
                                    } else {
                                        logoutUser(
                                            "Something went wrong please log in and try again"
                                        );
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
                <section className="profile-saved-posts-section">
                    <h3 className="saved-posts-heading">Saved Posts:</h3>
                </section>
                <section className="profile-notifications-section">
                    <h3 className="notifications-heading">Notifications:</h3>
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
                <dialog className="message-modal" ref={messageModal}>
                    <p className="message-modal-text">
                        {modalMessage ||
                            "There has been an error, please try again later"}
                    </p>
                    <button
                        className="button"
                        onClick={() => {
                            if (messageModal.current) {
                                messageModal.current.close();
                            }
                        }}
                    >
                        Close
                    </button>
                </dialog>
            </div>
        </>
    );
}
