import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

import userDetailsLoader from "./user-details-loader.tsx";
import DetailsPost from "../../components/DetailsPost.tsx";
import DetailsComment from "../../components/DetailsComment.tsx";
import {
    userProfilePost,
    userProfileComment,
    userDetailsLoaderData,
} from "../../utils/interfaces.ts";

import "../../assets/styles/user-details.css";

function UserDetails() {
    const loaderData = useLoaderData() as userDetailsLoaderData;
    const [showRemainingPosts, setShowRemainingPosts] = useState(false);
    const [showRemainingComments, setShowRemainingComments] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const firstTenPosts =
        loaderData.posts.length > 0 ? loaderData.posts.slice(0, 10) : [];
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
    const remainingPosts =
        loaderData.posts.length > 10 ? loaderData.posts.slice(10) : [];
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
        loaderData.comments.length > 0 ? loaderData.comments.slice(0, 10) : [];
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
        loaderData.comments.length > 10 ? loaderData.comments.slice(10) : [];
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
                    <h2 className="user-details-username">
                        {loaderData.username}
                    </h2>
                    <p className="user-details-bio">{loaderData.bio}</p>
                </div>
                <img
                    src={`/profile-images/${loaderData.image}`}
                    alt={loaderData.alt}
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

export { UserDetails as Component };
export { userDetailsLoader as loader };
