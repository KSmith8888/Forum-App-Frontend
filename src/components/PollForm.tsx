import { Form } from "react-router-dom";

import { pollData } from "../utils/interfaces";

export default function PollForm({ options }: pollData) {
    return (
        <Form method="POST" className="poll-form">
            <div className="poll-options-container">
                <div className="poll-option">
                    <label className="poll-option-label">
                        {options[0].option}
                        <input
                            type="radio"
                            name="poll-vote"
                            value={options[0].option}
                        />
                    </label>
                    <p className="poll-vote-text">Total: {options[0].votes}</p>
                </div>
                <div className="poll-option">
                    <label className="poll-option-label">
                        {options[1].option}
                        <input
                            type="radio"
                            name="poll-vote"
                            value={options[1].option}
                        />
                    </label>
                    <p className="poll-vote-text">Total: {options[1].votes}</p>
                </div>
                {options.length >= 3 && (
                    <div className="poll-option">
                        <label className="poll-option-label">
                            {options[2].option}
                            <input
                                type="radio"
                                name="poll-vote"
                                value={options[2].option}
                            />
                        </label>
                        <p className="poll-vote-text">
                            Total: {options[2].votes}
                        </p>
                    </div>
                )}
                {options.length === 4 && (
                    <div className="poll-option">
                        <label className="poll-option-label">
                            {options[3].option}
                            <input
                                type="radio"
                                name="poll-vote"
                                value={options[3].option}
                            />
                        </label>
                        <p className="poll-vote-text">
                            Total: {options[3].votes}
                        </p>
                    </div>
                )}
            </div>
            <button type="submit" className="button">
                Vote
            </button>
        </Form>
    );
}
