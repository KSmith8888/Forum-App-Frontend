import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <p>
                This app stores information in the browser for necessary
                functionality and to improve user experience. For more
                information, see our <Link to="/terms">Terms of Service</Link>
            </p>
            <p>
                This service bears no responsibility for the content of third
                party sites linked to from within the service
            </p>
        </footer>
    );
}
