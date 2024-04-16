export async function savePost(id: string, title: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before saving a post");
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/save/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify({ postTitle: title }),
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
    const data = await res.json();
    if (!data) {
        throw new Error("Requested data is not present");
    }
    const currentSavedPosts = localStorage.getItem("saved-posts");
    if (currentSavedPosts) {
        const prevSavedPosts = JSON.parse(currentSavedPosts);
        if (data.didUserSave) {
            localStorage.setItem(
                "saved-posts",
                JSON.stringify([...prevSavedPosts, id])
            );
        } else if (!data.didUserSave && currentSavedPosts.length > 1) {
            const filteredSavedPosts = prevSavedPosts.filter(
                (postId: string) => {
                    return postId !== id;
                }
            );
            localStorage.setItem(
                "saved-posts",
                JSON.stringify(filteredSavedPosts)
            );
        } else if (!data.didUserSave && currentSavedPosts.length === 1) {
            localStorage.removeItem("saved-posts");
        }
    } else {
        localStorage.setItem("saved-posts", JSON.stringify([id]));
    }
    return data;
}
