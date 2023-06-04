import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h2>Sorry, that page was not found</h2>
            <p>
                Check out the top trending posts on the{" "}
                <Link to="/">homepage</Link>
            </p>
        </>
    );
}
