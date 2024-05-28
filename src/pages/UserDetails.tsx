import { useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";

import "../assets/styles/user-details.css";

export default function UserDetails() {
    const loaderData = useLoaderData();
    let username = "";
    let postsData = [];
    let commentsData = [];
    let bio = "";
    let profileImg = "";
    let profileAlt = "";
    if (loaderData && typeof loaderData === "object") {
        if (
            "username" in loaderData &&
            typeof loaderData.username === "string"
        ) {
            username = loaderData.username;
        }
        if ("bio" in loaderData && typeof loaderData.bio === "string") {
            bio = loaderData.bio;
        }
        if ("posts" in loaderData && Array.isArray(loaderData.posts)) {
            postsData = loaderData.posts;
        }
        if ("comments" in loaderData && Array.isArray(loaderData.comments)) {
            commentsData = loaderData.comments;
        }
        if ("image" in loaderData && typeof loaderData.image === "string") {
            profileImg = loaderData.image;
        }
        if ("alt" in loaderData && typeof loaderData.alt === "string") {
            profileAlt = loaderData.alt;
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const postElements = postsData.map((post) => {
        return (
            <div key={post.id} className="user-details-post-container">
                <Link
                    to={`/posts/details/${post.id}`}
                    className="user-details-post-link"
                >
                    {post.title}
                </Link>
            </div>
        );
    });
    const commentElements = commentsData.map((comment) => {
        return (
            <div key={comment._id} className="user-details-comment-container">
                <p>{comment.content}</p>
                <Link
                    to={`/posts/details/${comment.relatedPost}?commentId=${comment._id}`}
                    className="user-details-comment-link"
                >
                    Related Post
                </Link>
            </div>
        );
    });

    return (
        <div className="user-details-container">
            <div className="user-details-bio-container">
                <div className="details-bio-inner-container">
                    <h2 className="user-details-username">{username}</h2>
                    <p className="user-details-bio">{bio}</p>
                </div>
                <img
                    src={`/profile-images/${profileImg}`}
                    alt={profileAlt}
                    className="menu-profile-image"
                />
            </div>
            <div className="user-posts-comments-container">
                <section className="user-posts-section">
                    <h3 className="user-details-section-heading">Posts:</h3>
                    {postElements.length > 0 ? (
                        postElements
                    ) : (
                        <p>No posts for this user</p>
                    )}
                </section>
                <section className="user-comments-section">
                    <h3 className="user-details-section-heading">Comments:</h3>
                    {commentElements.length > 0 ? (
                        commentElements
                    ) : (
                        <p>No comments for this user</p>
                    )}
                </section>
            </div>
        </div>
    );
}
