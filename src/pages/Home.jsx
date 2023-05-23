import React, { useEffect } from "react";
import {
    useLoaderData,
    useSearchParams,
    redirect,
    useOutletContext,
} from "react-router-dom";

export async function homeLoader({ request }) {
    try {
        const url = new URL(request.url);
        const redirectRoute = url.searchParams.get("route");
        if (redirectRoute) {
            return redirect(redirectRoute);
        }
        const data = [
            {
                _id: "1",
                title: "Rem nisi dolorem minima dolor consequuntur",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia maxime adipisci cupiditate neque asperiores, inventore illum, quibusdam quia quas atque suscipit eligendi! Assumenda voluptatum eius voluptatem, sequi eaque, nam earum quis corrupti ad maiores laboriosam quidem reprehenderit quaerat. Placeat eum eos optio qui et!",
            },
        ];
        return data;
    } catch (error) {
        return error;
    }
}

export default function Home() {
    /* eslint-disable no-unused-vars */
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUserLoggedIn, setIsUserLoggedIn] = useOutletContext();
    /* eslint-enable no-unused-vars */
    const message = searchParams.get("message");
    const status = searchParams.get("status");
    useEffect(() => {
        if (status === "logged in") {
            setIsUserLoggedIn(true);
        }
    }, []);
    const postData = useLoaderData();
    const postElements = postData.map((post) => {
        return (
            <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
        );
    });

    return (
        <>
            <p className="user-message">{message ? message : ""}</p>
            <h2>This is the home page</h2>
            <p>See some popular posts below</p>
            {postData ? (
                <div>{postElements}</div>
            ) : (
                <p>Post data is unavailable at this time</p>
            )}
        </>
    );
}
