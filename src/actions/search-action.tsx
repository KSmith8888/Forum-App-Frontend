import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function searchAction({ request }: loaderActionInterface) {
    const formData = await request.formData();
    const searchTerm = formData.get("search");
    return redirect(`/search?query=${searchTerm}`);
}
