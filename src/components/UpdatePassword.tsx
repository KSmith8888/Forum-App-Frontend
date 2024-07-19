import { useRef, useEffect } from "react";
import { Form } from "react-router-dom";

interface updatePasswordProps {
    isPassModalOpen: boolean;
    setIsPassModalOpen: (value: boolean) => void;
    actionMessage: unknown;
}

export default function UpdatePassword({
    isPassModalOpen,
    setIsPassModalOpen,
    actionMessage,
}: updatePasswordProps) {
    const passwordModal = useRef<HTMLDialogElement>(null);
    const passwordForm = useRef<HTMLFormElement>(null);
    function passwordUpdated() {
        if (passwordModal.current) {
            passwordModal.current.close();
        }
        setIsPassModalOpen(false);
    }
    useEffect(() => {
        if (isPassModalOpen && passwordModal.current) {
            passwordModal.current.showModal();
        }
    }, [isPassModalOpen]);
    useEffect(() => {
        if (
            passwordForm.current &&
            passwordModal.current &&
            typeof actionMessage === "string" &&
            actionMessage.startsWith("Password")
        ) {
            passwordForm.current.reset();
            passwordModal.current.close();
        }
    }, [actionMessage]);
    return (
        <dialog className="profile-password-modal" ref={passwordModal}>
            <button
                className="close-modal-button"
                type="button"
                aria-label="Close update password form"
                onClick={() => {
                    setIsPassModalOpen(false);
                    if (passwordModal.current) {
                        passwordModal.current.close();
                    }
                }}
            >
                X
            </button>
            <Form
                className="update-password-form"
                method="post"
                ref={passwordForm}
            >
                <h3 className="update-password-form-heading">
                    Update Password:
                </h3>
                <label htmlFor="current-password-input">Current Password</label>
                <input
                    id="current-password-input"
                    className="input"
                    type="password"
                    name="current-password"
                    autoComplete="current-password"
                    minLength={8}
                    maxLength={18}
                    required
                />
                <label htmlFor="new-password-input">
                    New Password
                    <span className="block-label-text">
                        (Between 8 and 18 characters)
                    </span>
                </label>
                <input
                    id="new-password-input"
                    className="input"
                    type="password"
                    name="new-password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={18}
                    required
                />
                <label htmlFor="confirm-password-input">
                    Confirm New Password
                </label>
                <input
                    id="confirm-password-input"
                    className="input"
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={18}
                    required
                />
                <button
                    type="submit"
                    className="button"
                    onClick={() => {
                        passwordUpdated();
                    }}
                >
                    Submit
                </button>
            </Form>
        </dialog>
    );
}
