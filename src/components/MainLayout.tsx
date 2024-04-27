import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import TopicNav from "./TopicNav.tsx";

import { profilePicInterface } from "../utils/interfaces.ts";

export default function Layout() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [numOfNotifications, setNumOfNotifications] = useState(0);
    const initialProfilePic = {
        name: "blank.png",
        alt: "A generic, blank outline of a mans upper body",
    };
    const [profilePic, setProfilePic] =
        useState<profilePicInterface>(initialProfilePic);

    return (
        <div className="top-level-container">
            <Header
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
                numOfNotifications={numOfNotifications}
                profilePic={profilePic}
                setProfilePic={setProfilePic}
            />
            <TopicNav />
            <main className="main-section">
                <Outlet
                    context={{
                        isUserLoggedIn,
                        setIsUserLoggedIn,
                        numOfNotifications,
                        setNumOfNotifications,
                        profilePic,
                        setProfilePic,
                    }}
                />
            </main>
            <Footer />
        </div>
    );
}
