import { useRef } from "react";
import { Form } from "react-router-dom";

import { profileBioProps } from "../utils/interfaces.ts";

export default function BioChangeForm({ profileBio }: profileBioProps) {
    const bioModal = useRef<HTMLDialogElement>(null);
    const bioForm = useRef<HTMLFormElement>(null);
    return (
        <>
            <h4 className="profile-bio-heading">Profile Bio:</h4>
            <p className="profile-bio-text">{profileBio}</p>
            <button
                className="button"
                onClick={() => {
                    if (bioModal.current) {
                        bioModal.current.showModal();
                    }
                }}
            >
                Update
            </button>
            <dialog className="profile-bio-modal" ref={bioModal}>
                <button
                    className="close-modal-button"
                    type="button"
                    aria-label="Close update bio form"
                    onClick={() => {
                        if (bioModal.current) {
                            bioModal.current.close();
                        }
                    }}
                >
                    X
                </button>
                <Form method="POST" className="update-bio-form" ref={bioForm}>
                    <h3 className="update-bio-form-heading">
                        Update Profile Bio:
                    </h3>
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
                        required
                        autoFocus
                    ></textarea>
                    <button
                        type="submit"
                        className="button"
                        onClick={() => {
                            if (bioModal.current) {
                                bioModal.current.close();
                            }
                        }}
                    >
                        Submit
                    </button>
                </Form>
            </dialog>
        </>
    );
}
