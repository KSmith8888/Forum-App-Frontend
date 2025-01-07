import { redirect } from "react-router";

export default async function profileLoader() {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!userId || !token) {
        return redirect("/?message=Please_log_in");
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/profile/details`,
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
        if (errorData && errorData.message) {
            throw new Error(errorData.message);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    if (
        !data ||
        typeof data !== "object" ||
        !("posts" in data) ||
        !Array.isArray(data.posts) ||
        !("comments" in data) ||
        !Array.isArray(data.comments) ||
        !("savedPosts" in data) ||
        !Array.isArray(data.savedPosts) ||
        !("notifications" in data) ||
        !Array.isArray(data.notifications) ||
        !("bio" in data) ||
        typeof data.bio !== "string" ||
        !("pswdLastUpdated" in data) ||
        typeof data.pswdLastUpdated !== "string" ||
        !("replySetting" in data) ||
        typeof data.replySetting !== "boolean" ||
        !("email" in data) ||
        typeof data.email !== "string"
    ) {
        throw new Error("Something went wrong, please try again later");
    }
    return data;
}
