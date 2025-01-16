import { Form } from "react-router";

import { contentSettingsProps } from "../../utils/interfaces.ts";

export default function ContentSettings({
    getReplyNotifications,
    viewNSFW,
}: contentSettingsProps) {
    return (
        <div className="content-settings-container">
            <h4 className="content-settings-heading">Content Settings:</h4>
            <p className="content-settings-text">
                Get message reply notifications
            </p>
            <Form method="POST" className="notification-setting-form">
                <input
                    type="hidden"
                    name="notification-setting"
                    value="update"
                />
                {getReplyNotifications ? "On" : "Off"}
                <button type="submit" className="button">
                    {getReplyNotifications ? "Turn Off" : "Turn On"}
                </button>
            </Form>
            <p className="content-settings-text">View NSFW content</p>
            <Form method="POST" className="nsfw-setting-form">
                <input type="hidden" name="nsfw-setting" value="update" />
                {viewNSFW ? "On" : "Off"}
                <button type="submit" className="button">
                    {viewNSFW ? "Turn Off" : "Turn On"}
                </button>
            </Form>
        </div>
    );
}
