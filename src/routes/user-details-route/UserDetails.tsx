import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

import DetailsPost from "../../components/DetailsPost.tsx";
import DetailsComment from "../../components/DetailsComment.tsx";
import { userProfilePost, userProfileComment } from "../../utils/interfaces.ts";
import "../../assets/styles/user-details.css";

export default function UserDetails() {
    const loaderData = useLoaderData();
    const [showRemainingPosts, setShowRemainingPosts] = useState(false);
    const [showRemainingComments, setShowRemainingComments] = useState(false);
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
    const firstTenPosts = postsData.length > 0 ? postsData.slice(0, 10) : [];
    const firstTenPostEls = firstTenPosts.map((post: userProfilePost) => {
        return (
            <DetailsPost
                key={post.postId}
                postId={post.postId}
                title={post.title}
                previewText={post.previewText}
                urlTitle={post.urlTitle}
            />
        );
    });
    const remainingPosts = postsData.length > 10 ? postsData.slice(10) : [];
    const remainingPostEls =
        remainingPosts.length > 0
            ? remainingPosts.map((post: userProfilePost) => {
                  return (
                      <DetailsPost
                          key={post.postId}
                          postId={post.postId}
                          title={post.title}
                          previewText={post.previewText}
                          urlTitle={post.urlTitle}
                      />
                  );
              })
            : [];
    const firstTenComments =
        commentsData.length > 0 ? commentsData.slice(0, 10) : [];
    const firstTenCommentEls = firstTenComments.map(
        (comment: userProfileComment) => {
            return (
                <DetailsComment
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
        commentsData.length > 10 ? commentsData.slice(10) : [];
    const remainingCommentEls = remainingComments.map(
        (comment: userProfileComment) => {
            return (
                <DetailsComment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    previewText={comment.previewText}
                    relatedPost={comment.relatedPost}
                    postUrlTitle={comment.postUrlTitle}
                />
            );
        }
    );

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
                    {firstTenPostEls.length > 0 ? (
                        <div className="details-posts-container">
                            {firstTenPostEls}
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
                        <p className="default-text">No posts for this user</p>
                    )}
                </section>
                <section className="user-comments-section">
                    <h3 className="user-details-section-heading">Comments:</h3>
                    {firstTenCommentEls.length > 0 ? (
                        <div className="details-comments-container">
                            {firstTenCommentEls}
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
                        <p className="default-text">
                            No comments for this user
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
}
