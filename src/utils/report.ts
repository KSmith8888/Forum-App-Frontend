export async function report(
    id: string,
    type: "Post" | "Comment",
    relatedPost?: string
) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before reporting");
    }
    if (type === "Comment" && !relatedPost) {
        throw new Error("Related post id must be provided");
    }
    const relatedPostId = relatedPost ? relatedPost : "none";
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/moderation/report`,
        {
            method: "POST",
            body: JSON.stringify({
                id,
                type,
                relatedPost: relatedPostId,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user_id": userId,
            },
        }
    );
    if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.msg) {
            throw new Error(errorData.msg);
        } else {
            throw new Error(`Response error: ${res.status}`);
        }
    }
}
