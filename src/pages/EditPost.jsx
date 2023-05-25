import React from "react";
import { redirect } from "react-router-dom";

export async function editPostLoader() {
    const userId = sessionStorage.getItem("_id");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    return null;
}

export async function editPostAction() {
    console.log("Edit post");
}

export default function EditPost() {
    return (
        <>
            <h2>Edit Post</h2>
        </>
    );
}
