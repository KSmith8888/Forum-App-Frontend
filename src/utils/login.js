export async function attemptLogin(e) {
    try {
        e.preventDefault();
        const loginData = new FormData(e.target);
        const username = loginData.get("username");
        const password = loginData.get("password");
        if (!username || !password) {
            throw new Error("No username or password present");
        }
        const res = await fetch("http://127.0.0.1:3000/api/v1/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error(`Status error ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(`Login Error: ${error}`);
    }
}
