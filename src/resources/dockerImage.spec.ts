import { dockerImage } from '.';

type DockerImageSource = {
    repository: string;
    tag?: string;
    username?: string;
    password?: string;
};

it('should not build any resource type', async () => {
    const actual = dockerImage({ name: 'name' });

    expect(actual.resourceType).toBeUndefined();
});

it('should build static properties of the resource', async () => {
    const actual = dockerImage({ name: 'name' });

    expect(actual.resource.type).toBe('docker-image');
    expect(actual.resource.icon).toBe('docker');
});

it('should build the resource name', async () => {
    const actual = dockerImage({ name: 'name' });

    expect(actual.resource.name).toBe('name');
});

it('should build the repository to be the name parameter if no repository parameter is set', async () => {
    const actual = dockerImage({ name: 'name' });

    expect((actual.resource.source as DockerImageSource).repository).toBe('name');
});

it('should build the repository to be the repository parameter if it is set', async () => {
    const actual = dockerImage({ name: 'name', repository: 'repository' });

    expect((actual.resource.source as DockerImageSource).repository).toBe('repository');
});

it('should build the tag to be the tag parameter if it is set', async () => {
    const actual = dockerImage({ name: 'name', tag: 'tag' });

    expect((actual.resource.source as DockerImageSource).tag).toBe('tag');
});

it('should build the username to be the username parameter if it is set', async () => {
    const actual = dockerImage({ name: 'name', username: 'username' });

    expect((actual.resource.source as DockerImageSource).username).toBe('username');
});

it('should build the password to be the password parameter if it is set', async () => {
    const actual = dockerImage({ name: 'name', password: 'password' });

    expect((actual.resource.source as DockerImageSource).password).toBe('password');
});
