import { loaderActionInterface } from "../utils/interfaces";
import {
    notifyUser,
    deleteUsersAccount,
    deleteUsersPost,
    deleteUsersComment,
    updateUsersRole,
    deleteReport,
} from "../utils/moderation.ts";

export default async function moderationAction({
    request,
}: loaderActionInterface) {
    const formData = await request.formData();
    const notificationUser = formData.get("notification-user");
    const notificationMessage = formData.get("notification-message");
    const deleteAccountUsername = formData.get("delete-account-username");
    const deletePostId = formData.get("delete-post-id");
    const deleteCommentId = formData.get("delete-comment-id");
    const updateRoleUsername = formData.get("change-role-username");
    const newAccountRole = formData.get("new-role-input");
    const deleteReportId = formData.get("delete-report-id");
    let returnMessage = null;
    if (
        notificationUser &&
        typeof notificationUser === "string" &&
        notificationMessage &&
        typeof notificationMessage === "string"
    ) {
        const notifyUserMsg = await notifyUser(
            notificationUser,
            notificationMessage
        );
        returnMessage = notifyUserMsg;
    }
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
    if (deleteCommentId && typeof deleteCommentId === "string") {
        const deleteCommentMsg = await deleteUsersComment(deleteCommentId);
        returnMessage = deleteCommentMsg;
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
    const currentTime = new Date();
    return `${returnMessage} - ${currentTime}`;
}
