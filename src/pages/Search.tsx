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
                    postElements
                ) : (
                    <h3>{query ? `No results found for ${query}` : ""}</h3>
                )}
            </div>
        </div>
    );
}
