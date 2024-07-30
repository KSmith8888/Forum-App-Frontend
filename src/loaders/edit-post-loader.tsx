import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function editPostLoader({
    params,
}: loaderActionInterface) {
    const userId = sessionStorage.getItem("_id");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    const postId = params.id;
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/details/${postId}`
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
    if (typeof data === "object" && "post" in data) {
        return data.post;
    } else {
        throw new Error("Something went wrong, please try again later");
    }
}
