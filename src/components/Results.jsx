import React from "react";
import { useLoaderData } from "react-router-dom";

export async function resultsLoader({ request }) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    try {
        const response = await fetch("/src/assets/test-data.json");
        if (!response.ok) {
            throw new Error(`Status error ${response.status}`);
        }
        const resultsData = await response.json();
        if (query === "books") {
            return resultsData;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
}

export default function Results() {
    const searchResults = useLoaderData() || [];
    const postElements = searchResults.map((post) => {
        return (
            <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
        );
    });

    return (
        <div className="results-container">
            {searchResults.length > 0 ? (
                postElements
            ) : (
                <h3>No results found</h3>
            )}
        </div>
    );
}
