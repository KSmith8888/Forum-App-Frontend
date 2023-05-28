import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    const isRouteErr = isRouteErrorResponse(error);
    const message = isRouteErr ? error.data.message : "";

    return (
        <>
            <h2 className="error-heading">Sorry, an error has occurred</h2>
            <p className="error-message">{message}</p>
        </>
    );
}
