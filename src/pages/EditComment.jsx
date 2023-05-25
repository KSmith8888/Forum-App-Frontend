import React from "react";
import { redirect } from "react-router-dom";

export async function editCommentLoader() {
    const userId = sessionStorage.getItem("_id");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    return null;
}

export async function editCommentAction() {
    console.log("Edit comment");
}

export default function EditComment() {
    return (
        <>
            <h2>Edit Comment</h2>
        </>
    );
}
