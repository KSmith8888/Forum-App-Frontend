import { useRef, useEffect } from "react";
import { Form, useLoaderData, Link, useSearchParams } from "react-router-dom";

import { postInterface } from "../utils/interfaces.ts";

import textIconImg from "/icon-images/text-post-icon.png";
import linkIconImg from "/icon-images/link-post-icon.png";

export default function Search() {
    const loader = useLoaderData();
    const searchResults = loader instanceof Array ? loader : [];
    const searchForm = useRef<HTMLFormElement>(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    useEffect(() => {
        if (searchForm.current) {
            searchForm.current.reset();
        }
    }, [searchResults]);
    const postEls = searchResults.map((post: postInterface) => {
        const startingChars = post.content.substring(0, 50);
        return (
            <div key={post._id} className="results-posts-link-container">
                <div className="results-main-content-container">
                    <div className="post-inner-content-container">
                        <Link
                            to={`/posts/details/${post._id}`}
                            className="results-post-link"
                        >
                            <h3 className="results-post-title">{post.title}</h3>
                        </Link>
                        <p className="results-post-text">
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
                            alt="A white sheet of paper with black text representing a text post"
                            className="results-text-post-image"
                        />
                    )}
                    {post.postType === "Link" && (
                        <a href={post.content} target="_blank" rel="noreferrer">
                            <img
                                src={linkIconImg}
                                alt={`A grey and blue chain link representing a hyperlink to ${post.content}`}
                                className="results-link-post-image"
                            />
                        </a>
                    )}
                </div>
            </div>
        );
    });

    return (
        <div className="search-container">
            <Form
                className="search-form"
                method="post"
                ref={searchForm}
                autoComplete="false"
            >
                <h2>Search posts by keyword</h2>
                <label htmlFor="search-input">Search Term:</label>
                <input
                    id="search-input"
                    type="search"
                    name="search"
                    className="input"
                    maxLength={30}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </Form>
            <div className="results-container">
                {searchResults.length > 0 ? (
                    postEls
                ) : (
                    <h3>{query ? `No results found for ${query}` : ""}</h3>
                )}
            </div>
        </div>
    );
}
