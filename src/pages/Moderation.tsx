import {
    redirect,
    Form,
    useActionData,
    useLoaderData,
    Link,
} from "react-router-dom";

import { loaderActionInterface, reportInterface } from "../utils/interfaces";
import {
    deleteUsersAccount,
    deleteUsersPost,
    updateUsersRole,
} from "../utils/moderation";

import { createDateString } from "../utils/create-date-string.ts";

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
    const newAccountRole = formData.get("new-role-input");
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
    if (
        updateRoleUsername &&
        typeof updateRoleUsername === "string" &&
        newAccountRole &&
        typeof newAccountRole === "string"
    ) {
        const updateRoleMsg = await updateUsersRole(
            updateRoleUsername,
            newAccountRole
        );
        returnMessage = updateRoleMsg;
    }
    if (!returnMessage) {
        returnMessage = "Something went wrong, please try again later";
    }
    return returnMessage;
}

export default function Moderation() {
    const loader = useLoaderData();
    const reportedMessages = Array.isArray(loader) ? loader : [];
    const reportElements = reportedMessages.map((report: reportInterface) => {
        const linkId =
            report.messageType === "Post"
                ? report.messageId
                : report.relatedPost;
        const reportDateString = createDateString(report.createdAt, "Reported");
        return (
            <div className="report-container" key={report.messageId}>
                <p>{`Report Type: ${report.messageType}`}</p>
                <Link to={`/posts/details/${linkId}`}>
                    The Reported Message
                </Link>
                <p>{reportDateString}</p>
            </div>
        );
    });
    const userRole = sessionStorage.getItem("role");
    const actionMessage = useActionData();

    return (
        <>
            <h2 className="moderation-main-heading">Moderation Page</h2>
            <div className="moderation-main-container">
                <section className="moderation-forms-section">
                    <p className="moderation-form-message">
                        {typeof actionMessage === "string" ? actionMessage : ""}
                    </p>
                    <Form
                        method="DELETE"
                        action="/moderation"
                        className="moderation-form"
                    >
                        <h3>Delete User Account</h3>
                        <label htmlFor="username-input">
                            Username of account to be deleted:
                        </label>
                        <input
                            id="username-input"
                            className="input"
                            name="delete-account-username"
                            type="text"
                            pattern="[a-zA-Z0-9_]+"
                            maxLength={18}
                            required
                        />
                        <button type="submit" className="button">
                            Delete Account
                        </button>
                    </Form>
                    <Form
                        method="DELETE"
                        action="/moderation"
                        className="moderation-form"
                    >
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
                            required
                        />
                        <button type="submit" className="button">
                            Delete Post
                        </button>
                    </Form>
                    {userRole === "admin" && (
                        <Form
                            method="patch"
                            action="/moderation"
                            className="moderation-form"
                        >
                            <h3>Change Account Role</h3>
                            <label htmlFor="change-role-input">
                                Username of account to be updated:
                            </label>
                            <input
                                id="change-role-input"
                                className="input"
                                name="change-role-username"
                                type="text"
                                pattern="[a-zA-Z0-9_]+"
                                maxLength={18}
                                required
                            />
                            <label htmlFor="new-role">New Role:</label>
                            <select
                                id="new-role"
                                className="input select"
                                name="new-role-input"
                                required
                            >
                                <option value="">Select new role:</option>
                                <option value="user">User</option>
                                <option value="mod">Mod</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="submit" className="button">
                                Update Account
                            </button>
                        </Form>
                    )}
                </section>
                <section className="reports-section">
                    <h3>Reported posts and comments</h3>
                    <div>{reportElements.length > 0 && reportElements}</div>
                </section>
            </div>
        </>
    );
}
