import { useRouteError } from "react-router";

export default function ErrorElement() {
    const error = useRouteError();
    let message = "Please try again later";
    if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
            message = "Network connection error, please try again later";
        } else {
            message = error.message;
        }
    }

    return (
        <div className="error-message-container">
            <h2 className="error-heading">Sorry, there has been an error</h2>
            <p className="error-message">{message}</p>
        </div>
    );
}
