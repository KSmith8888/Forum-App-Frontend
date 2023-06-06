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
    commentInterface,
    loaderActionInterface,
    profilePicInterface,
    outletInterface,
} from "../utils/interfaces";
import { deleteAccount } from "../utils/delete-account";
import ProfilePicSelector from "../components/ProfilePicSelector";

export async function profileLoader() {
    try {
        const userId = sessionStorage.getItem("_id");
        if (!userId) {
            return redirect("/?message=Please log in");
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/user/${userId}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return [];
    }
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
            throw new Error("You must log in before deleting a post");
        }
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/${type}/details/${id}`,
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

interface userPost {
    id: string;
    title: string;
}

interface postAndComment {
    posts: userPost[];
    comments: commentInterface[];
}

export default function Profile() {
    const username = sessionStorage.getItem("username");
    const postAndCommentData = useLoaderData() as postAndComment;
    const messageModal = useRef<HTMLDialogElement>(null);
    const actionMessage = useActionData() as string;
    const [modalMessage, setModalMessage] = useState("");
    useEffect(() => {
        if (actionMessage && messageModal.current) {
            setModalMessage(actionMessage);
            messageModal.current.showModal();
        }
    }, [actionMessage]);
    let initialProfilePic = {
        name: "blank.png",
        alt: "A generic, blank outline of a mans upper body",
    };
    const savedProfileImage = localStorage.getItem("profileImageName");
    const savedProfileAltText = localStorage.getItem("profileImageAlt");
    if (savedProfileImage && savedProfileAltText) {
        initialProfilePic = {
            name: savedProfileImage,
            alt: savedProfileAltText,
        };
    }
    const [profilePic, setProfilePic] =
        useState<profilePicInterface>(initialProfilePic);

    const [isPicModalOpen, setIsPicModalOpen] = useState(false);
    const postElements = postAndCommentData.posts.map((post: userPost) => {
        return (
            <div key={post.id} className="post-link-container">
                <Link to={`/posts/details/${post.id}`} className="post-link">
                    <h4 className="post-link-title">{post.title}</h4>
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
    const commentElements = postAndCommentData.comments.map((comment) => {
        return (
            <div key={comment._id} className="comment-link-container">
                <p className="comment-link-content">{comment.content}</p>
                <div className="button-container">
                    <Link
                        to={`/posts/details/${comment.relatedPost}`}
                        className="button-link"
                    >
                        Post
                    </Link>
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
    const { setHasPicBeenUpdated, setIsUserLoggedIn } =
        useOutletContext<outletInterface>();
    const navigate = useNavigate();

    function logoutUser(msg: string) {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("_id");
        sessionStorage.removeItem("token");
        setIsUserLoggedIn(false);
        navigate(`/?message=${msg}`);
    }

    return (
        <>
            <h2>{`Profile Page: ${username}`}</h2>
            <div className="profile-image-info">
                <h3>Profile Image:</h3>
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
                <div className="delete-account-container">
                    <button
                        type="button"
                        className="delete-account-button"
                        onClick={async () => {
                            const id = sessionStorage.getItem("_id");
                            if (id) {
                                const deleteData = await deleteAccount(id);
                                if (
                                    deleteData instanceof Error &&
                                    messageModal.current
                                ) {
                                    setModalMessage(deleteData.message);
                                    messageModal.current.showModal();
                                } else {
                                    localStorage.clear();
                                    logoutUser("Your account has been deleted");
                                }
                            } else {
                                logoutUser(
                                    "Something went wrong please log in and try again"
                                );
                            }
                        }}
                    >
                        Delete Account
                    </button>
                    <p className="warning-message">
                        This action will delete your account, along with all of
                        your posts and comments
                    </p>
                </div>
            </div>
            <ProfilePicSelector
                isPicModalOpen={isPicModalOpen}
                setIsPicModalOpen={setIsPicModalOpen}
                setProfilePic={setProfilePic}
                profilePic={profilePic}
                setHasPicBeenUpdated={setHasPicBeenUpdated}
            />
            {postAndCommentData.posts.length > 0 ? (
                <>
                    <h3>Your Posts:</h3>
                    <Link to="create">Create a new post</Link>
                    <div className="user-posts-container">{postElements}</div>
                </>
            ) : (
                <>
                    <h4>You have not created any posts yet</h4>
                    <Link to="create">Create a new post</Link>
                </>
            )}
            {postAndCommentData.comments.length > 0 ? (
                <>
                    <h3>Your Comments:</h3>
                    <div className="user-comments-container">
                        {commentElements}
                    </div>
                </>
            ) : (
                <h4>You have not created any comments yet</h4>
            )}
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
        </>
    );
}
