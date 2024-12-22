import { redirect } from "react-router";
import { loaderActionInterface } from "../../utils/interfaces";

export default async function searchAction({ request }: loaderActionInterface) {
    try {
        const formData = await request.formData();
        const searchTerm = formData.get("search");
        const reg = new RegExp("^[a-zA-Z0-9_]+$");
        if (
            !searchTerm ||
            typeof searchTerm !== "string" ||
            !reg.test(searchTerm)
        ) {
            throw new Error("Please enter a valid search term");
        }
        return redirect(`/search?query=${searchTerm}`);
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
