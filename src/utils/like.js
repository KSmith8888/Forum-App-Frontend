export async function likePost(id) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        if (!token || !userId) {
            throw new Error("You must log in before liking a post");
        }
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/posts/likes/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ status: "Update like count" }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        if (!res.ok) {
            throw new Error(`Response error: ${res.status}`);
        }
        const data = await res.json();
        return data.likes;
    } catch (error) {
        console.log(error);
    }
}

export async function likeComment(id) {
    try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("_id");
        if (!token || !userId) {
            throw new Error("You must log in before liking a comment");
        }
        const res = await fetch(
            `http://127.0.0.1:3000/api/v1/comments/likes/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ status: "Update like count" }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "user_id": userId,
                },
            }
        );
        if (!res.ok) {
            throw new Error(`Response error: ${res.status}`);
        }
        const data = await res.json();
        return data.likes;
    } catch (error) {
        console.log(error);
    }
}
