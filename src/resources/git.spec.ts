/* eslint-disable @typescript-eslint/camelcase */
import { git } from '.';

type GitSource = {
    uri: string;
    private_key?: string;
    branch?: string;
};

it('should not build any resource type', async () => {
    const actual = git({ uri: 'uri' });

    expect(actual.resourceType).toBeUndefined();
});

it('should build static properties of the resource', async () => {
    const actual = git({ uri: 'uri' });

    expect(actual.resource.type).toBe('git');
    expect(actual.resource.icon).toBe('source-repository');
});

it('should build the resource name if the name parameter is not set', async () => {
    const actual = git({ uri: 'uri' });

    expect(actual.resource.name).toBe('source');
});

it('should build the resource name to be the name parameter if it is set', async () => {
    const actual = git({ uri: 'uri', name: 'name' });

    expect(actual.resource.name).toBe('name');
});

it('should build the uri to be the uri parameter', async () => {
    const actual = git({ uri: 'uri' });

    expect((actual.resource.source as GitSource).uri).toBe('uri');
});

it('should build the private_key to be the private_key parameter if it is set', async () => {
    const actual = git({ uri: 'uri', private_key: 'private_key' });

    expect((actual.resource.source as GitSource).private_key).toBe('private_key');
});

it('should build the branch to be the branch parameter', async () => {
    const actual = git({ uri: 'uri', branch: 'branch' });

    expect((actual.resource.source as GitSource).branch).toBe('branch');
});
