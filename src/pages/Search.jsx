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
            <Form className="search-form" method="post">
                <label htmlFor="search-input">Search Posts:</label>
                <input id="search-input" type="search" name="search" />
                <button type="submit">Search</button>
            </Form>
            <h2>Enter a search term above</h2>
            <Results />
        </>
    );
}
