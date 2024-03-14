import { Link } from "react-router-dom";

export default function TopicNav() {
    return (
        <nav className="topics-links-nav">
            <div className="topics-link-container">
                <div className="topics-link-row">
                    <Link to="/posts/programming" className="topic-link">
                        Programming
                    </Link>
                    <Link to="/posts/movies" className="topic-link">
                        Movies
                    </Link>
                    <Link to="/posts/politics" className="topic-link">
                        Politics
                    </Link>
                </div>
                <div className="topics-link-row">
                    <Link to="/posts/games" className="topic-link">
                        Games
                    </Link>
                    <Link to="/posts/space" className="topic-link">
                        Space
                    </Link>
                    <Link to="/posts/books" className="topic-link">
                        Books
                    </Link>
                    <Link to="/posts/other" className="topic-link">
                        Other
                    </Link>
                </div>
            </div>
        </nav>
    );
}
