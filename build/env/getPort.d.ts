/** Gets the port for the server by looking for key: `${server.toLowerCase()}Port` */
export declare function getPort(server: string): number;
export declare function getPort(server: string, ignoreMissing: boolean): number | undefined;
