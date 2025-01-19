import { picSelectorBtnProps } from "../../utils/interfaces.ts";

export default function PicSelectorButton({
    currentInfo,
    setCurrentInfo,
    imageName,
    imageAlt,
    labelText,
}: picSelectorBtnProps) {
    return (
        <label
            className="pfp-image-label"
            onClick={() => {
                setCurrentInfo({ name: imageName, alt: imageAlt });
            }}
        >
            <img
                src={`/profile-images/${imageName}`}
                alt={imageAlt}
                className={`profile-image-grid-item ${
                    currentInfo.name === imageName
                        ? "profile-image-selected"
                        : ""
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
