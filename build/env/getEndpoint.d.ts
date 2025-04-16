import type { Region } from "./types.js";
export type AppServerEndpoint = {
    secure: boolean;
    hostname: string;
    port: number;
    region?: Region;
    /** does this endpoint have a hostname and port */
    valid: boolean;
};
export declare function getEndpoint(server: string): Partial<AppServerEndpoint>;
