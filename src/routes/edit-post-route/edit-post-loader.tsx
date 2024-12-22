import { redirect } from "react-router";
import { loaderActionInterface } from "../../utils/interfaces";

export default async function editPostLoader({
    params,
}: loaderActionInterface) {
    const userId = sessionStorage.getItem("_id");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    const postId = params.id;
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${postId}`
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
    if (!data || typeof data !== "object" || !("post" in data)) {
        throw new Error("Something went wrong, please try again later");
    }
    return data.post;
}
