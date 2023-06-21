export async function deleteUsersAccount(username: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before performing that action");
    }
    const res = await fetch(
        `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/moderation/profile/${username}`,
        {
            method: "DELETE",
            body: JSON.stringify({ status: "Delete account request" }),
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
    if (!data.msg) {
        throw new Error("Incorrect data format returned from server");
    }
    return data.msg;
}

export async function deleteUsersPost(postId: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before performing that action");
    }
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/details/${postId}`,
        {
            method: "DELETE",
            body: JSON.stringify({ status: "Delete post request" }),
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
    if (!data.msg) {
        throw new Error("Incorrect data format returned from server");
    }
    return data.msg;
}

export async function updateUsersRole(username: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before performing that action");
    }
    const res = await fetch(
        `${
            import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/profile/${username}/role`,
        {
            method: "PATCH",
            body: JSON.stringify({ status: "Change account role request" }),
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
    if (!data.msg) {
        throw new Error("Incorrect data format returned from server");
    }
    return data.msg;
}
