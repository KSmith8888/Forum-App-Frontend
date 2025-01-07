import { loaderActionInterface } from "../../utils/interfaces";

export default async function userDetailsLoader({
    params,
}: loaderActionInterface) {
    const username = params.username;
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/details/${username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
        !("username" in data) ||
        typeof data.username !== "string" ||
        !("bio" in data) ||
        typeof data.bio !== "string" ||
        !("posts" in data) ||
        !Array.isArray(data.posts) ||
        !("comments" in data) ||
        !Array.isArray(data.comments) ||
        !("image" in data) ||
        typeof data.image !== "string" ||
        !("alt" in data) ||
        typeof data.alt !== "string"
    ) {
        throw new Error("Something went wrong, please try again later");
    }
    return data;
}
