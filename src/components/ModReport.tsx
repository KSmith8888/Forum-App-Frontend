import { Link, Form } from "react-router-dom";

import { reportInterface } from "../utils/interfaces.ts";
import { createDateString } from "../utils/create-date-string.ts";
import clipboardImg from "../assets/images/clipboard-icon.png";

interface modReportInterface {
    key: string;
    report: reportInterface;
}

export default function ModReport({ report }: modReportInterface) {
    const linkId =
        report.messageType === "Post"
            ? report.messageId
            : `${report.relatedPost}?commentId=${report.messageId}`;
    const reportDateString = createDateString(report.createdAt, "Reported");
    return (
        <div className="report-container" key={report.messageId}>
            <p className="report-text">{`Report Type: ${report.messageType}`}</p>
            <div className="report-id-container">
                <p className="report-text">{`Id: ${report.messageId}`}</p>
                <button
                    className="clipboard-button"
                    title="Copy ID to clipboard"
                    type="button"
                    onClick={async () => {
                        await navigator.clipboard.writeText(report.messageId);
                    }}
                >
                    <img
                        className="clipboard-image"
                        src={clipboardImg}
                        alt="A grey and blue clipboard with white paper on it, signifying copy to clipboard functionality"
                    />
                </button>
            </div>
            <p className="report-text">{report.messageContent}</p>
            <div className="button-container">
                <Link
                    to={`/posts/details/${linkId}`}
                    className="moderation-link"
                >
                    Reported Message
                </Link>
                <Form action="/moderation" method="DELETE">
                    <input
                        type="hidden"
                        value={report._id}
                        name="delete-report-id"
                    />
                    <button type="submit" className="button">
                        Delete
                    </button>
                </Form>
            </div>
            <p className="report-text">{reportDateString}</p>
        </div>
    );
}
