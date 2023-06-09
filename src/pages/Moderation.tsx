import { redirect, Form, useActionData } from "react-router-dom";

import { loaderActionInterface } from "../utils/interfaces";
import {
    deleteUsersAccount,
    deleteUsersPost,
    updateUsersRole,
} from "../utils/moderation";

export async function moderationLoader() {
    const userId = sessionStorage.getItem("_id");
    const userRole = sessionStorage.getItem("role");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    if (userRole !== "mod" && userRole !== "admin") {
        return redirect("/?message=Not Authorized");
    }
    return null;
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
