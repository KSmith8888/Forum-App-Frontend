import { useRef } from "react";
import { Form } from "react-router";

export default function DeleteAccountModal({}) {
    const deleteModal = useRef<HTMLDialogElement>(null);
    const deleteForm = useRef<HTMLFormElement>(null);
    const deleteCloseBtn = useRef<HTMLButtonElement>(null);

    return (
        <>
            <h3 className="delete-account-heading">Delete Account:</h3>
            <p className="warning-message">
                This action will delete your account, along with all of your
                posts and comments
            </p>
            <button
                className="delete-account-button"
                onClick={() => {
                    if (deleteModal.current) {
                        deleteModal.current.showModal();
                    }
                }}
            >
                Delete
            </button>
            <dialog className="profile-delete-modal" ref={deleteModal}>
                <button
                    className="close-modal-button"
                    aria-label="Close delete profile modal"
                    ref={deleteCloseBtn}
                    onClick={() => {
                        if (deleteModal.current) {
                            deleteModal.current.close();
                        }
                    }}
                >
                    X
                </button>
                <Form
                    method="DELETE"
                    className="delete-profile-form"
                    ref={deleteForm}
                >
                    <h3 className="profile-delete-heading">Delete Account</h3>
                    <p className="delete-profile-form-text">
                        Are you sure you want to delete your account? This
                        action is permanent and cannot be undone.
                    </p>
                    <input
                        type="hidden"
                        name="delete-account"
                        value="delete-account"
                    />
                    <button
                        type="submit"
                        className="button"
                        onClick={() => {
                            if (deleteModal.current) {
                                deleteModal.current.close();
                            }
                        }}
                    >
                        Delete
                    </button>
                </Form>
            </dialog>
        </>
    );
}
