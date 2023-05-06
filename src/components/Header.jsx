import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <h1 className="main-heading">The Forum App</h1>
            <nav className="main-nav">
                <Link to="/">Home</Link>
                <Link to="/test">Not Found</Link>
            </nav>
        </header>
    );
}
