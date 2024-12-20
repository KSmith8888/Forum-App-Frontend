import { useState } from "react";
import { Outlet, useNavigation } from "react-router";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

import { profilePicInterface } from "../utils/interfaces.ts";
import "../assets/styles/main.css";

export default function Layout() {
    const navState = useNavigation();
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
            <main className="main-section">
                {navState.state !== "idle" && (
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
