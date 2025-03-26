import { pollOptionProps } from "../../utils/interfaces";

export default function GuestOption({
    highestTotal,
    option,
    votes,
}: pollOptionProps) {
    return (
        <div className="poll-option">
            <p className="poll-guest-text">{option}</p>
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
