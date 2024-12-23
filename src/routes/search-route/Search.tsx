import { useRef, useEffect } from "react";
import {
    Form,
    useLoaderData,
    useSearchParams,
    useActionData,
} from "react-router";

import PostPreview from "../../components/PostPreview.tsx";

import { postPreviewInfo } from "../../utils/interfaces.ts";

import "../../assets/styles/search.css";

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
    const postEls = searchResults.map((preview: postPreviewInfo) => {
        return (
            <PostPreview
                key={preview.postId}
                postId={preview.postId}
                title={preview.title}
                previewText={preview.previewText}
                postType={preview.postType}
                urlTitle={preview.urlTitle}
            />
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
