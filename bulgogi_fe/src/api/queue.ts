import { QueueItem } from "@/types/apiTypes";

let failedQueue: QueueItem[] = [];
let isRefreshing = false;

export const getIsRefreshing = () => isRefreshing;
export const setIsRefreshing = (value: boolean) => {
    isRefreshing = value;
};
export const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

export const addToQueue = (resolve: Function, reject: Function) => {
    failedQueue.push({ resolve, reject });
};