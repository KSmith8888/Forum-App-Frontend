import { createDateString } from "../utils/create-date-string.ts";

interface postHistoryProps {
    key: string;
    timestamp: string;
    title: string;
    content: string;
}

export default function PostHistory({
    timestamp,
    content,
    title,
}: postHistoryProps) {
    const prevPostDateString = createDateString(timestamp, "Posted");
    return (
        <article className="previous-post">
            <h4 className="previous-post-title">{title}</h4>
            <p className="previous-post-content">{content}</p>
            <p className="previous-post-time">{prevPostDateString}</p>
        </article>
    );
}
