import { Link } from "react-router-dom";

import "../assets/styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">
                By using this service, you agree to our{" "}
                <Link to="/terms" className="link">
                    Terms of Service
                </Link>
            </p>
            <p className="footer-text">
                This service stores user account information in the browser for
                necessary functionality and to improve user experience
            </p>
        </footer>
    );
}
