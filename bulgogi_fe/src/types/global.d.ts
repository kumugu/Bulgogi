declare global {
    interface Window {
        tokenRefreshInterval?: ReturnType<typeof setInterval>;
    }
}

export {};
