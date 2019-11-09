import { yarn, YarnSteps } from '.';
import { dockerImage } from '../resources';
import { Task } from '../api';

const sourceCode = { resource: { name: 'source', type: 'source' } };
const builderImage = { resource: { name: 'builder', type: 'builder' } };

it('should build the yarn install step', async () => {
    const actual = yarn({ sourceCode, builderImage });

    expect(actual.install).toStrictEqual({
        step: {
            task: 'yarn install',
            image: 'builder',
            platform: 'linux',
            inputs: [{ name: 'source', path: '.' }],
            run: {
                path: 'yarn',
                args: ['install'],
            },
            outputs: [{ name: 'source-with-node-modules', path: '.' }],
        },
        usedResources: [sourceCode, builderImage],
    });
});

it('should build the yarn test step', async () => {
    const actual = yarn({ sourceCode, builderImage });

    expect(actual.test).toStrictEqual({
        step: {
            task: 'yarn test',
            image: 'builder',
            platform: 'linux',
            inputs: [{ name: 'source-with-node-modules', path: '.' }],
            run: {
                path: 'yarn',
                args: ['test'],
            },
        },
        usedResources: [sourceCode, builderImage],
    });
});

it('should use node:alpine image by default', async () => {
    const nodeAlpine = dockerImage({ name: 'node', tag: 'alpine' });

    const actual = yarn({ sourceCode });

    Object.keys(actual).forEach(it => {
        const key = it as keyof YarnSteps;
        expect((actual[key].step as Task).image).toBe('node');
        expect(actual[key].usedResources).toContainEqual(nodeAlpine);
    });
});
