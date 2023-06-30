import { useRef, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { updateProfilePic } from "../utils/pfp.ts";
import { profilePicInterface, outletInterface } from "../utils/interfaces.ts";
import PicSelectorButton from "../components/PicSelectorButton.tsx";

interface profilePicProps {
    isPicModalOpen: boolean;
    setIsPicModalOpen: (value: boolean) => void;
}

export default function ProfilePicSelector({
    isPicModalOpen,
    setIsPicModalOpen,
}: profilePicProps) {
    const { profilePic, setProfilePic } = useOutletContext<outletInterface>();
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
            <h3>Select a profile picture:</h3>
            <div className="profile-image-grid">
                <PicSelectorButton
                    handlePicUpdate={handlePicUpdate}
                    name="blank.png"
                    alt="A generic, blank outline of a mans upper body"
                    profilePic={profilePic}
                />
                <PicSelectorButton
                    handlePicUpdate={handlePicUpdate}
                    name="apple.jpg"
                    alt="A red apple with sunlit trees in the background"
                    profilePic={profilePic}
                />
                <PicSelectorButton
                    handlePicUpdate={handlePicUpdate}
                    name="coffee.jpg"
                    alt="A white mug filled with coffee, surrounded by coffee beans"
                    profilePic={profilePic}
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
