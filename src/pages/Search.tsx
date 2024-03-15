import { useRef, useEffect } from "react";
import {
    Form,
    useLoaderData,
    Link,
    redirect,
    useSearchParams,
} from "react-router-dom";

import { postInterface, loaderActionInterface } from "../utils/interfaces.ts";

export async function resultsLoader({ request }: loaderActionInterface) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    if (!query) {
        return [];
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/search/${query}`
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const resultsData: Array<postInterface> = await res.json();
    return resultsData;
}

export async function searchAction({ request }: loaderActionInterface) {
    const formData = await request.formData();
    const searchTerm = formData.get("search");
    return redirect(`/search?query=${searchTerm}`);
}

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
                    {post.postType === "Link" && (
                        <a href={post.content} target="_blank" rel="noreferrer">
                            <img
                                src="/icon-images/link-post-icon.png"
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
            <h2>Search posts by keyword</h2>
            <Form
                className="search-form"
                method="post"
                ref={searchForm}
                autoComplete="false"
            >
                <label htmlFor="search-input">Search Term:</label>
                <input
                    id="search-input"
                    type="search"
                    name="search"
                    className="input"
                    pattern="[a-zA-Z]+"
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
