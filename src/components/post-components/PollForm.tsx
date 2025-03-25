import { Form, useOutletContext } from "react-router";

import { pollData, outletInterface } from "../../utils/interfaces";

export default function PollForm({ options, postId }: pollData) {
    const { isUserLoggedIn } = useOutletContext<outletInterface>();
    let highestTotal = 1;
    options.forEach((option) => {
        if (option.votes > highestTotal) {
            highestTotal = option.votes;
        }
    });
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
                            <div className="poll-vote-text-container">
                                <p className="poll-vote-text">
                                    Total: {options[0].votes}
                                </p>
                                <meter
                                    className="poll-meter"
                                    min={0}
                                    max={highestTotal}
                                    value={options[0].votes}
                                >
                                    {options[0].votes}
                                </meter>
                            </div>
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
                            <div className="poll-vote-text-container">
                                <p className="poll-vote-text">
                                    Total: {options[1].votes}
                                </p>
                                <meter
                                    className="poll-meter"
                                    min={0}
                                    max={highestTotal}
                                    value={options[1].votes}
                                >
                                    {options[1].votes}
                                </meter>
                            </div>
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
                                <div className="poll-vote-text-container">
                                    <p className="poll-vote-text">
                                        Total: {options[2].votes}
                                    </p>
                                    <meter
                                        className="poll-meter"
                                        min={0}
                                        max={highestTotal}
                                        value={options[2].votes}
                                    >
                                        {options[2].votes}
                                    </meter>
                                </div>
                            </div>
                        )}
                        {options.length >= 4 && (
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
                                <div className="poll-vote-text-container">
                                    <p className="poll-vote-text">
                                        Total: {options[3].votes}
                                    </p>
                                    <meter
                                        className="poll-meter"
                                        min={0}
                                        max={highestTotal}
                                        value={options[3].votes}
                                    >
                                        {options[3].votes}
                                    </meter>
                                </div>
                            </div>
                        )}
                        {options.length >= 5 && (
                            <div className="poll-option">
                                <label className="poll-option-label">
                                    <input
                                        className="poll-option-input"
                                        type="radio"
                                        name="poll-vote"
                                        value="4"
                                    />
                                    {options[4].option}
                                </label>
                                <div className="poll-vote-text-container">
                                    <p className="poll-vote-text">
                                        Total: {options[4].votes}
                                    </p>
                                    <meter
                                        className="poll-meter"
                                        min={0}
                                        max={highestTotal}
                                        value={options[4].votes}
                                    >
                                        {options[4].votes}
                                    </meter>
                                </div>
                            </div>
                        )}
                        {options.length === 6 && (
                            <div className="poll-option">
                                <label className="poll-option-label">
                                    <input
                                        className="poll-option-input"
                                        type="radio"
                                        name="poll-vote"
                                        value="5"
                                    />
                                    {options[5].option}
                                </label>
                                <div className="poll-vote-text-container">
                                    <p className="poll-vote-text">
                                        Total: {options[5].votes}
                                    </p>
                                    <meter
                                        className="poll-meter"
                                        min={0}
                                        max={highestTotal}
                                        value={options[5].votes}
                                    >
                                        {options[5].votes}
                                    </meter>
                                </div>
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
                <div className="poll-options-guest-container">
                    <div className="poll-option">
                        <p className="poll-guest-text">{options[0].option}</p>
                        <div className="poll-vote-text-container">
                            <p className="poll-vote-text">
                                Total: {options[0].votes}
                            </p>
                            <meter
                                className="poll-meter"
                                min={0}
                                max={highestTotal}
                                value={options[0].votes}
                            >
                                {options[0].votes}
                            </meter>
                        </div>
                    </div>
                    <div className="poll-option">
                        <p className="poll-guest-text">{options[1].option}</p>
                        <div className="poll-vote-text-container">
                            <p className="poll-vote-text">
                                Total: {options[1].votes}
                            </p>
                            <meter
                                className="poll-meter"
                                min={0}
                                max={highestTotal}
                                value={options[1].votes}
                            >
                                {options[1].votes}
                            </meter>
                        </div>
                    </div>
                    {options.length >= 3 && (
                        <div className="poll-option">
                            <p className="poll-guest-text">
                                {options[2].option}
                            </p>
                            <div className="poll-vote-text-container">
                                <p className="poll-vote-text">
                                    Total: {options[2].votes}
                                </p>
                                <meter
                                    className="poll-meter"
                                    min={0}
                                    max={highestTotal}
                                    value={options[2].votes}
                                >
                                    {options[2].votes}
                                </meter>
                            </div>
                        </div>
                    )}
                    {options.length >= 4 && (
                        <div className="poll-option">
                            <p className="poll-guest-text">
                                {options[3].option}
                            </p>
                            <div className="poll-vote-text-container">
                                <p className="poll-vote-text">
                                    Total: {options[3].votes}
                                </p>
                                <meter
                                    className="poll-meter"
                                    min={0}
                                    max={highestTotal}
                                    value={options[3].votes}
                                >
                                    {options[3].votes}
                                </meter>
                            </div>
                        </div>
                    )}
                    {options.length >= 5 && (
                        <div className="poll-option">
                            <p className="poll-guest-text">
                                {options[4].option}
                            </p>
                            <div className="poll-vote-text-container">
                                <p className="poll-vote-text">
                                    Total: {options[4].votes}
                                </p>
                                <meter
                                    className="poll-meter"
                                    min={0}
                                    max={highestTotal}
                                    value={options[4].votes}
                                >
                                    {options[4].votes}
                                </meter>
                            </div>
                        </div>
                    )}
                    {options.length === 6 && (
                        <div className="poll-option">
                            <p className="poll-guest-text">
                                {options[5].option}
                            </p>
                            <div className="poll-vote-text-container">
                                <p className="poll-vote-text">
                                    Total: {options[5].votes}
                                </p>
                                <meter
                                    className="poll-meter"
                                    min={0}
                                    max={highestTotal}
                                    value={options[5].votes}
                                >
                                    {options[5].votes}
                                </meter>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
