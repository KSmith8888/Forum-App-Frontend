import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function completeResetAction({
    request,
}: loaderActionInterface) {
    try {
        const resetData = await request.formData();
        const code = resetData.get("code");
        const userId = resetData.get("userId");
        const password = resetData.get("password");
        const confirmPass = resetData.get("password-confirm");
        const reg = new RegExp("^[a-zA-Z0-9.:,?/_'!@-]+$");
        const codeReg = new RegExp("^[0-9]+$");
        if (
            typeof userId !== "string" ||
            typeof password !== "string" ||
            typeof confirmPass !== "string" ||
            !reg.test(password) ||
            !reg.test(userId)
        ) {
            throw new Error("Please do not include special characters");
        }
        if (typeof code !== "string" || !codeReg.test(code)) {
            throw new Error("Code does not match correct format");
        }
        if (password !== confirmPass) {
            throw new Error(
                "The values in the password and confirm password fields must match"
            );
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/reset/complete`,
            {
                method: "POST",
                body: JSON.stringify({ code, userId, password }),
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
            data.message !== "Password reset successfully"
        ) {
            throw new Error(
                "There has been an error resetting your password, please try again later"
            );
        }
        return redirect(
            "/login/?message=Password reset successfully, please log in"
        );
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
