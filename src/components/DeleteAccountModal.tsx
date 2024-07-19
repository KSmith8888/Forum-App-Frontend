import { useRef, useEffect } from "react";
import { Form } from "react-router-dom";

interface profileDeleteProps {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (value: boolean) => void;
}

export default function DeleteAccountModal({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
}: profileDeleteProps) {
    const deleteModal = useRef<HTMLDialogElement>(null);
    const deleteForm = useRef<HTMLFormElement>(null);
    const deleteCloseBtn = useRef<HTMLButtonElement>(null);
    function closeModal() {
        if (deleteModal.current) {
            deleteModal.current.close();
        }
        setIsDeleteModalOpen(false);
    }
    useEffect(() => {
        if (
            isDeleteModalOpen &&
            deleteModal.current &&
            deleteCloseBtn.current
        ) {
            deleteModal.current.showModal();
            deleteCloseBtn.current.focus();
        }
    }, [isDeleteModalOpen]);

    return (
        <dialog className="profile-delete-modal" ref={deleteModal}>
            <button
                className="close-modal-button"
                aria-label="Close delete profile modal"
                ref={deleteCloseBtn}
                onClick={() => {
                    closeModal();
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
                    Are you sure you want to delete your account? This action is
                    permanent and cannot be undone.
                </p>
                <input
                    type="hidden"
                    name="delete-account"
                    value="delete-account"
                />
                <button type="submit" className="button">
                    Delete
                </button>
            </Form>
        </dialog>
    );
}
