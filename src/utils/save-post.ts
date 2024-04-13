export async function savePost(id: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before saving a post");
    }
    console.log(id);
    const testData = {
        msg: "This is only a test",
        alreadySaved: true,
    };
    return testData;
}
