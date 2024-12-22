import { useEffect } from "react";
import { useLoaderData, useSearchParams, useOutletContext } from "react-router";

import homeLoader from "./home-loader.tsx";
import PostPreview from "../../components/PostPreview.tsx";

import { outletInterface, postPreviewInfo } from "../../utils/interfaces.ts";

import "../../assets/styles/home.css";

export default function Home() {
    const [searchParams] = useSearchParams();
    const { setIsUserLoggedIn } = useOutletContext<outletInterface>();
    const message = searchParams.get("message");
    const displayMsg =
        typeof message === "string" ? message.replaceAll("_", " ") : "";
    const status = searchParams.get("status");
    useEffect(() => {
        if (status === "loggedIn") {
            setIsUserLoggedIn(true);
        }
        if (message === "Account_deleted_successfully") {
            sessionStorage.clear();
            setIsUserLoggedIn(false);
        }
        window.scrollTo(0, 0);
    }, []);

    const loaderData = useLoaderData();

    function createPostElements(postEls: Array<postPreviewInfo>) {
        return postEls.map((preview: postPreviewInfo) => {
            return (
                <PostPreview
                    key={preview.postId}
                    postId={preview.postId}
                    title={preview.title}
                    postType={preview.postType}
                    previewText={preview.previewText}
                    urlTitle={preview.urlTitle}
                />
            );
        });
    }

    let popularPosts: Array<postPreviewInfo> = [];
    let newPosts: Array<postPreviewInfo> = [];
    if (loaderData && typeof loaderData === "object") {
        if ("popular" in loaderData && Array.isArray(loaderData.popular)) {
            popularPosts = [...loaderData.popular];
        }
        if ("new" in loaderData && Array.isArray(loaderData.new)) {
            newPosts = [...loaderData.new];
        }
    }
    const popularPostEls = createPostElements(popularPosts);
    const newPostEls = createPostElements(newPosts);

    return (
        <>
            <p className="user-message">{displayMsg}</p>
            <div className="home-container">
                <section className="trending-posts-section">
                    <h2 className="popular-posts-heading">Popular Posts:</h2>
                    {popularPostEls.length > 0 ? (
                        <div className="trending-post-elements">
                            {popularPostEls}
                        </div>
                    ) : (
                        <p>No popular posts available at this time</p>
                    )}
                </section>
                <section className="new-posts-section">
                    <h2 className="new-posts-heading">New Posts:</h2>
                    {newPostEls.length > 0 ? (
                        <div className="new-post-elements">{newPostEls}</div>
                    ) : (
                        <p>No new posts available at this time</p>
                    )}
                </section>
            </div>
        </>
    );
}

Home.loader = homeLoader;