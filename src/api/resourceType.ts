export default interface ResourceType {
    name: string;
    type: string;
    source?: object;
    privileged?: boolean;
    params?: object;
    check_every?: string;
    tags?: string[];
    unique_version_history?: boolean;
}
