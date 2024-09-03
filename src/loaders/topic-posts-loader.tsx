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
        if (errorData && errorData.message) {
            throw new Error(errorData.message);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const data = await res.json();
    return data;
}
