export default interface Get {
    get: string;
    resource?: string;
    version?: string;
    passed?: string[];
    params?: object;
    trigger?: boolean;
}
