export interface outletInterface {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}

export interface postHistoryInterface {
    title: string;
    content: string;
    timestamp: Date;
}

export interface commentHistoryInterface {
    content: string;
    timestamp: Date;
}

export interface postInterface {
    _id: string;
    title: string;
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
}
