import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="top-level-container">
            <Header />
            <main className="main-section">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
