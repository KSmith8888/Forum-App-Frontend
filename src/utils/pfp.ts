import { profilePicInterface } from "./interfaces.ts";

export async function updateProfilePic(profilePic: profilePicInterface) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        if (!token || !userId) {
            throw new Error("You must log in before liking a post");
        }
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/users/profile/${userId}/image`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    name: profilePic.name,
                    alt: profilePic.alt,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        if (!res.ok) {
            throw new Error(`Status Error: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}
