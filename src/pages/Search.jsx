import React from "react";
import { Form, redirect } from "react-router-dom";

import Results from "../components/Results";

export async function searchAction({ request }) {
    const formData = await request.formData();
    const searchTerm = formData.get("search");
    return redirect(`/search?query=${searchTerm}`);
}

export default function Search() {
    return (
        <>
            <h2>Search posts by keyword</h2>
            <Form className="search-form" method="post">
                <label htmlFor="search-input">Search Term:</label>
                <input
                    id="search-input"
                    type="search"
                    name="search"
                    className="input"
                />
                <button type="submit" className="button">
                    Search
                </button>
            </Form>
            <Results />
        </>
    );
}
