let params = null;
const route = location.pathname ? `route=${location.pathname}` : null;
const id = sessionStorage.getItem("_id");
const isUserLoggedIn = id ? "status=loggedIn" : null;
if (route && isUserLoggedIn) {
    params = `?${route}&${isUserLoggedIn}`;
} else if (route && !isUserLoggedIn) {
    params = `?${route}`;
} else if (!route && isUserLoggedIn) {
    params = `?${isUserLoggedIn}`;
}
const redirectUrl = params ? `/${params}` : "/";
location.assign(redirectUrl);
