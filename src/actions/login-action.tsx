import { loaderActionInterface, savedPostInterface } from "../utils/interfaces";

export default async function loginAction({ request }: loaderActionInterface) {
    try {
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
            typeof data === "object" &&
            "role" in data &&
            "displayName" in data &&
            "_id" in data &&
            "token" in data &&
            "savedPosts" in data &&
            "likedPosts" in data &&
            "likedComments" in data
        ) {
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("username", data.displayName);
            sessionStorage.setItem("_id", data._id);
            sessionStorage.setItem("token", data.token);
            const savedPosts: string[] = [];
            data.savedPosts.forEach((post: savedPostInterface) => {
                savedPosts.push(post.postId);
            });
            sessionStorage.setItem("saved-posts", JSON.stringify(savedPosts));
            sessionStorage.setItem(
                "likedPosts",
                JSON.stringify(data.likedPosts)
            );
            sessionStorage.setItem(
                "likedComments",
                JSON.stringify(data.likedComments)
            );
        } else {
            throw new Error("There has been an error, please try again later");
        }
        return data;
    } catch (error) {
        let errorMessage = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return errorMessage;
    }
}
