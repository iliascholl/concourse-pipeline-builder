export default interface Resource {
    name: string;
    type: string;
    icon?: string;
    source?: object;
    version?: object;
    check_every?: string;
    tags?: string[];
    public?: boolean;
    webhook_token?: string;
}
