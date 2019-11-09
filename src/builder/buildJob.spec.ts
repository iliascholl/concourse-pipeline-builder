/* eslint-disable @typescript-eslint/camelcase */
import { buildJob } from '.';
import { InParallel, Step } from '../api';

it('should build the name of the job', async () => {
    const actual = buildJob({ name: 'name', steps: [] });
    expect(actual.job.name).toBe('name');
});

it('should build the first step of the plan to be a get of the input resource if the steps require exactly one resource', async () => {
    const actual = buildJob({
        name: 'name',
        steps: [
            { step: {} as Step, usedResources: [{ resource: { name: 'foo', type: 'foo' } }] },
            { step: {} as Step, usedResources: [{ resource: { name: 'foo', type: 'foo' } }] },
        ],
    });

    expect(actual.job.plan[0]).toStrictEqual({ get: 'foo' });
});

it('should build the first step of the plan to be an in-parallel get of all resources used by the steps', async () => {
    const actual = buildJob({
        name: 'name',
        steps: [
            {
                step: {} as Step,
                usedResources: [{ resource: { name: 'foo', type: 'foo' } }, { resource: { name: 'bar', type: 'bar' } }],
            },
            {
                step: {} as Step,
                usedResources: [{ resource: { name: 'foo', type: 'foo' } }, { resource: { name: 'baz', type: 'baz' } }],
            },
        ],
    });

    const inParallel = (actual.job.plan[0] as InParallel).in_parallel as [];
    expect(inParallel.length).toBe(3);
    [{ get: 'foo' }, { get: 'bar' }, { get: 'baz' }].forEach(expect(inParallel).toContainEqual);
});

it('should build the first step of the plan to be the first element of the steps array if no resources are required', async () => {
    const actual = buildJob({
        name: 'name',
        steps: [{ step: { get: 'foo' }, usedResources: [] }],
    });

    expect(actual.job.plan[0]).toStrictEqual({ get: 'foo' });
});

it('should build the plan using the ordered array of steps', async () => {
    const actual = buildJob({
        name: 'name',
        steps: [
            { step: { get: 'a' }, usedResources: [] },
            { step: { get: 'b' }, usedResources: [] },
            { step: { get: 'c' }, usedResources: [] },
        ],
    });

    expect(actual.job.plan).toStrictEqual([{ get: 'a' }, { get: 'b' }, { get: 'c' }]);
});

it('should build the job plan with provided job hooks', async () => {
    const actual = buildJob({
        name: 'name',
        steps: [],
        hooks: [
            { type: 'on_success', step: { get: 'foo' }, usedResources: [] },
            { type: 'on_failure', step: { get: 'bar' }, usedResources: [] },
        ],
    });

    expect(actual.job.on_success).toStrictEqual({ get: 'foo' });
    expect(actual.job.on_failure).toStrictEqual({ get: 'bar' });
});

it('should group job hooks of the same type using in-parallel', async () => {
    const actual = buildJob({
        name: 'name',
        steps: [],
        hooks: [
            { type: 'on_success', step: { get: 'foo' }, usedResources: [] },
            { type: 'on_success', step: { get: 'bar' }, usedResources: [] },
        ],
    });

    expect(actual.job.on_success).toStrictEqual({ in_parallel: [{ get: 'foo' }, { get: 'bar' }] });
});

it('should group all resources needed by its steps and hooks', async () => {
    const actual = buildJob({
        name: 'name',
        steps: [{ step: { get: 'foo' }, usedResources: [{ resource: { name: 'foo', type: 'foo' } }] }],
        hooks: [
            { type: 'on_success', step: { get: 'bar' }, usedResources: [{ resource: { name: 'bar', type: 'bar' } }] },
        ],
    });

    expect(actual.usedResources).toStrictEqual([
        { resource: { name: 'foo', type: 'foo' } },
        { resource: { name: 'bar', type: 'bar' } },
    ]);
});
