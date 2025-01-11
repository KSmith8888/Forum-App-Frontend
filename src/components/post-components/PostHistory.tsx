import { createDateString } from "../../utils/create-date-string.ts";

import { postHistoryInterface } from "../../utils/interfaces.ts";

export default function PostHistory({
    timestamp,
    content,
}: postHistoryInterface) {
    const prevPostDateString = createDateString(timestamp, "Posted");
    return (
        <article className="previous-post">
            <p className="previous-post-content">{content}</p>
            <p className="previous-post-time">{prevPostDateString}</p>
        </article>
    );
}
