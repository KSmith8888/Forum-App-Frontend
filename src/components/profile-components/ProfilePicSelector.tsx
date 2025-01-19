import { useRef, useState } from "react";
import { useOutletContext, Form } from "react-router";

import { outletInterface } from "../../utils/interfaces.ts";
import PicSelectorButton from "./PicSelectorButton.tsx";

export default function ProfilePicSelector() {
    const { profilePic } = useOutletContext<outletInterface>();
    const [currentInfo, setCurrentInfo] = useState(profilePic);
    const picModal = useRef<HTMLDialogElement>(null);

    return (
        <>
            <button
                onClick={() => {
                    if (picModal.current) {
                        picModal.current.showModal();
                    }
                }}
                className="button"
            >
                Update
            </button>
            <dialog className="profile-image-modal" ref={picModal}>
                <button
                    className="close-modal-button"
                    aria-label="Close profile image form"
                    type="button"
                    onClick={() => {
                        if (picModal.current) {
                            picModal.current.close();
                            setCurrentInfo({
                                name: profilePic.name,
                                alt: profilePic.alt,
                            });
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
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Default"
                            />
                            <PicSelectorButton
                                imageName="apple.jpg"
                                imageAlt="A red apple with sunlit trees in the background"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Apple"
                            />
                            <PicSelectorButton
                                imageName="coffee.jpg"
                                imageAlt="A white mug filled with coffee, surrounded by coffee beans"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Coffee"
                            />
                        </div>
                        <div className="profile-image-grid-row">
                            <PicSelectorButton
                                imageName="tree.jpg"
                                imageAlt="A green tree in an open field of grass, with hazy sky in the background"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Tree"
                            />
                            <PicSelectorButton
                                imageName="guitar.jpg"
                                imageAlt="A black, brown and white electric guitar, tilted diagonally"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Guitar"
                            />
                            <PicSelectorButton
                                imageName="iced-tea.jpg"
                                imageAlt="A clear glass filled with iced tea, with two lemons next to it"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Iced Tea"
                            />
                        </div>
                        <div className="profile-image-grid-row">
                            <PicSelectorButton
                                imageName="laptop.jpg"
                                imageAlt="A grey and black laptop computer, displaying various charts and graphs"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Laptop"
                            />
                            <PicSelectorButton
                                imageName="boat.jpg"
                                imageAlt="A white yacht on a blue body of water with clear sky in the background"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Boat"
                            />
                            <PicSelectorButton
                                imageName="globe.jpg"
                                imageAlt="A globe of the Earth sitting on a dark brown desk"
                                currentInfo={currentInfo}
                                setCurrentInfo={setCurrentInfo}
                                labelText="Globe"
                            />
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name="pfp-alt"
                        value={currentInfo.alt}
                    />
                    <button
                        type="submit"
                        className="button"
                        onClick={() => {
                            if (picModal.current) {
                                picModal.current.close();
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
