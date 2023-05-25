export async function deletePostRequest(postId) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before deleting a post");
    }
    const res = await fetch(
        `http://127.0.0.1:3000/api/v1/posts/details/${postId}`,
        {
            method: "DELETE",
            body: JSON.stringify({ status: "Delete Post" }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user_id": userId,
            },
        }
    );
    const data = await res.json();
    return data.message;
}

export async function deleteCommentRequest(commentId) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before deleting a comment");
    }
    const res = await fetch(
        `http://127.0.0.1:3000/api/v1/comments/details/${commentId}`,
        {
            method: "DELETE",
            body: JSON.stringify({ status: "Delete Comment" }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user_id": userId,
            },
        }
    );
    const data = await res.json();
    return data.message;
}
