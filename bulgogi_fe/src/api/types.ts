export interface QueueItem {
    resolve: Function;
    reject: Function;
}


export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
}

