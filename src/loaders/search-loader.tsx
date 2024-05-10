import { loaderActionInterface, postInterface } from "../utils/interfaces";

export default async function resultsLoader({
    request,
}: loaderActionInterface) {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    if (!query) {
        return [];
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/search/${query}`
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
    const resultsData: Array<postInterface> = await res.json();
    return resultsData;
}
