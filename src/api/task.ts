type Task = TaskProperties & (TaskFile | TaskConfig);

export default Task;

interface TaskProperties {
    task: string;
    privileged?: boolean;
    vars?: object;
    params?: object;
    image?: string;
    input_mapping?: object;
    output_mapping?: object;
}

interface TaskFile {
    file: string;
}

interface TaskConfig {
    platform: string;
    image_resource: TaskResource;
    rootfs_uri?: string;
    container_limits?: TaskContainerLimits;
    inputs?: TaskInput[];
    outputs?: TaskOutput[];
    caches?: TaskCache[];
    run: TaskRunConfig;
    params?: {
        [key: string]: string;
    };
}

interface TaskResource {
    type: string;
    source: object;
    params?: object;
    version?: object;
}

interface TaskContainerLimits {
    cpu?: number;
    memory?: number;
}

interface TaskInput {
    name: string;
    path?: string;
    optional?: boolean;
}

interface TaskOutput {
    name: string;
    path?: string;
}

interface TaskCache {
    path: string;
}

interface TaskRunConfig {
    path: string;
    args?: string[];
    dir?: string;
    user?: string;
}
