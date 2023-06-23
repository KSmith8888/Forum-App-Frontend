import { Link, Form } from "react-router-dom";

import { reportInterface } from "../utils/interfaces.ts";
import { createDateString } from "../utils/create-date-string.ts";

interface modReportInterface {
    key: string;
    report: reportInterface;
}

export default function ModReport({ report }: modReportInterface) {
    const linkId =
        report.messageType === "Post" ? report.messageId : report.relatedPost;
    const reportDateString = createDateString(report.createdAt, "Reported");
    return (
        <div className="report-container" key={report.messageId}>
            <p className="report-text">{`Report Type: ${report.messageType}`}</p>
            <div className="button-container">
                <Link to={`/posts/details/${linkId}`} className="button-link">
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
