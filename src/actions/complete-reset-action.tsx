import { redirect } from "react-router";
import { loaderActionInterface } from "../utils/interfaces";

export default async function completeResetAction({
    request,
}: loaderActionInterface) {
    try {
        const resetData = await request.formData();
        const code = resetData.get("code");
        const username = resetData.get("username");
        const password = resetData.get("password");
        const confirmPass = resetData.get("password-confirm");
        const reg = new RegExp("^[a-zA-Z0-9.:,?/_'!@-]+$");
        const codeReg = new RegExp("^[0-9]+$");
        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof confirmPass !== "string" ||
            !reg.test(password) ||
            !reg.test(username)
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
                body: JSON.stringify({ code, username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            if (res.status === 400) {
                throw new Error("Too many attempts, account frozen");
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
