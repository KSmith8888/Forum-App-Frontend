import { Fragment } from "react/jsx-runtime";
import { innerContentProps } from "../utils/interfaces.ts";

export default function InnerContent({ content, type }: innerContentProps) {
    const contentClass = type === "Post" ? "text-post-text" : "comment-text";
    function createSubstrings(content: string) {
        const contentWords = content.split(" ");
        const subStrings: string[] = [];
        let combinedString = "";
        contentWords.forEach((word) => {
            if (word.startsWith("https://")) {
                subStrings.push(combinedString);
                combinedString = "";
                subStrings.push(word);
            } else {
                combinedString += word + " ";
            }
        });
        if (combinedString.length > 0) {
            subStrings.push(combinedString);
        }
        return subStrings;
    }
    function createContent(words: string[]) {
        return (
            <p className={contentClass}>
                {words.map((word, index) => {
                    if (word.startsWith("https://")) {
                        let validUrl = "#";
                        try {
                            const testUrl = new URL(word);
                            validUrl = testUrl.href;
                        } catch (error) {
                            if (error instanceof Error) {
                                console.error(error.message);
                            }
                        }
                        return (
                            <a
                                href={validUrl}
                                className="content-link"
                                key={index}
                            >
                                {validUrl + " "}
                            </a>
                        );
                    } else {
                        return <Fragment key={index}>{word + " "}</Fragment>;
                    }
                })}
            </p>
        );
    }
    if (content.includes("https://")) {
        const substrings = createSubstrings(content);
        return createContent(substrings);
    } else {
        return <p className={contentClass}>{`    ${content}`}</p>;
    }
}
