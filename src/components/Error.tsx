import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
    const error = useRouteError();
    let message = "Please try again later";
    if (error instanceof Error) {
        message = error.message;
    }

    return (
        <div className="error-message-container">
            <h2 className="error-heading">Sorry, an error has occurred</h2>
            <p className="error-message">{message}</p>
        </div>
    );
}
