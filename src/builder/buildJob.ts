/* eslint-disable @typescript-eslint/camelcase */
import { InParallel, JobHooks, Step } from '../api';
import { JobHookWrapper, JobWrapper, StepWrapper } from '..';
import { chain, compact, flatMap, isEqual } from 'lodash';

function mergeSteps(oldStep: Step | undefined, newStep: Step): Step {
    if (oldStep == undefined) {
        return newStep;
    } else {
        const alreadyGroupedSteps = oldStep as InParallel;
        if (alreadyGroupedSteps.in_parallel instanceof Array) {
            alreadyGroupedSteps.in_parallel.push(newStep);
            return alreadyGroupedSteps;
        } else {
            return { in_parallel: [oldStep, newStep] };
        }
    }
}

function groupToInParallel(
    aggregatedStepsByHookType: { [K in keyof JobHooks]: Step },
    hook: JobHookWrapper,
): { [K in keyof JobHooks]: Step } {
    return { ...aggregatedStepsByHookType, [hook.type]: mergeSteps(aggregatedStepsByHookType[hook.type], hook.step) };
}

export type BuildJobParams = {
    name: string;
    steps: StepWrapper[];
    hooks?: JobHookWrapper[];
};

export function buildJob({ name, steps, hooks = [] }: BuildJobParams): JobWrapper {
    const getNecessaryResources = chain(steps)
        .flatMap(it => it.usedResources)
        .map(it => ({ get: it.resource.name } as Step))
        .uniqWith(isEqual)
        .reduce(mergeSteps)
        .value();

    return {
        job: {
            name: name,
            plan: compact([getNecessaryResources, ...steps.map(it => it.step)]),
            ...hooks.reduce(groupToInParallel, {}),
        },
        usedResources: flatMap([...steps, ...hooks], it => it.usedResources),
    };
}
