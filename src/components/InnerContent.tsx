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
                        //const reg = new RegExp("^[a-zA-Z0-9.:/_-]+$"); && reg.test(word)
                        const isValid = URL.canParse(word);
                        const validHref = isValid ? word : "#";
                        const linkText = isValid ? word : "Invalid";
                        return (
                            <a
                                href={validHref}
                                className="content-link"
                                key={index}
                            >
                                {linkText}{" "}
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
