import React from "react";
import { useActionData, redirect } from "react-router-dom";

export async function resultsLoader({ request }) {
    const url = new URL(request.url);
    console.log(url);
    return null;
}

export async function searchAction({ request }) {
    const formData = await request.formData();
    const searchTerm = formData.get("search");
    return redirect(`/search/${searchTerm}`);
    //return searchTerm;
}

export default function Results() {
    const data = useActionData();

    return (
        <>
            {data ? (
                <h2>Search Results for {data}</h2>
            ) : (
                <h2>Enter a search term above</h2>
            )}
        </>
    );
}
