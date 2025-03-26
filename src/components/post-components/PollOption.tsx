import { pollOptionProps } from "../../utils/interfaces";

export default function PollOption({
    index,
    highestTotal,
    option,
    votes,
}: pollOptionProps) {
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
            <div className="poll-vote-text-container">
                <p className="poll-vote-text">Total: {votes}</p>
                <meter
                    className="poll-meter"
                    min={0}
                    max={highestTotal}
                    value={votes}
                >
                    {votes}
                </meter>
            </div>
        </div>
    );
}
