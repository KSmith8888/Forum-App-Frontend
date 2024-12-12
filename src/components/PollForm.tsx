import { Form, useOutletContext } from "react-router-dom";

import { pollData, outletInterface } from "../utils/interfaces";

export default function PollForm({ options, postId }: pollData) {
    const { isUserLoggedIn } = useOutletContext<outletInterface>();
    return (
        <>
            {isUserLoggedIn ? (
                <Form method="POST" className="poll-form">
                    <input type="hidden" value={postId} name="poll-post-id" />
                    <div className="poll-options-container">
                        <div className="poll-option">
                            <label className="poll-option-label">
                                <input
                                    className="poll-option-input"
                                    type="radio"
                                    name="poll-vote"
                                    value="0"
                                    required
                                />
                                {options[0].option}
                            </label>
                            <p className="poll-vote-text">
                                Total: {options[0].votes}
                            </p>
                        </div>
                        <div className="poll-option">
                            <label className="poll-option-label">
                                <input
                                    className="poll-option-input"
                                    type="radio"
                                    name="poll-vote"
                                    value="1"
                                />
                                {options[1].option}
                            </label>
                            <p className="poll-vote-text">
                                Total: {options[1].votes}
                            </p>
                        </div>
                        {options.length >= 3 && (
                            <div className="poll-option">
                                <label className="poll-option-label">
                                    <input
                                        className="poll-option-input"
                                        type="radio"
                                        name="poll-vote"
                                        value="2"
                                    />
                                    {options[2].option}
                                </label>
                                <p className="poll-vote-text">
                                    Total: {options[2].votes}
                                </p>
                            </div>
                        )}
                        {options.length === 4 && (
                            <div className="poll-option">
                                <label className="poll-option-label">
                                    <input
                                        className="poll-option-input"
                                        type="radio"
                                        name="poll-vote"
                                        value="3"
                                    />
                                    {options[3].option}
                                </label>
                                <p className="poll-vote-text">
                                    Total: {options[3].votes}
                                </p>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="button"
                        id="poll-submit-button"
                    >
                        Vote
                    </button>
                </Form>
            ) : (
                <div className="poll-guest-container">
                    <p className="poll-guest-text">
                        {options[0].option}
                        <span className="poll-guest-votes">
                            Total: {options[0].votes}
                        </span>
                    </p>
                    <p className="poll-guest-text">
                        {options[1].option}
                        <span className="poll-guest-votes">
                            Total: {options[1].votes}
                        </span>
                    </p>
                    {options.length >= 3 && (
                        <p className="poll-guest-text">
                            {options[2].option}
                            <span className="poll-guest-votes">
                                Total: {options[2].votes}
                            </span>
                        </p>
                    )}
                    {options.length === 4 && (
                        <p className="poll-guest-text">
                            {options[3].option}
                            <span className="poll-guest-votes">
                                Total: {options[3].votes}
                            </span>
                        </p>
                    )}
                </div>
            )}
        </>
    );
}
