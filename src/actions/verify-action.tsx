import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function verifyAction({ request }: loaderActionInterface) {
    try {
        const verificationData = await request.formData();
        const code = verificationData.get("code");
        const pendingId = verificationData.get("pendingId");
        const reg = new RegExp("^[0-9]+$");
        if (!pendingId) {
            throw new Error("Something went wrong, please try again later");
        }
        if (typeof code !== "string" || !reg.test(code)) {
            throw new Error(
                "Code is invalid. Please enter the code from the verification email that was sent"
            );
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
            {
                method: "POST",
                body: JSON.stringify({ code, pendingId }),
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
        if (
            !data ||
            typeof data !== "object" ||
            !("message" in data) ||
            data.message !== "New account created successfully"
        ) {
            throw new Error(
                "There has been an error creating your account, please try again later"
            );
        }
        return redirect(
            "/login/?message=New account created successfully, please log in"
        );
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
