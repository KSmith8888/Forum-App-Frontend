import { useRef, useState, useEffect } from "react";
import { Form } from "react-router";

import { updateEmailProps } from "../../utils/interfaces.ts";

export default function UpdateEmail({
    currentEmail,
    updateStep,
}: updateEmailProps) {
    const emailModal = useRef<HTMLDialogElement>(null);
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
            <h5 className="update-email-heading">Email: </h5>
            <p className="user-email">{currentEmail}</p>
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
                {updateStep === 1 ? (
                    <Form
                        method="POST"
                        className="update-email-form"
                        autoComplete="off"
                    >
                        <h3 className="update-email-form-heading">
                            Update Email
                        </h3>
                        <label htmlFor="password-input">Password:</label>
                        <input
                            id="password-input"
                            className="input"
                            type="password"
                            name="email-password"
                            minLength={8}
                            maxLength={18}
                            required
                            autoFocus
                        />
                        <label htmlFor="email-input">New Email:</label>
                        <input
                            id="email-input"
                            className="input"
                            type="email"
                            name="email"
                            minLength={6}
                            maxLength={40}
                            required
                        />
                        <button type="submit" className="button">
                            Submit
                        </button>
                        <p>A verification email will be sent to this address</p>
                    </Form>
                ) : (
                    <Form method="POST" className="update-email-form">
                        <h2 className="update-email-form-heading">
                            Enter the code that was sent to your new email
                            address
                        </h2>
                        <label htmlFor="code-input">Verification Code:</label>
                        <input
                            id="code-input"
                            className="input"
                            type="number"
                            name="update-code"
                            autoComplete="off"
                            min={100000}
                            max={999999}
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
                        <p className="verify-email-text">
                            If the verification email is not in your inbox,
                            please check the spam or junk folder
                        </p>
                    </Form>
                )}
            </dialog>
        </>
    );
}
