import { Form, useOutletContext } from "react-router";

import PollOption from "./PollOption";
import PollResults from "./PollResults";

import { pollData, outletInterface } from "../../utils/interfaces";

export default function PollForm({ options, postId }: pollData) {
    const { isUserLoggedIn } = useOutletContext<outletInterface>();
    let highestTotal = 1;
    options.forEach((option) => {
        if (option.votes > highestTotal) {
            highestTotal = option.votes;
        }
    });

    const pollOptions = options.map((data, index) => {
        return (
            <PollOption
                key={index}
                index={index}
                highestTotal={highestTotal}
                option={data.option}
                votes={data.votes}
            />
        );
    });
    const pollResults = options.map((data, index) => {
        return (
            <PollResults
                key={index}
                index={index}
                highestTotal={highestTotal}
                option={data.option}
                votes={data.votes}
            />
        );
    });
    return (
        <>
            <div className="poll-results-container">{pollResults}</div>
            {isUserLoggedIn && (
                <Form method="POST" className="poll-form">
                    <input type="hidden" value={postId} name="poll-post-id" />
                    <div className="poll-options-container">{pollOptions}</div>
                    <button
                        type="submit"
                        className="button"
                        id="poll-submit-button"
                    >
                        Vote
                    </button>
                </Form>
            )}
        </>
    );
}
