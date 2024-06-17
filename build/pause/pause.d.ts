type PauseOptions<T> = {
    data: T;
    label?: string;
    log?: boolean;
    ms: number;
};
export declare function pause(ms: number, label?: string): Promise<void>;
export declare function pause<T>(options: PauseOptions<T>): Promise<T>;
export {};
