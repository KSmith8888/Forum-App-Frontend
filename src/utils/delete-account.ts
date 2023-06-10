export async function deleteAccount(id: string) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        if (!token || !userId) {
            throw new Error("You must be logged in to perform this action");
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/profile/${id}`,
            {
                method: "DELETE",
                body: JSON.stringify({ status: "Delete user account" }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        if (!res.ok) {
            throw new Error(`Response error: ${res.status}`);
        }
        const data = await res.json();
        return data.msg;
    } catch (error) {
        return error;
    }
}
