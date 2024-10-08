import { useRef, useEffect } from "react";
import {
    Form,
    useLoaderData,
    Link,
    useSearchParams,
    useActionData,
} from "react-router-dom";

import { searchResultPost } from "../utils/interfaces.ts";

import "../assets/styles/search.css";
import textIconImg from "../assets/images/text-post-icon.png";
import linkIconImg from "../assets/images/link-post-icon.png";

export default function Search() {
    const loader = useLoaderData();
    const actionData = useActionData();
    const searchResults = Array.isArray(loader) ? loader : [];
    const searchForm = useRef<HTMLFormElement>(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const errorMessage = typeof actionData === "string" ? actionData : "";
    useEffect(() => {
        if (searchForm.current) {
            searchForm.current.reset();
        }
    }, [searchResults]);
    const postEls = searchResults.map((post: searchResultPost) => {
        return (
            <div key={post._id} className="results-posts-link-container">
                <div className="results-inner-content-container">
                    <Link
                        to={`/posts/details/${post._id}`}
                        className="results-post-link"
                    >
                        <h3 className="results-post-title">{post.title}</h3>
                    </Link>
                    <p
                        className={
                            post.postType === "Link"
                                ? "results-post-link-type"
                                : "results-post-text-type"
                        }
                    >
                        {post.previewText}
                    </p>
                </div>
                <div className="results-inner-image-container">
                    {post.postType === "Text" && (
                        <img
                            src={textIconImg}
                            alt="A white sheet of paper with blue text representing a text post"
                            className="results-text-post-image"
                        />
                    )}
                    {post.postType === "Link" && (
                        <img
                            src={linkIconImg}
                            alt="A grey and blue chain link representing a hyperlink"
                            className="results-link-post-image"
                        />
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
                autoComplete="on"
            >
                <h2>Search posts by keyword</h2>
                <label htmlFor="search-input">
                    Search Term (Topic, user or related term):
                </label>
                <input
                    id="search-input"
                    type="search"
                    name="search"
                    className="input"
                    pattern="[a-zA-Z0-9_]+"
                    maxLength={30}
                    required
                />
                <button type="submit" className="button">
                    Search
                </button>
                <p className="error-message">{errorMessage}</p>
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
