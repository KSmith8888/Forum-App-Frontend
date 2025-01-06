import { loaderActionInterface } from "../../utils/interfaces";

export default async function loginAction({ request }: loaderActionInterface) {
    const loginData = await request.formData();
    const username = loginData.get("username");
    const password = loginData.get("password");
    const reg = new RegExp("^[a-zA-Z0-9.:,?/_'!@-]+$");
    if (!username || !password) {
        throw new Error("No username or password present");
    }
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        !reg.test(username) ||
        !reg.test(password)
    ) {
        throw new Error(
            "Please do not include special characters in your credentials"
        );
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.ok) {
        if (res.status === 400) {
            throw new Error("Too many login attempts, account frozen");
        } else if (res.status === 401) {
            throw new Error("Provided credentials do not match");
        } else {
            throw new Error(`Status error ${res.status}`);
        }
    }
    const data = await res.json();
    if (
        !data ||
        typeof data !== "object" ||
        !("status" in data) ||
        typeof data.status !== "string" ||
        !("role" in data) ||
        typeof data.role !== "string" ||
        !("displayName" in data) ||
        typeof data.displayName !== "string" ||
        !("_id" in data) ||
        typeof data._id !== "string" ||
        !("token" in data) ||
        typeof data.token !== "string" ||
        !("savedPosts" in data) ||
        !Array.isArray(data.savedPosts) ||
        !("likedPosts" in data) ||
        !Array.isArray(data.likedPosts) ||
        !("likedComments" in data) ||
        !Array.isArray(data.likedComments) ||
        !("username" in data) ||
        typeof data.username !== "string" ||
        !("profileImageName" in data) ||
        typeof data.profileImageName !== "string" ||
        !("profileImageAlt" in data) ||
        typeof data.profileImageAlt !== "string"
    ) {
        throw new Error("There has been an error, please try again later");
    }
    return data;
}
