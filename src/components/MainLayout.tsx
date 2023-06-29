import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

export default function Layout() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [hasPicBeenUpdated, setHasPicBeenUpdated] = useState<boolean>(false);
    const [numOfNotifications, setNumOfNotifications] = useState(0);

    return (
        <div className="top-level-container">
            <Header
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
                hasPicBeenUpdated={hasPicBeenUpdated}
                numOfNotifications={numOfNotifications}
            />
            <main className="main-section">
                <Outlet
                    context={{
                        isUserLoggedIn,
                        setIsUserLoggedIn,
                        setHasPicBeenUpdated,
                        setNumOfNotifications,
                    }}
                />
            </main>
            <Footer />
        </div>
    );
}
