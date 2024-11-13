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
        return `You entered ${username} and ${email}`;
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
