import { useRef, useEffect, useState } from "react";

import { updateProfilePic } from "../utils/pfp.ts";
import { profilePicInterface } from "../utils/interfaces.ts";

interface profilePicProps {
    isPicModalOpen: boolean;
    setIsPicModalOpen: (value: boolean) => void;
    profilePic: profilePicInterface;
    setProfilePic: (profilePic: profilePicInterface) => void;
}

export default function ProfilePicSelector({
    isPicModalOpen,
    setIsPicModalOpen,
    profilePic,
    setProfilePic,
}: profilePicProps) {
    const picModal = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (isPicModalOpen && picModal.current) {
            picModal.current.showModal();
        }
    }, [isPicModalOpen]);
    const [profilePicErrorMsg, setProfilePicErrorMsg] = useState("");

    async function handlePicUpdate(newPicInfo: profilePicInterface) {
        const picUpdateData: Error | Response = await updateProfilePic(
            newPicInfo
        );
        if (picUpdateData instanceof Error) {
            setProfilePicErrorMsg(picUpdateData.message);
        } else {
            localStorage.setItem("profileImageName", newPicInfo.name);
            localStorage.setItem("profileImageAlt", newPicInfo.alt);
            setProfilePic(newPicInfo);
            setIsPicModalOpen(false);
            if (picModal.current) {
                picModal.current.close();
            }
        }
    }

    return (
        <dialog className="profile-image-modal" ref={picModal}>
            <div className="profile-image-grid">
                <img
                    src="/profile-images/blank.png"
                    alt="A generic blank avatar image of a mans head"
                    role="button"
                    className={`profile-image-grid-item ${
                        profilePic.name === "blank.png"
                            ? "profile-image-selected"
                            : ""
                    }`}
                    onClick={() => {
                        handlePicUpdate({
                            name: "blank.png",
                            alt: "A generic blank avatar image of a mans head",
                        });
                    }}
                />
                <img
                    src="/profile-images/apple.jpg"
                    alt="A red apple with sunlit trees in the background"
                    role="button"
                    className={`profile-image-grid-item ${
                        profilePic.name === "apple.jpg"
                            ? "profile-image-selected"
                            : ""
                    }`}
                    onClick={() => {
                        handlePicUpdate({
                            name: "apple.jpg",
                            alt: "A red apple with sunlit trees in the background",
                        });
                    }}
                />
            </div>
            <p className="error-message">{profilePicErrorMsg}</p>

            <button
                className="button"
                type="button"
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
