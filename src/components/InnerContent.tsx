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
                        const reg = new RegExp("^[a-zA-Z0-9.:/_-]+$");
                        const isValid = URL.canParse(word) && reg.test(word);
                        const validHref = isValid ? word : "#";
                        const linkText = isValid ? word : "Link";
                        return (
                            <a
                                href={validHref}
                                className="content-link"
                                title={
                                    validHref.startsWith(
                                        "https://4em.pages.dev"
                                    )
                                        ? "Opens in a new tab"
                                        : "External link - Opens in a new tab"
                                }
                                target="_blank"
                                rel="noreferrer"
                                key={index}
                            >
                                {linkText}{" "}
                            </a>
                        );
                    } else {
                        return <Fragment key={index}>{word} </Fragment>;
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
