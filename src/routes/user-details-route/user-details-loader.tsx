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
    return data;
}
