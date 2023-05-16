import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
    const username = sessionStorage.getItem("username");

    return (
        <>
            <h2>{`Profile Page: ${username}`}</h2>
            <Link to="create">Create a new post</Link>
        </>
    );
}
