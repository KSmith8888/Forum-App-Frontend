import { picSelectorBtnProps } from "../../utils/interfaces.ts";

export default function PicSelectorButton({
    currentImage,
    setCurrentImage,
    setCurrentAlt,
    imageName,
    imageAlt,
    labelText,
}: picSelectorBtnProps) {
    return (
        <label
            className="pfp-image-label"
            onClick={() => {
                setCurrentImage(imageName);
                setCurrentAlt(imageAlt);
            }}
        >
            <img
                src={`/profile-images/${imageName}`}
                alt={imageAlt}
                className={`profile-image-grid-item ${
                    currentImage === imageName ? "profile-image-selected" : ""
                }`}
            />
            <input
                type="radio"
                name="pfp"
                value={imageName}
                className="pfp-selector-input"
            />
            {labelText}
        </label>
    );
}
