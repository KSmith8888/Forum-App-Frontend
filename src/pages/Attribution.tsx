import { Link } from "react-router-dom";

export default function Attribution() {
    return (
        <div className="attribution-container">
            <div className="attribution-row">
                <div className="attribution-heading-container">
                    <h2 className="attribution-main-heading">Attribution</h2>
                    <p className="attribution-sub-heading">
                        The following tools and assets were used in the
                        development of this project
                    </p>
                </div>
            </div>
            <div className="attribution-row">
                <div className="attribution-type">
                    <h3 className="attribution-type-heading">
                        Dependencies (Frontend)
                    </h3>
                    <p className="attribution-text">react and react-dom:</p>
                    <Link
                        to="https://github.com/facebook/react"
                        className="attribution-link"
                    >
                        https://github.com/facebook/react
                    </Link>
                    <p className="attribution-text">react-router-dom:</p>
                    <Link
                        to="https://github.com/remix-run/react-router"
                        className="attribution-link"
                    >
                        https://github.com/remix-run/react-router
                    </Link>
                    <p className="attribution-text">typescript:</p>
                    <Link
                        to="https://github.com/Microsoft/TypeScript"
                        className="attribution-link"
                    >
                        https://github.com/Microsoft/TypeScript
                    </Link>
                    <p className="attribution-text">vite:</p>
                    <Link
                        to="https://github.com/vitejs/vite"
                        className="attribution-link"
                    >
                        https://github.com/vitejs/vite
                    </Link>
                    <p className="attribution-text">eslint:</p>
                    <Link
                        to="https://github.com/eslint/eslint"
                        className="attribution-link"
                    >
                        https://github.com/eslint/eslint
                    </Link>
                    <p className="attribution-text">eslint-plugin-react:</p>
                    <Link
                        to="https://github.com/jsx-eslint/eslint-plugin-react"
                        className="attribution-link"
                    >
                        https://github.com/jsx-eslint/eslint-plugin-react
                    </Link>
                    <p className="attribution-text">
                        @types/react
                        <span className="attribution-double">
                            @types/react-dom:
                        </span>
                    </p>
                    <Link
                        to="https://github.com/DefinitelyTyped/DefinitelyTyped"
                        className="attribution-link"
                    >
                        https://github.com/DefinitelyTyped/DefinitelyTyped
                    </Link>
                    <p className="attribution-text">
                        @typescript-eslint/eslint-plugin
                        <span className="attribution-double">
                            @typescript-eslint/parser:
                        </span>
                    </p>
                    <Link
                        to="https://github.com/typescript-eslint/typescript-eslint"
                        className="attribution-link"
                    >
                        https://github.com/typescript-eslint/typescript-eslint
                    </Link>
                    <p className="attribution-text">@vitejs/plugin-react:</p>
                    <Link
                        to="https://github.com/vitejs/vite-plugin-react"
                        className="attribution-link"
                    >
                        https://github.com/vitejs/vite-plugin-react
                    </Link>
                </div>
                <div className="attribution-type">
                    <h3 className="attribution-type-heading">
                        Dependencies (Backend)
                    </h3>
                    <p className="attribution-text">express:</p>
                    <Link
                        to="https://github.com/expressjs/express"
                        className="attribution-link"
                    >
                        https://github.com/expressjs/express
                    </Link>
                    <p className="attribution-text">bcrypt:</p>
                    <Link
                        to="https://github.com/kelektiv/node.bcrypt.js"
                        className="attribution-link"
                    >
                        https://github.com/kelektiv/node.bcrypt.js
                    </Link>
                    <p className="attribution-text">jsonwebtoken:</p>
                    <Link
                        to="https://github.com/auth0/node-jsonwebtoken"
                        className="attribution-link"
                    >
                        https://github.com/auth0/node-jsonwebtoken
                    </Link>
                    <p className="attribution-text">mongoose:</p>
                    <Link
                        to="https://github.com/Automattic/mongoose"
                        className="attribution-link"
                    >
                        https://github.com/Automattic/mongoose
                    </Link>
                    <p className="attribution-text">dotenv:</p>
                    <Link
                        to="https://github.com/motdotla/dotenv"
                        className="attribution-link"
                    >
                        https://github.com/motdotla/dotenv
                    </Link>
                    <p className="attribution-text">express-rate-limit:</p>
                    <Link
                        to="https://github.com/express-rate-limit/express-rate-limit"
                        className="attribution-link"
                    >
                        https://github.com/express-rate-limit/express-rate-limit
                    </Link>
                    <p className="attribution-text">eslint:</p>
                    <Link
                        to="https://github.com/eslint/eslint"
                        className="attribution-link"
                    >
                        https://github.com/eslint/eslint
                    </Link>
                    <p className="attribution-text">nodemon:</p>
                    <Link
                        to="https://github.com/remy/nodemon"
                        className="attribution-link"
                    >
                        https://github.com/remy/nodemon
                    </Link>
                </div>
            </div>
            <div className="attribution-row">
                <div className="attribution-type">
                    <h3 className="attribution-type-heading">
                        Images (Pexels)
                    </h3>
                    <p className="attribution-text">
                        Coffee mug surrounded with coffee beans by Toni Cuenca -{" "}
                        <Link
                            to="https://www.pexels.com/photo/coffee-mug-surrounded-with-coffee-beans-585753/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>
                    <p className="attribution-text">
                        Green tree on green grass field by Taylor Hunt -{" "}
                        <Link
                            to="https://www.pexels.com/photo/green-tree-on-green-grass-field-2902440/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>
                    <p className="attribution-text">
                        Blue and yellow globe by Pixabay -{" "}
                        <Link
                            to="https://www.pexels.com/photo/blue-and-yellow-globe-269724/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        Close up photo of gray laptop by Lukas -{" "}
                        <Link
                            to="https://www.pexels.com/photo/close-up-photo-of-gray-laptop-577210/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        White yacht on running on blue body of water during
                        daytime by Pixabay -{" "}
                        <Link
                            to="https://www.pexels.com/photo/white-yacht-on-running-on-blue-body-of-water-during-daytime-163236/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        Lemon iced tea with lemon fruits by Barbara Webb -{" "}
                        <Link
                            to="https://www.pexels.com/photo/lemon-iced-tea-with-lemon-fruits-792613/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>
                </div>
                <div className="attribution-type">
                    <h3 className="attribution-type-heading">
                        Images (Pixabay)
                    </h3>
                    <p className="attribution-text">
                        Blank profile picture mystery man by Stephanie Edwards -{" "}
                        <Link
                            to="https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        Apple red fruit red chief by NoName_13 -{" "}
                        <Link
                            to="https://pixabay.com/photos/apple-red-fruit-red-chief-1702316/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        Guitar electric guitar by PIRO -{" "}
                        <Link
                            to="https://pixabay.com/photos/guitar-electric-guitar-2925282/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        Link hyperlink chain by inspire-studio -{" "}
                        <Link
                            to="https://pixabay.com/vectors/link-hyperlink-chain-linking-6931554/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        File description outline document by Inspire-studio -{" "}
                        <Link
                            to="https://pixabay.com/vectors/file-description-outline-document-6472230/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        Disk floppy file document memory bt Inspire-studio -{" "}
                        <Link
                            to="https://pixabay.com/vectors/disk-floppy-file-document-memory-6780403/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>

                    <p className="attribution-text">
                        Inventory check list checklist by Inspire-studio -{" "}
                        <Link
                            to="https://pixabay.com/vectors/inventory-check-list-checklist-6817561/"
                            className="attribution-link"
                        >
                            Source
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
