import { useRef, useEffect, useState } from "react";
import { useOutletContext, Form } from "react-router-dom";

import { outletInterface, picSelectorProps } from "../utils/interfaces.ts";
import PicSelectorButton from "./PicSelectorButton.tsx";

export default function ProfilePicSelector({
    isPicModalOpen,
    setIsPicModalOpen,
}: picSelectorProps) {
    const { profilePic } = useOutletContext<outletInterface>();
    const [currentImage, setCurrentImage] = useState(profilePic.name);
    const [currentAlt, setCurrentAlt] = useState(profilePic.alt);
    const picModal = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (picModal.current) {
            if (isPicModalOpen) {
                picModal.current.showModal();
            } else {
                picModal.current.close();
            }
        }
    }, [isPicModalOpen]);

    return (
        <dialog className="profile-image-modal" ref={picModal}>
            <button
                className="close-modal-button"
                aria-label="Close profile image form"
                type="button"
                onClick={() => {
                    setIsPicModalOpen(false);
                    if (picModal.current) {
                        picModal.current.close();
                        setCurrentImage(profilePic.name);
                        setCurrentAlt(profilePic.alt);
                    }
                }}
            >
                X
            </button>
            <Form method="POST" id="profile-image-form">
                <h3
                    className="profile-pic-modal-heading"
                    id="profile-pic-modal-heading"
                >
                    Select a Profile Picture:
                </h3>
                <div className="profile-image-grid">
                    <div className="profile-image-grid-row">
                        <PicSelectorButton
                            imageName="blank.png"
                            imageAlt="A generic, blank outline of a mans upper body"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Default"
                        />
                        <PicSelectorButton
                            imageName="apple.jpg"
                            imageAlt="A red apple with sunlit trees in the background"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Apple"
                        />
                        <PicSelectorButton
                            imageName="coffee.jpg"
                            imageAlt="A white mug filled with coffee, surrounded by coffee beans"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Coffee"
                        />
                    </div>
                    <div className="profile-image-grid-row">
                        <PicSelectorButton
                            imageName="tree.jpg"
                            imageAlt="A green tree in an open field of grass, with hazy sky in the background"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Tree"
                        />
                        <PicSelectorButton
                            imageName="guitar.jpg"
                            imageAlt="A black, brown and white electric guitar, tilted diagonally"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Guitar"
                        />
                        <PicSelectorButton
                            imageName="iced-tea.jpg"
                            imageAlt="A clear glass filled with iced tea, with two lemons next to it"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Iced Tea"
                        />
                    </div>
                    <div className="profile-image-grid-row">
                        <PicSelectorButton
                            imageName="laptop.jpg"
                            imageAlt="A grey and black laptop computer, displaying various charts and graphs"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Laptop"
                        />
                        <PicSelectorButton
                            imageName="boat.jpg"
                            imageAlt="A white yacht on a blue body of water with clear sky in the background"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Boat"
                        />
                        <PicSelectorButton
                            imageName="globe.jpg"
                            imageAlt="A globe of the Earth sitting on a dark brown desk"
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            setCurrentAlt={setCurrentAlt}
                            labelText="Globe"
                        />
                    </div>
                </div>
                <input type="hidden" name="pfp-alt" value={currentAlt} />
                <button type="submit" className="button">
                    Submit
                </button>
            </Form>
        </dialog>
    );
}
