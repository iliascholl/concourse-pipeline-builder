/* eslint-disable @typescript-eslint/camelcase */
import { Pipeline } from '../api';
import { JobWrapper } from '..';
import { chain, isEqual } from 'lodash';

export type BuildPipelineParams = {
    jobs: JobWrapper[];
};

export function buildPipeline({ jobs }: BuildPipelineParams): Pipeline {
    const resourceWrappers = chain(jobs).flatMap(it => it.usedResources);

    return {
        resources: resourceWrappers
            .map(it => it.resource)
            .uniqWith(isEqual)
            .value(),
        resource_types: resourceWrappers
            .map(it => it.resourceType)
            .uniqWith(isEqual)
            .compact()
            .value(),
        jobs: jobs.map(it => it.job),
    };
}
