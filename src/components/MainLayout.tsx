import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [hasPicBeenUpdated, setHasPicBeenUpdated] = useState<boolean>(false);

    return (
        <div className="top-level-container">
            <Header
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
                hasPicBeenUpdated={hasPicBeenUpdated}
            />
            <main className="main-section">
                <Outlet
                    context={{
                        isUserLoggedIn,
                        setIsUserLoggedIn,
                        setHasPicBeenUpdated,
                    }}
                />
            </main>
            <Footer />
        </div>
    );
}
