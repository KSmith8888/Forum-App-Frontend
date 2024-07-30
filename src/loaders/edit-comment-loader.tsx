import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function editCommentLoader({
    params,
}: loaderActionInterface) {
    const userId = sessionStorage.getItem("_id");
    if (!userId) {
        return redirect("/?message=Please log in");
    }
    const commentId = params.id;
    const res = await fetch(
        `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/comments/details/${commentId}`
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
    if (typeof data === "object" && "content" in data) {
        return data.content;
    } else {
        throw new Error("Something went wrong, please try again later");
    }
}
