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
    if (
        !data ||
        typeof data !== "object" ||
        !("post" in data) ||
        typeof data.post !== "object"
    ) {
        throw new Error("Something went wrong, please try again later");
    }
    const fullPost = data.post;
    if (
        !("title" in fullPost) ||
        !("content" in fullPost) ||
        !("postType" in fullPost) ||
        typeof fullPost.title !== "string" ||
        typeof fullPost.content !== "string" ||
        fullPost.postType !== "strin"
    ) {
        throw new Error("Something went wrong, please try again later");
    }
    const postData = {
        title: fullPost.title,
        content: fullPost.content,
        postType: fullPost.postType,
    };
    return postData;
}
