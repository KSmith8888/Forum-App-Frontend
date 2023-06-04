import { useRef, useEffect } from "react";

interface profilePicInterface {
    profilePic: string;
    setProfilePic: (newPic: string) => void;
    isPicModalOpen: boolean;
    setIsPicModalOpen: (value: boolean) => void;
}

export default function ProfilePicSelector({
    setProfilePic,
    profilePic,
    isPicModalOpen,
    setIsPicModalOpen,
}: profilePicInterface) {
    const picModal = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (isPicModalOpen && picModal.current) {
            picModal.current.showModal();
        }
    }, [isPicModalOpen]);

    return (
        <dialog className="profile-image-modal" ref={picModal}>
            <div className="profile-image-grid">
                <img
                    src="/profile-images/blank.png"
                    alt="A generic blank avatar image of a mans head"
                    className={
                        profilePic === "blank.png"
                            ? "profile-image-selected"
                            : "profile-image-grid-item"
                    }
                    onClick={() => {
                        setProfilePic("blank.png");
                    }}
                />
                <img
                    src="/profile-images/apple.jpg"
                    alt="A red apple with sunlit trees in the background"
                    className={
                        profilePic === "apple.jpg"
                            ? "profile-image-selected"
                            : "profile-image-grid-item"
                    }
                    onClick={() => {
                        setProfilePic("apple.jpg");
                    }}
                />
            </div>
            <form>
                <input type="hidden" name="filename" value={profilePic} />
                <button type="submit" className="button">
                    Update
                </button>
            </form>
            <button
                className="button"
                onClick={() => {
                    setIsPicModalOpen(false);
                    if (picModal.current) {
                        picModal.current.close();
                    }
                }}
            >
                Close
            </button>
        </dialog>
    );
}
