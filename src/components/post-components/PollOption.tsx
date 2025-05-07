import { pollOptionProps } from "../../utils/interfaces";

export default function PollOption({ index, option }: pollOptionProps) {
    return (
        <div className="poll-option">
            <label className="poll-option-label">
                <input
                    className="poll-option-input"
                    type="radio"
                    name="poll-vote"
                    value={index}
                    required
                />
                {option}
            </label>
        </div>
    );
}
