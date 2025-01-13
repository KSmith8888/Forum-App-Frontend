import { useRef, useEffect } from "react";
import { Form } from "react-router";

import { reportModalProps } from "../../utils/interfaces";

export default function ReportModal({
    reportInfo,
    actionData,
}: reportModalProps) {
    const reportModal = useRef<HTMLDialogElement>(null);
    const reportForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (reportInfo.messageId !== "none" && reportModal.current) {
            reportModal.current.showModal();
        }
    }, [reportInfo]);
    useEffect(() => {
        if (
            actionData &&
            typeof actionData === "object" &&
            "message" in actionData &&
            actionData.message === "Message reported successfully" &&
            reportModal.current &&
            reportForm.current
        ) {
            reportForm.current.reset();
            reportModal.current.close();
        }
    }, [actionData]);

    return (
        <dialog className="report-modal" ref={reportModal}>
            <Form method="POST" id="report-form" ref={reportForm}>
                <button
                    className="close-modal-button"
                    type="button"
                    aria-label="Close report form"
                    onClick={() => {
                        if (reportModal.current) {
                            reportModal.current.close();
                        }
                    }}
                >
                    X
                </button>
                <h3 className="report-modal-heading">
                    Report to the moderation team?
                </h3>
                <label htmlFor="report-message-input">Message:</label>
                <textarea
                    id="report-message-input"
                    className="input textarea"
                    name="report-content"
                    minLength={4}
                    maxLength={120}
                    rows={6}
                    required
                ></textarea>
                <input
                    type="hidden"
                    name="report-related-id"
                    value={reportInfo.messageRelated}
                />
                <input
                    type="hidden"
                    name="report-message-id"
                    value={reportInfo.messageId}
                />
                <input
                    type="hidden"
                    name="report-type"
                    value={reportInfo.messageType}
                />
                <button className="button" type="submit">
                    Submit
                </button>
            </Form>
        </dialog>
    );
}
