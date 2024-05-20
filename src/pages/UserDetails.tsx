import { useLoaderData, Link, useParams } from "react-router-dom";

import "../assets/styles/user-details.css";

export default function UserDetails() {
    const { username } = useParams();
    const loaderData = useLoaderData();
    let postsData = [];
    let commentsData = [];
    if (loaderData && typeof loaderData === "object") {
        if ("posts" in loaderData && Array.isArray(loaderData.posts)) {
            postsData = loaderData.posts;
        }
        if ("comments" in loaderData && Array.isArray(loaderData.comments)) {
            commentsData = loaderData.comments;
        }
    }
    const postElements = postsData.map((post) => {
        return (
            <div key={post.id} className="post-link-container">
                <Link
                    to={`/posts/details/${post.id}`}
                    className="profile-post-link"
                >
                    {post.title}
                </Link>
            </div>
        );
    });
    const commentElements = commentsData.map((comment) => {
        return (
            <div key={comment._id} className="comment-link-container">
                <p>{comment.content}</p>
            </div>
        );
    });

    return (
        <div className="user-details-container">
            <h2 className="user-details-username">{username}</h2>
            <div className="user-posts-comments-container">
                <section className="user-posts-section">
                    <h3>Posts:</h3>
                    {postElements.length > 0 ? (
                        postElements
                    ) : (
                        <p>No posts for this user</p>
                    )}
                </section>
                <section className="user-comments-section">
                    <h3>Comments:</h3>
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
