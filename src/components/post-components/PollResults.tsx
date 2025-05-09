import { pollOptionProps } from "../../utils/interfaces";

export default function PollResults({
    highestTotal,
    option,
    votes,
}: pollOptionProps) {
    return (
        <div className="poll-result-text-container">
            <p className="poll-result-text">
                {option}
                <span className="poll-result-total">Total: {votes}</span>
            </p>
            <meter
                className="poll-meter"
                min={0}
                max={highestTotal}
                value={votes}
            >
                {votes}
            </meter>
        </div>
    );
}
