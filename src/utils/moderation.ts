export async function deleteUsersAccount(username: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before performing that action");
    }
    const res = await fetch(
        `http://127.0.0.1:3000/api/v1/users/moderation/profile/${username}`,
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
    const data: { msg: string } = await res.json();
    return data.msg;
}

export async function deleteUsersPost(postId: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before performing that action");
    }
    const res = await fetch(
        `http://127.0.0.1:3000/api/v1/posts/details/${postId}`,
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
    const data: { msg: string } = await res.json();
    return data.msg;
}

export async function updateUsersRole(username: string) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("_id");
    if (!token || !userId) {
        throw new Error("You must log in before performing that action");
    }
    const res = await fetch(
        `http://127.0.0.1:3000/api/v1/users/profile/${username}/role`,
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
    const data: { msg: string } = await res.json();
    return data.msg;
}
