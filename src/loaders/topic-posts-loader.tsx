import { loaderActionInterface } from "../utils/interfaces";

export default async function postsTopicLoader({
    params,
}: loaderActionInterface) {
    const topic = params.topic;
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${topic}`
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
    if (!Array.isArray(data)) {
        throw new Error("Invalid data returned from server");
    }
    return data;
}
