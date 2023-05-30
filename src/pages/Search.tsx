import React, { useRef, useEffect } from "react";
import {
    Form,
    useLoaderData,
    Link,
    redirect,
    useSearchParams,
} from "react-router-dom";

import { postInterface } from "../utils/interfaces";

export async function resultsLoader({ ...args }) {
    const url = new URL(args.request.url);
    const query = url.searchParams.get("query");
    try {
        if (!query) {
            return [];
        }
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/search/${query}`
        );
        if (!response.ok) {
            throw new Error(`Status error ${response.status}`);
        }
        const resultsData = await response.json();
        return resultsData;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return [];
    }
}

export async function searchAction({ ...args }) {
    const formData = await args.request.formData();
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
    const postElements = searchResults.map((post: postInterface) => {
        return (
            <div className="post-link-container" key={post._id}>
                <Link to={`/posts/details/${post._id}`}>
                    <h3 className="post-title">{post.title}</h3>
                </Link>
            </div>
        );
    });

    return (
        <>
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
                    postElements
                ) : (
                    <h3>{query ? `No results found for ${query}` : ""}</h3>
                )}
            </div>
        </>
    );
}
