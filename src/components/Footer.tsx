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
                See the <Link to="/attribution">Attribution Page</Link> for
                information about the tools and assets used in the development
                of this project
            </p>
        </footer>
    );
}
