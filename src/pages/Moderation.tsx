import { redirect, Form, useActionData, useLoaderData } from "react-router-dom";

import { loaderActionInterface } from "../utils/interfaces";
import {
    deleteUsersAccount,
    deleteUsersPost,
    updateUsersRole,
} from "../utils/moderation";

export async function moderationLoader() {
    const userId = sessionStorage.getItem("_id");
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    if (userRole !== "mod" && userRole !== "admin") {
        return redirect("/?message=Not Authorized");
    }
    if (!token || !userId) {
        throw new Error("You must log in before reporting");
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/moderation/report`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user_id": userId,
            },
        }
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    return data;
}

export async function moderationAction({ request }: loaderActionInterface) {
    const formData = await request.formData();
    const deleteAccountUsername = formData.get("delete-account-username");
    const deletePostId = formData.get("delete-post-id");
    const updateRoleUsername = formData.get("change-role-username");
    let returnMessage = null;
    if (deleteAccountUsername && typeof deleteAccountUsername === "string") {
        const deleteAccountMsg = await deleteUsersAccount(
            deleteAccountUsername
        );
        returnMessage = deleteAccountMsg;
    }
    if (deletePostId && typeof deletePostId === "string") {
        const deletePostMsg = await deleteUsersPost(deletePostId);
        returnMessage = deletePostMsg;
    }
    if (updateRoleUsername && typeof updateRoleUsername === "string") {
        const updateRoleMsg = await updateUsersRole(updateRoleUsername);
        returnMessage = updateRoleMsg;
    }
    return returnMessage;
}

export default function Moderation() {
    const reportedMessages = useLoaderData();
    if (Array.isArray(reportedMessages)) {
        console.log(reportedMessages[0]);
    }
    const userRole = sessionStorage.getItem("role");
    const actionMessage = useActionData() as string;

    return (
        <>
            <h2>Moderation Page</h2>
            <p>{actionMessage}</p>
            <div className="moderation-form-container">
                <Form method="DELETE" action="/moderation">
                    <h3>Delete User Account</h3>
                    <label htmlFor="username-input">
                        Username of account to be deleted:
                    </label>
                    <input
                        id="username-input"
                        className="input"
                        name="delete-account-username"
                        type="text"
                        pattern="[a-zA-Z0-9]+"
                        maxLength={18}
                    />
                    <button type="submit" className="button">
                        Delete Account
                    </button>
                </Form>
                <Form method="DELETE" action="/moderation">
                    <h3>Delete Post</h3>
                    <label htmlFor="post-id-input">
                        Id number of post to be deleted:
                    </label>
                    <input
                        id="post-id-input"
                        className="input"
                        name="delete-post-id"
                        type="text"
                        pattern="[a-zA-Z0-9]+"
                        maxLength={25}
                    />
                    <button type="submit" className="button">
                        Delete Post
                    </button>
                </Form>
                {userRole === "admin" && (
                    <Form method="patch" action="/moderation">
                        <h3>Change User Role to Mod</h3>
                        <label htmlFor="change-role-input">
                            Username of account to be updated:
                        </label>
                        <input
                            id="change-role-input"
                            className="input"
                            name="change-role-username"
                            type="text"
                            pattern="[a-zA-Z0-9]+"
                            maxLength={18}
                        />
                        <button type="submit" className="button">
                            Update Account
                        </button>
                    </Form>
                )}
            </div>
        </>
    );
}
