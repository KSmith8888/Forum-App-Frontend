import { Link } from "react-router";

export default function NotFound() {
    return (
        <>
            <h2>Sorry, that page was not found</h2>
            <p>
                Check out the top popular posts on the{" "}
                <Link to="/">homepage</Link>
            </p>
        </>
    );
}
