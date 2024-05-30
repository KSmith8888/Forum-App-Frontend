import { useEffect } from "react";
import {
    useLoaderData,
    useSearchParams,
    Link,
    useOutletContext,
} from "react-router-dom";

import { outletInterface, postInterface } from "../utils/interfaces.ts";

import "../assets/styles/home.css";
import textIconImg from "../assets/images/text-post-icon.png";
import linkIconImg from "../assets/images/link-post-icon.png";

export default function Home() {
    const [searchParams] = useSearchParams();
    const { setIsUserLoggedIn } = useOutletContext<outletInterface>();
    const message = searchParams.get("message");
    const status = searchParams.get("status");
    useEffect(() => {
        if (status === "loggedIn") {
            setIsUserLoggedIn(true);
        }
        if (message === "Account deleted successfully") {
            sessionStorage.clear();
            setIsUserLoggedIn(false);
        }
        window.scrollTo(0, 0);
    }, []);

    const loaderData = useLoaderData();

    function createPostElements(postEls: Array<postInterface>) {
        return postEls.map((post: postInterface) => {
            const startingChars = post.content.substring(0, 50);
            return (
                <div key={post._id} className="trending-posts-link-container">
                    <div className="trending-main-content-container">
                        <div className="home-post-content-container">
                            <Link
                                to={`/posts/details/${post._id}`}
                                className="trending-post-link"
                            >
                                <h3 className="trending-post-title">
                                    {post.title}
                                </h3>
                            </Link>
                            <p className="trending-post-text">
                                {post.postType === "Link" ? (
                                    <a
                                        href={post.content}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {post.content}
                                    </a>
                                ) : (
                                    `${startingChars}...`
                                )}
                            </p>
                        </div>
                        {post.postType === "Text" && (
                            <img
                                src={textIconImg}
                                alt="A white sheet of paper with blue text representing a text post"
                                className="home-text-post-image"
                            />
                        )}
                        {post.postType === "Link" && (
                            <a
                                href={post.content}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={linkIconImg}
                                    alt={`A grey and blue chain link representing a hyperlink to ${post.content}`}
                                    className="home-link-post-image"
                                />
                            </a>
                        )}
                    </div>
                </div>
            );
        });
    }

    let popularPosts: Array<postInterface> = [];
    let newPosts: Array<postInterface> = [];
    if (loaderData && typeof loaderData === "object") {
        if ("popular" in loaderData && Array.isArray(loaderData.popular)) {
            popularPosts = [...loaderData.popular];
        }
        if ("new" in loaderData && Array.isArray(loaderData.new)) {
            newPosts = [...loaderData.new];
        }
    }
    const popularPostEls = createPostElements(popularPosts);
    const newPostEls = createPostElements(newPosts);

    return (
        <>
            <p className="user-message">{message ? message : ""}</p>
            <div className="home-container">
                <section className="trending-posts-section">
                    <h2 className="popular-posts-heading">Popular Posts:</h2>
                    {popularPostEls.length > 0 ? (
                        <div className="trending-post-elements">
                            {popularPostEls}
                        </div>
                    ) : (
                        <p>No popular posts available at this time</p>
                    )}
                </section>
                <section className="new-posts-section">
                    <h2 className="new-posts-heading">New Posts:</h2>
                    {newPostEls.length > 0 ? (
                        <div className="new-post-elements">{newPostEls}</div>
                    ) : (
                        <p>No new posts available at this time</p>
                    )}
                </section>
            </div>
        </>
    );
}
