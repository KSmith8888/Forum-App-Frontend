import { loaderActionInterface } from "../utils/interfaces";

export default async function moderationAction({
    request,
}: loaderActionInterface) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        if (!token || !userId) {
            throw new Error("You must log in before performing that action");
        }
        const formData = await request.formData();
        const warningUser = formData.get("warning-list-user");
        const notificationUser = formData.get("notification-user");
        const notificationMessage = formData.get("notification-message");
        const notificationWarning = formData.get("notification-warning");
        const banUser = formData.get("ban-user");
        const banDate = formData.get("ban-date");
        const deleteAccountUsername = formData.get("delete-account-username");
        const deletePostId = formData.get("delete-post-id");
        const deleteCommentId = formData.get("delete-comment-id");
        const updateRoleUsername = formData.get("change-role-username");
        const newAccountRole = formData.get("new-role-input");
        const deleteReportId = formData.get("delete-report-id");
        let fetchUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/default`;
        let fetchMethod = "GET";
        let fetchBody = {};
        let returnMessage = null;
        if (typeof warningUser === "string") {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/notifications/${warningUser}`;
        }
        if (
            typeof notificationUser === "string" &&
            typeof notificationMessage === "string"
        ) {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/notifications/${notificationUser}`;
            fetchMethod = "POST";
            const isWarning = notificationWarning ? "Warning" : "Notice";
            fetchBody = {
                status: "Create user notification request",
                notificationUser,
                notificationMsg: notificationMessage,
                isWarning,
            };
        }
        if (typeof banUser === "string" && typeof banDate === "string") {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/ban/${banUser}`;
            fetchMethod = "POST";
            const banTimestamp = new Date(banDate).getTime();
            fetchBody = {
                status: "Ban user",
                banUser,
                banTimestamp,
            };
        }
        if (typeof deleteAccountUsername === "string") {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/profile/${deleteAccountUsername}`;
            fetchMethod = "DELETE";
        }
        if (typeof deletePostId === "string") {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/posts/${deletePostId}`;
            fetchMethod = "DELETE";
        }
        if (typeof deleteCommentId === "string") {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/comments/${deleteCommentId}`;
            fetchMethod = "DELETE";
        }
        if (
            typeof updateRoleUsername === "string" &&
            typeof newAccountRole === "string"
        ) {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/profile/${updateRoleUsername}/role`;
            fetchMethod = "PATCH";
            fetchBody = { newRole: newAccountRole };
        }
        if (typeof deleteReportId === "string") {
            fetchUrl = `${
                import.meta.env.VITE_BACKEND_URL
            }/api/v1/moderation/report/${deleteReportId}`;
            fetchMethod = "DELETE";
        }
        const fetchReq =
            fetchMethod === "POST" || fetchMethod === "PATCH"
                ? new Request(fetchUrl, {
                      method: fetchMethod,
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                          "user_id": userId,
                      },
                      body: JSON.stringify(fetchBody),
                  })
                : new Request(fetchUrl, {
                      method: fetchMethod,
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                          "user_id": userId,
                      },
                  });

        const res = await fetch(fetchReq);
        if (!res.ok) {
            const errorData = await res.json();
            if (errorData && errorData.message) {
                throw new Error(errorData.message);
            } else {
                throw new Error(`Status ${res.status}`);
            }
        }
        const data = await res.json();
        returnMessage = data;
        const currentTime = new Date();
        if (returnMessage && typeof returnMessage === "object") {
            if (
                "warnings" in returnMessage &&
                Array.isArray(returnMessage.warnings)
            ) {
                return {
                    warnings: returnMessage.warnings,
                    time: currentTime,
                    username: warningUser,
                };
            } else if (
                "message" in returnMessage &&
                typeof returnMessage.message === "string"
            ) {
                return `${returnMessage.message}-TIMESTAMP-Action taken at: ${currentTime}`;
            }
        } else {
            throw new Error("Data not returned in correct format");
        }
    } catch (error) {
        let errorMsg = "Please try again later";
        const errorTime = new Date();
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return `Error: ${errorMsg}-TIMESTAMP-Action taken at: ${errorTime}`;
    }
}
