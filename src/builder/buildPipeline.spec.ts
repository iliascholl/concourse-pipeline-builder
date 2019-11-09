import { buildPipeline } from '.';

it('should aggregate all resources used by the provided jobs', async () => {
    const actual = buildPipeline({
        jobs: [
            { usedResources: [{ resource: { name: 'foo', type: 'foo' } }], job: { name: 'name', plan: [] } },
            { usedResources: [{ resource: { name: 'bar', type: 'bar' } }], job: { name: 'name', plan: [] } },
        ],
    });

    expect(actual.resources).toStrictEqual([
        { name: 'foo', type: 'foo' },
        { name: 'bar', type: 'bar' },
    ]);
});

it('should filter out duplicate resources', async () => {
    const actual = buildPipeline({
        jobs: [
            { usedResources: [{ resource: { name: 'foo', type: 'foo' } }], job: { name: 'name', plan: [] } },
            { usedResources: [{ resource: { name: 'foo', type: 'foo' } }], job: { name: 'name', plan: [] } },
        ],
    });

    expect(actual.resources).toStrictEqual([{ name: 'foo', type: 'foo' }]);
});

it('should aggregate all resource types used by the provided jobs', async () => {
    const actual = buildPipeline({
        jobs: [
            {
                usedResources: [
                    { resource: { name: 'foo', type: 'foo' }, resourceType: { name: 'foo-type', type: 'foo-type' } },
                ],
                job: { name: 'name', plan: [] },
            },
            {
                usedResources: [
                    { resource: { name: 'bar', type: 'bar' }, resourceType: { name: 'bar-type', type: 'bar-type' } },
                ],
                job: { name: 'name', plan: [] },
            },
        ],
    });

    expect(actual.resource_types).toStrictEqual([
        { name: 'foo-type', type: 'foo-type' },
        { name: 'bar-type', type: 'bar-type' },
    ]);
});

it('should filter out duplicate resource types', async () => {
    const actual = buildPipeline({
        jobs: [
            {
                usedResources: [
                    { resource: { name: 'foo', type: 'foo' }, resourceType: { name: 'foo-type', type: 'foo-type' } },
                ],
                job: { name: 'name', plan: [] },
            },
            {
                usedResources: [
                    { resource: { name: 'foo', type: 'foo' }, resourceType: { name: 'foo-type', type: 'foo-type' } },
                ],
                job: { name: 'name', plan: [] },
            },
        ],
    });

    expect(actual.resource_types).toStrictEqual([{ name: 'foo-type', type: 'foo-type' }]);
});

it('should filter out undefined resource types', async () => {
    const actual = buildPipeline({
        jobs: [
            {
                usedResources: [{ resource: { name: 'foo', type: 'foo' }, resourceType: undefined }],
                job: { name: 'name', plan: [] },
            },
            {
                usedResources: [{ resource: { name: 'foo', type: 'foo' }, resourceType: undefined }],
                job: { name: 'name', plan: [] },
            },
        ],
    });

    expect(actual.resource_types).toStrictEqual([]);
});

it('should build the jobs as provided by the jobs array', async () => {
    const actual = buildPipeline({
        jobs: [
            {
                job: { name: 'foo', plan: [] },
                usedResources: [],
            },
            {
                job: { name: 'bar', plan: [] },
                usedResources: [],
            },
        ],
    });

    expect(actual.jobs).toStrictEqual([
        { name: 'foo', plan: [] },
        { name: 'bar', plan: [] },
    ]);
});
