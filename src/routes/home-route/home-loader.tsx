import { redirect } from "react-router";
import { loaderActionInterface } from "../../utils/interfaces";

export default async function homeLoader({ request }: loaderActionInterface) {
    const url = new URL(request.url);
    const redirectRoute = url.searchParams.get("route");
    if (redirectRoute) {
        return redirect(redirectRoute);
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/home`
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
        !("popular" in data) ||
        !("new" in data) ||
        !Array.isArray(data.popular) ||
        !Array.isArray(data.new)
    ) {
        throw new Error("Something went wrong, please try again later");
    }
    return data;
}
