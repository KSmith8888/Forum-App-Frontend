import { loaderActionInterface } from "../utils/interfaces";

export default async function postLoader({ params }: loaderActionInterface) {
    const postId = params.id;
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/details/${postId}`
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    if (
        typeof data === "object" &&
        "post" in data &&
        typeof data.post === "object" &&
        "comments" in data &&
        Array.isArray(data.comments)
    ) {
        return data;
    } else {
        throw new Error("Something went wrong, please try again later");
    }
}
