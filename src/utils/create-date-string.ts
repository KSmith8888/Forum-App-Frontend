export function createDateString(timestamp: string, type: "Posted" | "Edited") {
    const date = new Date(timestamp);
    const initialHours = date.getHours();
    const hoursAmPm = initialHours >= 12 ? "PM" : "AM";
    const hours = initialHours > 12 ? initialHours - 12 : initialHours;
    const initialMinutes = date.getMinutes();
    const minutes =
        initialMinutes > 9
            ? `${initialMinutes} ${hoursAmPm}`
            : `0${initialMinutes} ${hoursAmPm}`;
    const dateString = date.toDateString();
    const completeDatString = `${type}: ${hours}:${minutes} ${dateString}`;
    return completeDatString;
}
