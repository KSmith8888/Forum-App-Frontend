import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function NsfwModal() {
    const nsfwModal = useRef<HTMLDialogElement>(null);
    const viewNsfwSetting = sessionStorage.getItem("view-nsfw");
    const navigate = useNavigate();
    useEffect(() => {
        if (!viewNsfwSetting && nsfwModal.current) {
            nsfwModal.current.showModal();
        }
    }, []);
    return (
        <dialog
            className="nsfw-modal"
            ref={nsfwModal}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    navigate("/");
                }
            }}
        >
            <p className="nsfw-modal-text">
                This post may contain mature or objectionable content.
            </p>
            <p className="nsfw-modal-text">
                Are you over 18 and do you still want to view this content?
            </p>
            <div className="button-row">
                <button
                    type="button"
                    className="button"
                    autoFocus
                    onClick={() => {
                        if (nsfwModal.current) {
                            nsfwModal.current.close();
                        }
                    }}
                >
                    Yes
                </button>
                <Link to="/" className="button-link">
                    No
                </Link>
            </div>
        </dialog>
    );
}
