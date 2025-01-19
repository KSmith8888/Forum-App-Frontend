import { useState } from "react";
import { Outlet, useNavigation } from "react-router";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

import { profilePicInterface } from "../utils/interfaces.ts";
import "../assets/styles/main.css";

export default function Layout() {
    const navigate = useNavigation();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [numOfNotifications, setNumOfNotifications] = useState(0);
    const [profilePic, setProfilePic] = useState<profilePicInterface>({
        name: "blank.png",
        alt: "A generic, blank outline of a mans upper body",
    });

    return (
        <div className="top-level-container">
            <Header
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
                numOfNotifications={numOfNotifications}
                profilePic={profilePic}
                setProfilePic={setProfilePic}
            />
            <main className="main-section">
                {navigate.state === "loading" && (
                    <div id="outlet-loading-area">
                        <div id="outlet-loading-background">
                            <div id="outlet-loading-spinner"></div>
                            <p id="outlet-loading-text">Loading</p>
                        </div>
                    </div>
                )}
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
