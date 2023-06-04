export async function likePost(id: string) {
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
        const savedLikedPosts = localStorage.getItem("likedPosts");
        if (savedLikedPosts) {
            const prevLikedPosts = JSON.parse(savedLikedPosts);
            if (data.didUserLike) {
                localStorage.setItem(
                    "likedPosts",
                    JSON.stringify([...prevLikedPosts, id])
                );
            } else if (!data.didUserLike && savedLikedPosts.length > 1) {
                const filteredLikedPosts = prevLikedPosts.filter(
                    (postId: string) => {
                        return postId !== id;
                    }
                );
                localStorage.setItem(
                    "likedPosts",
                    JSON.stringify(filteredLikedPosts)
                );
            } else if (!data.didUserLike && savedLikedPosts.length === 1) {
                localStorage.removeItem("likedPosts");
            }
        } else {
            localStorage.setItem("likedPosts", JSON.stringify([id]));
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function likeComment(id: string) {
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
        const savedLikedComments = localStorage.getItem("likedComments");
        if (savedLikedComments) {
            const prevLikedComments = JSON.parse(savedLikedComments);
            if (data.didUserLike) {
                localStorage.setItem(
                    "likedComments",
                    JSON.stringify([...prevLikedComments, id])
                );
            } else if (!data.didUserLike && savedLikedComments.length > 1) {
                const filteredLikedComments = prevLikedComments.filter(
                    (postId: string) => {
                        return postId !== id;
                    }
                );
                localStorage.setItem(
                    "likedComments",
                    JSON.stringify(filteredLikedComments)
                );
            } else if (!data.didUserLike && savedLikedComments.length === 1) {
                localStorage.removeItem("likedComments");
            }
        } else {
            localStorage.setItem("likedComments", JSON.stringify([id]));
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}
