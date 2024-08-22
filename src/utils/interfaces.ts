export interface outletInterface {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    setHasPicBeenUpdated: (hasPicBeenUpdated: boolean) => void;
    profilePic: profilePicInterface;
    setProfilePic: (pic: profilePicInterface) => void;
    numOfNotifications: number;
    setNumOfNotifications: (numOfNotifications: number) => void;
}

export interface loaderActionInterface {
    request: Request;
    params: {
        id?: string;
        topic?: string;
        username?: string;
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
    lastEditedAt: string;
    history: Array<postHistoryInterface>;
    createdAt: string;
    updatedAt: string;
    profileImageName: string;
    profileImageAlt: string;
}

export interface homePostInfo {
    _id: string;
    title: string;
    postType: string;
    content: string;
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
    messageContent: string;
    reportedBy: string;
    relatedPost: string;
    createdAt: string;
    updatedAt: string;
}

export interface notificationInterface {
    _id: string;
    message: string;
    type: string;
    replyMessageId?: string;
    commentId: string;
}

export interface savedPostInterface {
    id: string;
    title: string;
}

export interface userProfilePost {
    id: string;
    title: string;
}

export interface userProfileComment {
    _id: string;
    content: string;
    relatedPost: string;
}

export interface picSelectorProps {
    isPicModalOpen: boolean;
    setIsPicModalOpen: (value: boolean) => void;
}

export interface picSelectorBtnProps {
    currentImage: string;
    setCurrentImage: (image: string) => void;
    setCurrentAlt: (alt: string) => void;
    imageName: string;
    imageAlt: string;
    labelText: string;
}

export interface profileBioProps {
    isBioModalOpen: boolean;
    setIsBioModalOpen: (value: boolean) => void;
}

export interface commentFormProps {
    commentErrorMsg: string | null;
    type: "post" | "comment";
    postId: string;
    commentId?: string;
}

export interface profileDeleteProps {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (value: boolean) => void;
}

export interface headerProps {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    numOfNotifications: number;
    profilePic: profilePicInterface;
    setProfilePic: (pic: profilePicInterface) => void;
}

export interface postHistoryProps {
    key: string;
    timestamp: string;
    title: string;
    content: string;
}

export interface updatePasswordProps {
    isPassModalOpen: boolean;
    setIsPassModalOpen: (value: boolean) => void;
    actionMessage: unknown;
}

export interface innerContentProps {
    content: string;
    type: "Post" | "Comment";
}
