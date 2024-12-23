import PollForm from "./PollForm";
import openLinkIcon from "../assets/images/open-link-icon.png";

import { postMainContentprops } from "../utils/interfaces";

export default function PostMainContent({
    _id,
    title,
    content,
    postType,
    pollData,
}: postMainContentprops) {
    return (
        <div className="post-main-content-container">
            <div className="post-inner-content-container">
                <h2 className="post-title">{title}</h2>
                {postType === "Text" && (
                    <p className="text-post-text">{content}</p>
                )}
                {postType === "Link" && (
                    <p className="link-post-text">
                        <a
                            href={content}
                            target="_blank"
                            rel="noreferrer"
                            className="link-post-anchor"
                        >
                            {content}
                            <img
                                src={openLinkIcon}
                                alt={
                                    content.startsWith("https://4em.pages.dev")
                                        ? "Opens in a new tab"
                                        : "External link, opens in a new tab"
                                }
                                className="open-link-icon-image"
                            ></img>
                        </a>
                    </p>
                )}
                {postType === "Poll" && (
                    <PollForm options={pollData} postId={_id} />
                )}
            </div>
        </div>
    );
}
