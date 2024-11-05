import { redirect } from "react-router-dom";

export default async function profileLoader() {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!userId || !token) {
        return redirect("/?message=Please_log_in");
    }
    const res = await fetch(
        `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/profile/details/${userId}`,
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
    return data;
}
