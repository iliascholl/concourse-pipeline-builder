import { ResourceWrapper, StepWrapper } from '../builder';
import { dockerImage } from '../resources';
import { TaskInput } from '../api';

function original(sourceCode: ResourceWrapper): TaskInput {
    return {
        name: sourceCode.resource.name,
        path: '.',
    };
}

function withNodeModules(sourceCode: ResourceWrapper): TaskInput {
    return {
        name: `${sourceCode.resource.name}-with-node-modules`,
        path: '.',
    };
}

export type YarnSteps = {
    install: StepWrapper;
    test: StepWrapper;
};

export type YarnParams = {
    sourceCode: ResourceWrapper;
    builderImage?: ResourceWrapper;
};

export function yarn({
    sourceCode,
    builderImage = dockerImage({ name: 'node', tag: 'alpine' }),
}: YarnParams): YarnSteps {
    return {
        install: {
            step: {
                task: 'yarn install',
                image: builderImage.resource.name,
                platform: 'linux',
                inputs: [original(sourceCode)],
                run: {
                    path: 'yarn',
                    args: ['install'],
                },
                outputs: [withNodeModules(sourceCode)],
            },
            usedResources: [sourceCode, builderImage],
        },
        test: {
            step: {
                task: 'yarn test',
                image: builderImage.resource.name,
                platform: 'linux',
                inputs: [withNodeModules(sourceCode)],
                run: {
                    path: 'yarn',
                    args: ['test'],
                },
            },
            usedResources: [sourceCode, builderImage],
        },
    };
}
