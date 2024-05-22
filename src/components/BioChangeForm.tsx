import { useRef, useEffect } from "react";
import { Form } from "react-router-dom";

interface profileBioProps {
    isBioModalOpen: boolean;
    setIsBioModalOpen: (value: boolean) => void;
}

export default function BioChangeForm({
    isBioModalOpen,
    setIsBioModalOpen,
}: profileBioProps) {
    const bioModal = useRef<HTMLDialogElement>(null);
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
    return (
        <dialog className="profile-bio-modal" ref={bioModal}>
            <Form method="POST">
                <h3>Update Profile Bio:</h3>
                <label htmlFor="update-bio-input">New Bio:</label>
                <textarea
                    id="update-bio-input"
                    name="bio-content"
                    maxLength={120}
                    minLength={4}
                    rows={6}
                    cols={40}
                ></textarea>
                <input type="hidden" name="bio" value="bio" />
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
            <button
                className="button"
                type="button"
                onClick={() => {
                    setIsBioModalOpen(false);
                    if (bioModal.current) {
                        bioModal.current.close();
                    }
                }}
            >
                Close
            </button>
        </dialog>
    );
}
