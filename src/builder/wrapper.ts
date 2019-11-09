import { Job, JobHooks, Resource, ResourceType, Step } from '../api';

export interface JobWrapper {
    job: Job;
    usedResources: ResourceWrapper[];
}

export interface StepWrapper {
    step: Step;
    usedResources: ResourceWrapper[];
}

export interface JobHookWrapper extends StepWrapper {
    type: keyof JobHooks;
}

export interface ResourceWrapper {
    resource: Resource;
    resourceType?: ResourceType;
}
