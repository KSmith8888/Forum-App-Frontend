export interface outletInterface {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    setHasPicBeenUpdated: (hasPicBeenUpdated: boolean) => void;
    profilePic: profilePicInterface;
    setProfilePic: (pic: profilePicInterface) => void;
}

export interface loaderActionInterface {
    request: Request;
    params: {
        id?: string;
        topic?: string;
    };
}

export interface postHistoryInterface {
    title: string;
    content: string;
    timestamp: string;
    id: string;
}

export interface commentHistoryInterface {
    content: string;
    timestamp: string;
}

export interface postRelatedComments {
    post: postInterface;
    comments: Array<commentInterface>;
}

export interface likeInterface {
    status: string;
    likes: number;
    didUserLike: boolean;
}

export interface postInterface {
    _id: string;
    title: string;
    postType: string;
    content: string;
    topic: string;
    likes: number;
    user: string;
    keywords: string[];
    comments: string[];
    hasBeenEdited: boolean;
    history: Array<postHistoryInterface>;
    createdAt: string;
    updatedAt: string;
    profileImageName: string;
    profileImageAlt: string;
}

export interface commentInterface {
    _id: string;
    content: string;
    likes: number;
    user: string;
    relatedPost: string;
    hasBeenEdited: boolean;
    history: Array<commentHistoryInterface>;
    createdAt: string;
    updatedAt: string;
    profileImageName: string;
    profileImageAlt: string;
    commentReply: boolean;
}

export interface commentProps {
    commentData: commentInterface;
    commentErrorMsg: string | null;
    actionData: unknown;
    isUserLoggedIn: boolean;
    openReportModal: (
        messageId: string,
        reportType: string,
        relatedId: string
    ) => void;
}

export interface profilePicInterface {
    name: string;
    alt: string;
}

export interface reportInterface {
    _id: string;
    messageId: string;
    messageType: string;
    reportedBy: string;
    relatedPost: string;
    createdAt: string;
    updatedAt: string;
}

export interface notificationInterface {
    _id: string;
    message: string;
    isReply: boolean;
    replyMessageId?: string;
}
