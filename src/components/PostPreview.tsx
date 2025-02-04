import { Link } from "react-router";

import { postPreviewInfo } from "../utils/interfaces.ts";

import textIconImg from "../assets/images/text-post-icon.png";
import linkIconImg from "../assets/images/link-post-icon.png";
import pollIconImg from "../assets/images/poll-post-icon.png";

export default function PostPreview({
    postId,
    title,
    previewText,
    postType,
    urlTitle,
}: postPreviewInfo) {
    return (
        <div key={postId} className="post-preview-container">
            <div className="post-preview-inner-container">
                <div className="post-preview-main-content">
                    <Link
                        to={`/posts/${postId}/${urlTitle}/`}
                        className="post-preview-link"
                    >
                        <h3 className="post-preview-title">{title}</h3>
                    </Link>
                    <p
                        className={
                            postType === "Link"
                                ? "link-preview-text"
                                : "text-preview-text"
                        }
                    >
                        {previewText}
                    </p>
                </div>
                <div className="post-preview-image-container">
                    {postType === "Text" && (
                        <img
                            src={textIconImg}
                            alt="A white sheet of paper with blue text representing a text post"
                            className="text-preview-image"
                        />
                    )}
                    {postType === "Link" && (
                        <img
                            src={linkIconImg}
                            alt="A grey and blue chain link representing a hyperlink"
                            className="link-preview-image"
                        />
                    )}
                    {postType === "Poll" && (
                        <img
                            src={pollIconImg}
                            alt="Horizontal blue bars representing a poll"
                            className="link-preview-image"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
