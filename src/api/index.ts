export type Pipeline = {
    jobs: Job[];
    resources?: Resource[];
    resource_types?: ResourceType[];
    groups?: Group[];
};
export type Job = {
    name: string;
    old_name?: string;
    plan: Step[];
    serial?: boolean;
    build_log_retention?: {
        days: number;
        builds: number;
        minimum_succeeded_build: number;
    };
    serial_groups?: string[];
    max_in_flight?: number;
    public?: boolean;
    disable_manual_trigger?: boolean;
    interruptible?: boolean;
} & JobHooks;
export type Resource = {
    name: string;
    type: string;
    icon?: string;
    source?: object;
    version?: object;
    check_every?: string;
    tags?: string[];
    public?: boolean;
    webhook_token?: string;
};
export type ResourceType = {
    name: string;
    type: string;
    source?: object;
    privileged?: boolean;
    params?: object;
    check_every?: string;
    tags?: string[];
    unique_version_history?: boolean;
};
export type Group = {
    name: string;
    jobs?: string[];
    resources?: string[];
};
export type JobHooks = {
    on_success?: Step;
    on_failure?: Step;
    on_error?: Step;
    on_abort?: Step;
    ensure?: Step;
};
export type Step = (Do | Get | InParallel | Put | Task | Try) & {
    tags?: string[];
    timeout?: string;
    attempts?: number;
    on_success?: Step;
    on_failure?: Step;
    on_error?: Step;
    on_abort?: Step;
    ensure?: Step;
};
export type Do = {
    do: Step[];
};
export type Get = {
    get: string;
    resource?: string;
    version?: string;
    passed?: string[];
    params?: object;
    trigger?: boolean;
};
export type InParallel = {
    in_parallel:
        | Step[]
        | {
              steps?: Step[];
              limit?: number;
              fail_fast?: boolean;
          };
};
export type Put = {
    put: string;
    resource?: string;
    inputs?: string[];
    params?: object;
    get_params?: object;
};
export type Task = TaskProperties & (TaskFileConfig | TaskInlineConfig);
export type Try = {
    try: Step;
};
export type TaskProperties = {
    task: string;
    privileged?: boolean;
    vars?: object;
    params?: object;
    image?: string;
    input_mapping?: object;
    output_mapping?: object;
};
export type TaskFileConfig = {
    file: string;
};
export type TaskInlineConfig = {
    platform: string;
    image_resource?: TaskResource;
    rootfs_uri?: string;
    container_limits?: TaskContainerLimits;
    inputs?: TaskInput[];
    outputs?: TaskOutput[];
    caches?: TaskCache[];
    run: TaskRunConfig;
    params?: {
        [key: string]: string;
    };
};
export type TaskResource = {
    type: string;
    source: object;
    params?: object;
    version?: object;
};
export type TaskContainerLimits = {
    cpu?: number;
    memory?: number;
};
export type TaskInput = {
    name: string;
    path?: string;
    optional?: boolean;
};
export type TaskOutput = {
    name: string;
    path?: string;
};
export type TaskCache = {
    path: string;
};
export type TaskRunConfig = {
    path: string;
    args?: string[];
    dir?: string;
    user?: string;
};
