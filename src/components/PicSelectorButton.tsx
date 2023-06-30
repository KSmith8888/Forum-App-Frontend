import { profilePicInterface } from "../utils/interfaces";

type picSelectorProps = {
    handlePicUpdate: ({ name, alt }: { name: string; alt: string }) => void;
    name: string;
    alt: string;
    profilePic: profilePicInterface;
};

export default function PicSelectorButton({
    handlePicUpdate,
    name,
    alt,
    profilePic,
}: picSelectorProps) {
    return (
        <button
            type="button"
            className="profile-image-button"
            onClick={() => {
                handlePicUpdate({
                    name: name,
                    alt: alt,
                });
            }}
        >
            <img
                src={`/profile-images/${name}`}
                alt={alt}
                className={`profile-image-grid-item ${
                    profilePic.name === name ? "profile-image-selected" : ""
                }`}
            />
        </button>
    );
}
