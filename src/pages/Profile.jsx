import React from "react";

export default function Profile() {
    const username = sessionStorage.getItem("username");

    return (
        <>
            <h2>{`Profile Page: ${username}`}</h2>
        </>
    );
}
