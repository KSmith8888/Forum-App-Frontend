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
        title?: string;
    };
}

export interface postHistoryInterface {
    content: string;
    timestamp: string;
    editNumber: number;
}

export interface commentHistoryInterface {
    content: string;
    timestamp: string;
    editNumber: number;
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

export interface pollOption {
    option: string;
    votes: number;
}

export interface pollData {
    options: Array<pollOption>;
}

export interface postInterface {
    _id: string;
    title: string;
    postType: string;
    content: string;
    urlTitle: string;
    previewText: string;
    topic: string;
    likes: number;
    user: string;
    keywords: string[];
    pollData: Array<pollOption>;
    comments: string[];
    hasBeenEdited: boolean;
    lastEditedAt: string;
    history: Array<postHistoryInterface>;
    createdAt: string;
    updatedAt: string;
    profileImageName: string;
    profileImageAlt: string;
}

export interface commentInterface {
    _id: string;
    content: string;
    previewText: string;
    likes: number;
    user: string;
    relatedPost: string;
    hasBeenEdited: boolean;
    lastEditedAt: string;
    history: Array<commentHistoryInterface>;
    createdAt: string;
    updatedAt: string;
    profileImageName: string;
    profileImageAlt: string;
    commentReply: boolean;
}

export interface commentProps {
    commentData: commentInterface;
    actionData: unknown;
    isUserLoggedIn: boolean;
    postUrlTitle: string;
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
    postUrlTitle: String;
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
    relatedPostId: string;
    postUrlTitle: string;
    commentId: string;
    createdAt: string;
}

export interface savedPostInterface {
    postId: string;
    title: string;
    urlTitle: string;
}

export interface userProfilePost {
    postId: string;
    title: string;
    previewText: string;
    urlTitle: string;
}

export interface userProfileComment {
    commentId: string;
    previewText: string;
    relatedPost: string;
    postUrlTitle: string;
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
    profileBio: string;
}

export interface commentFormProps {
    type: "post" | "comment";
    postId: string;
    commentId?: string;
    postUrlTitle: string;
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

export interface updatePasswordProps {
    pswdLastUpdated: string;
    actionMessage: unknown;
}

export interface updateEmailProps {
    currentEmail: string;
    updateStep: number;
}

export interface innerContentProps {
    content: string;
    type: "Post" | "Comment";
}

export interface postPreviewInfo {
    postId: string;
    title: string;
    previewText: string;
    postType: string;
    urlTitle: string;
}
