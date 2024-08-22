import { innerContentProps } from "../utils/interfaces.ts";

export default function InnerContent({ content, type }: innerContentProps) {
    const contentClass = type === "Post" ? "text-post-text" : "comment-text";
    function createSubstrings(content: string) {
        const contentWords = content.split(" ");
        const subStrings: string[][] = [];
        let combinedString = "";
        contentWords.forEach((word) => {
            if (word.startsWith("https://")) {
                subStrings.push([combinedString]);
                combinedString = "";
                subStrings.push([word]);
            } else {
                combinedString += `${word} `;
            }
        });
        if (combinedString.length > 0) {
            subStrings.push([combinedString]);
        }
        return subStrings;
    }
    function createContent(words: string[][]) {
        return (
            <p className={contentClass}>
                {words.map((word) => {
                    if (word[0].startsWith("https://")) {
                        return (
                            <a
                                href={word[0]}
                                className="content-link"
                            >{`${word[0]} `}</a>
                        );
                    } else {
                        return `${word[0]} `;
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
