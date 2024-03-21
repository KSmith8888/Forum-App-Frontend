import { useEffect, useRef } from "react";
import { redirect, Form, useActionData, useLoaderData } from "react-router-dom";

import { loaderActionInterface, reportInterface } from "../utils/interfaces.ts";
import {
    deleteUsersAccount,
    deleteUsersPost,
    updateUsersRole,
    deleteReport,
} from "../utils/moderation";
import ModReport from "../components/ModReport.tsx";

import "../assets/styles/moderation.css";

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
    const deleteReportId = formData.get("delete-report-id");
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
    if (deleteReportId && typeof deleteReportId === "string") {
        const deleteReportMsg = await deleteReport(deleteReportId);
        returnMessage = deleteReportMsg;
    }
    if (typeof returnMessage !== "string") {
        returnMessage = "Something went wrong, please try again later";
    }
    return returnMessage;
}

export default function Moderation() {
    const loader = useLoaderData();
    const reportedMessages = Array.isArray(loader) ? loader : [];
    const reportElements = reportedMessages.map((report: reportInterface) => {
        return <ModReport key={report._id} report={report} />;
    });
    const userRole = sessionStorage.getItem("role");
    const actionMessage = useActionData();
    const deleteAccountForm = useRef<HTMLFormElement>(null);
    const deletePostForm = useRef<HTMLFormElement>(null);
    const changeRoleForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (actionMessage) {
            if (deleteAccountForm && deleteAccountForm.current) {
                deleteAccountForm.current.reset();
            }
            if (deletePostForm && deletePostForm.current) {
                deletePostForm.current.reset();
            }
            if (changeRoleForm && changeRoleForm.current) {
                changeRoleForm.current.reset();
            }
        }
    }, [actionMessage]);

    return (
        <>
            <h2 className="moderation-main-heading">Moderation Page</h2>
            <div className="moderation-main-container">
                <section className="moderation-forms-section">
                    <h3 className="section-heading">Moderation Actions</h3>
                    <Form
                        method="DELETE"
                        action="/moderation"
                        className="moderation-form"
                        ref={deleteAccountForm}
                    >
                        <h4 className="form-heading">Delete User Account</h4>
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
                        ref={deletePostForm}
                    >
                        <h4 className="form-heading">Delete Post</h4>
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
                            ref={changeRoleForm}
                        >
                            <h4 className="form-heading">
                                Change Account Role
                            </h4>
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
                    <p className="moderation-form-message">
                        {typeof actionMessage === "string" ? actionMessage : ""}
                    </p>
                </section>
                <section className="reports-section">
                    <h3 className="section-heading">
                        Reported posts and comments
                    </h3>
                    <div>{reportElements.length > 0 && reportElements}</div>
                </section>
            </div>
        </>
    );
}
