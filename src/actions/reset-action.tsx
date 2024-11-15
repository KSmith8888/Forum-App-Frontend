import { loaderActionInterface } from "../utils/interfaces";

export default async function resetAction({ request }: loaderActionInterface) {
    try {
        const resetData = await request.formData();
        const username = resetData.get("username");
        const email = resetData.get("email");
        const reg = new RegExp("^[a-zA-Z0-9.:,?/_'!@-]+$");
        if (
            typeof username !== "string" ||
            typeof email !== "string" ||
            !reg.test(username) ||
            !reg.test(email)
        ) {
            throw new Error("Please do not include special characters");
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/reset`,
            {
                method: "POST",
                body: JSON.stringify({ username, email }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
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
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
