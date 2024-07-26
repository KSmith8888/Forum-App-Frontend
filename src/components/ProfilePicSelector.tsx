import { useRef, useEffect, useState } from "react";
import { useOutletContext, Form } from "react-router-dom";

import { outletInterface } from "../utils/interfaces.ts";

interface profilePicProps {
    isPicModalOpen: boolean;
    setIsPicModalOpen: (value: boolean) => void;
}

export default function ProfilePicSelector({
    isPicModalOpen,
    setIsPicModalOpen,
}: profilePicProps) {
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
                type="button"
                onClick={() => {
                    setIsPicModalOpen(false);
                    if (picModal.current) {
                        picModal.current.close();
                    }
                }}
            >
                X
            </button>
            <h3 className="profile-pic-modal-heading">
                Select a Profile Picture:
            </h3>
            <Form method="POST" id="profile-image-form">
                <div className="profile-image-grid">
                    <div className="profile-image-grid-row">
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("blank.png");
                                setCurrentAlt(
                                    "A generic, blank outline of a mans upper body"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/blank.png"
                                alt="A generic, blank outline of a mans upper body"
                                className={`profile-image-grid-item ${
                                    currentImage === "blank.png"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="blank.png"
                                className="pfp-selector-input"
                            />
                            Default
                        </label>
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("apple.jpg");
                                setCurrentAlt(
                                    "A red apple with sunlit trees in the background"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/apple.jpg"
                                alt="A red apple with sunlit trees in the background"
                                className={`profile-image-grid-item ${
                                    currentImage === "apple.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="apple.jpg"
                                className="pfp-selector-input"
                            />
                            Apple
                        </label>
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("coffee.jpg");
                                setCurrentAlt(
                                    "A white mug filled with coffee, surrounded by coffee beans"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/coffee.jpg"
                                alt="A white mug filled with coffee, surrounded by coffee beans"
                                className={`profile-image-grid-item ${
                                    currentImage === "coffee.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="coffee.jpg"
                                className="pfp-selector-input"
                            />
                            Coffee
                        </label>
                    </div>
                    <div className="profile-image-grid-row">
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("tree.jpg");
                                setCurrentAlt(
                                    "A green tree in an open field of grass, with hazy sky in the background"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/tree.jpg"
                                alt="A green tree in an open field of grass, with hazy sky in the background"
                                className={`profile-image-grid-item ${
                                    currentImage === "tree.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="tree.jpg"
                                className="pfp-selector-input"
                            />
                            Tree
                        </label>
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("guitar.jpg");
                                setCurrentAlt(
                                    "A black, brown and white electric guitar, tilted diagonally"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/guitar.jpg"
                                alt="A black, brown and white electric guitar, tilted diagonally"
                                className={`profile-image-grid-item ${
                                    currentImage === "guitar.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="guitar.jpg"
                                className="pfp-selector-input"
                            />
                            Guitar
                        </label>
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("iced-tea.jpg");
                                setCurrentAlt(
                                    "A clear glass filled with iced tea, with two lemons next to it"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/iced-tea.jpg"
                                alt="A clear glass filled with iced tea, with two lemons next to it"
                                className={`profile-image-grid-item ${
                                    currentImage === "iced-tea.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="iced-tea.jpg"
                                className="pfp-selector-input"
                            />
                            Iced Tea
                        </label>
                    </div>
                    <div className="profile-image-grid-row">
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("laptop.jpg");
                                setCurrentAlt(
                                    "A grey and black laptop computer, displaying various charts and graphs"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/laptop.jpg"
                                alt="A grey and black laptop computer, displaying various charts and graphs"
                                className={`profile-image-grid-item ${
                                    currentImage === "laptop.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="laptop.jpg"
                                className="pfp-selector-input"
                            />
                            Laptop
                        </label>
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("boat.jpg");
                                setCurrentAlt(
                                    "A white yacht on a blue body of water with clear sky in the background"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/boat.jpg"
                                alt="A white yacht on a blue body of water with clear sky in the background"
                                className={`profile-image-grid-item ${
                                    currentImage === "boat.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="boat.jpg"
                                className="pfp-selector-input"
                            />
                            Boat
                        </label>
                        <label
                            className="pfp-image-label"
                            onClick={() => {
                                setCurrentImage("globe.jpg");
                                setCurrentAlt(
                                    "A globe of the Earth sitting on a dark brown desk"
                                );
                            }}
                        >
                            <img
                                src="/profile-images/globe.jpg"
                                alt="A globe of the Earth sitting on a dark brown desk"
                                className={`profile-image-grid-item ${
                                    currentImage === "globe.jpg"
                                        ? "profile-image-selected"
                                        : ""
                                }`}
                            />
                            <input
                                type="radio"
                                name="pfp"
                                value="globe.jpg"
                                className="pfp-selector-input"
                            />
                            Globe
                        </label>
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
