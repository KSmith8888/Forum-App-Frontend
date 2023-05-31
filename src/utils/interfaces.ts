export interface outletInterface {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}

export interface postHistoryInterface {
    title: string;
    content: string;
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
    history: string[];
    createdAt: string;
    updatedAt: string;
}
