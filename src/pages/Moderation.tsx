import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";

import { reportInterface, notificationInterface } from "../utils/interfaces.ts";
import { createDateString } from "../utils/create-date-string.ts";

import ModReport from "../components/ModReport.tsx";

import "../assets/styles/moderation.css";

export default function Moderation() {
    const loader = useLoaderData();
    const reportedMessages = Array.isArray(loader) ? loader : [];
    const reportElements = reportedMessages.map((report: reportInterface) => {
        return (
            <ModReport
                key={report._id}
                _id={report._id}
                messageId={report.messageId}
                postUrlTitle={report.postUrlTitle}
                messageType={report.messageType}
                messageContent={report.messageContent}
                reportedBy={report.reportedBy}
                relatedPost={report.relatedPost}
                createdAt={report.createdAt}
                updatedAt={report.updatedAt}
            />
        );
    });
    const userRole = sessionStorage.getItem("role");
    const actionMessage = useActionData();
    const warningsForm = useRef<HTMLFormElement>(null);
    const notifyUserForm = useRef<HTMLFormElement>(null);
    const banUserForm = useRef<HTMLFormElement>(null);
    const deleteAccountForm = useRef<HTMLFormElement>(null);
    const deletePostForm = useRef<HTMLFormElement>(null);
    const deleteCommentForm = useRef<HTMLFormElement>(null);
    const changeRoleForm = useRef<HTMLFormElement>(null);

    const messageModal = useRef<HTMLDialogElement>(null);
    const [modalMessage, setModalMessage] = useState(
        <p className="message-modal-text">
            There has been an error, please try again later
        </p>
    );

    useEffect(() => {
        if (messageModal.current) {
            if (typeof actionMessage === "string") {
                const splitMessage = actionMessage.split("-TIMESTAMP-");
                const dateString = createDateString(
                    splitMessage[1],
                    "Action taken"
                );
                setModalMessage(
                    <div>
                        <p
                            className={
                                actionMessage.startsWith("Error:")
                                    ? "error-message message-modal-text"
                                    : "message-modal-text"
                            }
                        >
                            {splitMessage[0]}
                        </p>
                        <p>{dateString}</p>
                    </div>
                );
                messageModal.current.showModal();
            } else if (
                actionMessage &&
                typeof actionMessage === "object" &&
                "time" in actionMessage &&
                typeof actionMessage.time === "string" &&
                "warnings" in actionMessage &&
                Array.isArray(actionMessage.warnings) &&
                "username" in actionMessage
            ) {
                const userWarnings = actionMessage.warnings.map(
                    (warning: notificationInterface) => {
                        return (
                            <p key={warning._id} className="message-modal-text">
                                {warning.message}
                            </p>
                        );
                    }
                );
                const dateString = createDateString(
                    actionMessage.time,
                    "Action taken"
                );
                setModalMessage(
                    <div>
                        <h3>{`Warnings issued to ${
                            actionMessage.username || "User"
                        } (${actionMessage.warnings.length})`}</h3>
                        {userWarnings}
                        <p>{dateString}</p>
                    </div>
                );
                messageModal.current.showModal();
            }
        }
    }, [actionMessage]);
    useEffect(() => {
        if (actionMessage) {
            if (warningsForm && warningsForm.current) {
                warningsForm.current.reset();
            }
            if (notifyUserForm && notifyUserForm.current) {
                notifyUserForm.current.reset();
            }
            if (banUserForm && banUserForm.current) {
                banUserForm.current.reset();
            }
            if (deleteAccountForm && deleteAccountForm.current) {
                deleteAccountForm.current.reset();
            }
            if (deletePostForm && deletePostForm.current) {
                deletePostForm.current.reset();
            }
            if (deleteCommentForm && deleteCommentForm.current) {
                deleteCommentForm.current.reset();
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
                    <dialog id="mod-response-modal" ref={messageModal}>
                        <button
                            className="close-mod-modal-button"
                            aria-label="Close-moderation-dialog"
                            onClick={() => {
                                if (messageModal.current) {
                                    messageModal.current.close();
                                }
                            }}
                        >
                            X
                        </button>
                        {modalMessage}
                    </dialog>
                    <h3 className="section-heading">Moderation Actions</h3>
                    <Form
                        method="POST"
                        action="/moderation"
                        className="moderation-form"
                        ref={warningsForm}
                    >
                        <h4 className="form-heading">Review User Warnings</h4>
                        <label htmlFor="warning-user-input">
                            User to review:
                        </label>
                        <input
                            id="warning-user-input"
                            className="input moderation-input"
                            name="warning-list-user"
                            type="text"
                            pattern="[a-zA-Z0-9_]+"
                            maxLength={18}
                            required
                        />
                        <button type="submit" className="button">
                            Submit
                        </button>
                    </Form>
                    <Form
                        method="POST"
                        action="/moderation"
                        className="moderation-form"
                        ref={notifyUserForm}
                    >
                        <h4 className="form-heading">Send User Notification</h4>
                        <label htmlFor="notify-user-input">
                            User to be notified:
                        </label>
                        <input
                            id="notify-user-input"
                            className="input moderation-input"
                            name="notification-user"
                            type="text"
                            pattern="[a-zA-Z0-9_]+"
                            maxLength={18}
                            required
                        />
                        <label htmlFor="notify-message-input">
                            Notification Message:
                        </label>
                        <textarea
                            id="notify-message-input"
                            className="input textarea moderation-input"
                            name="notification-message"
                            minLength={4}
                            maxLength={120}
                            rows={6}
                            required
                        ></textarea>
                        <div className="checkbox-container">
                            <label htmlFor="notify-warning-input">
                                Is notification a warning:
                            </label>
                            <input
                                id="notify-warning-input"
                                type="checkbox"
                                name="notification-warning"
                            />
                        </div>
                        <button type="submit" className="button">
                            Submit
                        </button>
                    </Form>
                    <Form
                        method="POST"
                        action="/moderation"
                        className="moderation-form"
                        ref={banUserForm}
                    >
                        <h4 className="form-heading">Ban User</h4>
                        <label htmlFor="ban-user-input">
                            User to be banned:
                        </label>
                        <input
                            id="ban-user-input"
                            className="input moderation-input"
                            name="ban-user"
                            type="text"
                            pattern="[a-zA-Z0-9_]+"
                            maxLength={18}
                            required
                        />
                        <label htmlFor="ban-reason-input">
                            Reason for ban:
                        </label>
                        <input
                            id="ban-reason-input"
                            className="input moderation-input"
                            name="ban-reason"
                            type="text"
                            pattern="[a-zA-Z0-9_ ]+"
                            maxLength={30}
                            required
                        />
                        <label htmlFor="ban-date-input">Ban user until:</label>
                        <input
                            id="ban-date-input"
                            type="date"
                            name="ban-date"
                            className="input moderation-input"
                            min="2024-01-01"
                            max="2029-12-31"
                            required
                        />
                        <button type="submit" className="button">
                            Submit
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
                            className="input moderation-input"
                            name="delete-post-id"
                            type="text"
                            pattern="[a-zA-Z0-9]+"
                            maxLength={25}
                            required
                        />
                        <button type="submit" className="button">
                            Submit
                        </button>
                    </Form>
                    <Form
                        method="DELETE"
                        action="/moderation"
                        className="moderation-form"
                        ref={deleteCommentForm}
                    >
                        <h4 className="form-heading">Delete Comment</h4>
                        <label htmlFor="comment-id-input">
                            Id number of comment to be deleted:
                        </label>
                        <input
                            id="comment-id-input"
                            className="input moderation-input"
                            name="delete-comment-id"
                            type="text"
                            pattern="[a-zA-Z0-9]+"
                            maxLength={25}
                            required
                        />
                        <button type="submit" className="button">
                            Submit
                        </button>
                    </Form>
                    {userRole === "admin" && (
                        <>
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
                                    className="input moderation-input"
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
                                    Submit
                                </button>
                            </Form>
                            <Form
                                method="DELETE"
                                action="/moderation"
                                className="moderation-form"
                                ref={deleteAccountForm}
                            >
                                <h4 className="form-heading">
                                    Delete User Account
                                </h4>
                                <label htmlFor="username-input">
                                    Username of account to be deleted:
                                </label>
                                <input
                                    id="username-input"
                                    className="input moderation-input"
                                    name="delete-account-username"
                                    type="text"
                                    pattern="[a-zA-Z0-9_]+"
                                    maxLength={18}
                                    required
                                />
                                <button type="submit" className="button">
                                    Submit
                                </button>
                            </Form>
                        </>
                    )}
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
