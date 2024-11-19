import { useRef, useState, useEffect } from "react";
import { Form } from "react-router-dom";

import { updateEmailProps } from "../utils/interfaces.ts";

export default function UpdateEmail({ isEmailVerified }: updateEmailProps) {
    const emailModal = useRef<HTMLDialogElement>(null);
    const emailForm = useRef<HTMLFormElement>(null);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    function emailUpdated() {
        if (emailModal.current) {
            emailModal.current.close();
        }
        setIsEmailModalOpen(false);
    }
    useEffect(() => {
        if (isEmailModalOpen && emailModal.current) {
            emailModal.current.showModal();
        }
    }, [isEmailModalOpen]);
    return (
        <>
            <h5 className="update-email-heading">
                Email:{" "}
                <span
                    className={
                        isEmailVerified
                            ? "email-verified-text verified"
                            : "email-verified-text warning"
                    }
                >
                    {isEmailVerified ? "(Verified)" : "(Not verified)"}
                </span>
            </h5>
            <button
                className="button"
                type="button"
                onClick={() => {
                    setIsEmailModalOpen(true);
                }}
            >
                Update
            </button>
            <dialog ref={emailModal} className="update-email-modal">
                <button
                    className="close-modal-button"
                    type="button"
                    aria-label="Close update email form"
                    onClick={() => {
                        setIsEmailModalOpen(false);
                        if (emailModal.current) {
                            emailModal.current.close();
                        }
                    }}
                >
                    X
                </button>
                <Form
                    method="POST"
                    ref={emailForm}
                    className="update-email-form"
                >
                    <h3 className="update-password-form-heading">
                        Update Email
                    </h3>
                    <label htmlFor="email-input">New Email:</label>
                    <input
                        id="email-input"
                        className="input"
                        type="email"
                        name="email"
                        minLength={6}
                        maxLength={40}
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="button"
                        onClick={() => {
                            emailUpdated();
                        }}
                    >
                        Submit
                    </button>
                    <p>
                        A verification email will be sent to this address,
                        follow the instructions to verify the address.
                    </p>
                </Form>
            </dialog>
        </>
    );
}
