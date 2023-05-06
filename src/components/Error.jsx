import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();

    return (
        <>
            <h2 className="error-heading">Sorry, an error has occurred</h2>
            <p className="error-message">{error.message}</p>
        </>
    );
}
