import React from "react";
import { Link, Form } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <h1 className="main-heading">The Forum App</h1>
            <nav className="main-nav">
                <Link to="/" className="link">
                    Home
                </Link>
                <Link to="/test" className="link">
                    Not Found
                </Link>
            </nav>
            <Form className="search-form" method="post">
                <label htmlFor="search-input">Search Posts:</label>
                <input id="search-input" type="search" name="search" />
                <button type="submit">Search</button>
            </Form>
        </header>
    );
}
