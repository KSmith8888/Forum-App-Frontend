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
    const data: Array<reportInterface> = await res.json();
    if (!Array.isArray(data)) {
        throw new Error("Something went wrong, incorrect data format");
    }
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
    if (!returnMessage) {
        returnMessage = "Something went wrong, please try again later";
    }
    return returnMessage;
}

export default function Moderation() {
    const reportedMessages = useLoaderData() as Array<reportInterface>;
    const reportElements = reportedMessages.map((report) => {
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
    const actionMessage = useActionData() as string;

    return (
        <>
            <h2 className="moderation-main-heading">Moderation Page</h2>
            <div className="moderation-main-container">
                <section className="moderation-forms-section">
                    <p className="moderation-form-message">{actionMessage}</p>
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
                            pattern="[a-zA-Z0-9]+"
                            maxLength={18}
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
                </section>
                <section className="reports-section">
                    <h3>Reported posts and comments</h3>
                    <div>{reportElements.length > 0 && reportElements}</div>
                </section>
            </div>
        </>
    );
}
