import React from "react";

export default function MessageModal({
    message = "There has been an error, please try again later",
}) {
    return (
        <dialog className="message-modal">
            <p className="message-modal-text">{message}</p>
            <button className="button">Close</button>
        </dialog>
    );
}
