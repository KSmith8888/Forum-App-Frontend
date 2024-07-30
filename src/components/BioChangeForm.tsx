import { useRef, useEffect } from "react";
import { Form } from "react-router-dom";

import { profileBioProps } from "../utils/interfaces.ts";

export default function BioChangeForm({
    isBioModalOpen,
    setIsBioModalOpen,
    actionMessage,
}: profileBioProps) {
    const bioModal = useRef<HTMLDialogElement>(null);
    const bioForm = useRef<HTMLFormElement>(null);
    function bioUpdated() {
        if (bioModal.current) {
            bioModal.current.close();
        }
        setIsBioModalOpen(false);
    }
    useEffect(() => {
        if (isBioModalOpen && bioModal.current) {
            bioModal.current.showModal();
        }
    }, [isBioModalOpen]);
    useEffect(() => {
        if (
            bioForm.current &&
            bioModal.current &&
            typeof actionMessage === "string" &&
            actionMessage.startsWith("Bio")
        ) {
            bioForm.current.reset();
            bioModal.current.close();
        }
    }, [actionMessage]);
    return (
        <dialog className="profile-bio-modal" ref={bioModal}>
            <button
                className="close-modal-button"
                type="button"
                aria-label="Close update bio form"
                onClick={() => {
                    setIsBioModalOpen(false);
                    if (bioModal.current) {
                        bioModal.current.close();
                    }
                }}
            >
                X
            </button>
            <Form method="POST" className="update-bio-form" ref={bioForm}>
                <h3 className="update-bio-form-heading">Update Profile Bio:</h3>
                <label htmlFor="update-bio-input">
                    New Bio (120 characters max):
                </label>
                <textarea
                    id="update-bio-input"
                    name="bio-content"
                    maxLength={120}
                    minLength={4}
                    rows={5}
                    cols={30}
                ></textarea>
                <button
                    type="submit"
                    className="button"
                    onClick={() => {
                        bioUpdated();
                    }}
                >
                    Submit
                </button>
            </Form>
        </dialog>
    );
}
