import { ResourceWrapper } from '../builder';

export type DockerImageParams = {
    name: string;
    repository?: string;
    tag?: string;
    username?: string;
    password?: string;
};

export function dockerImage({ name, repository, tag, username, password }: DockerImageParams): ResourceWrapper {
    return {
        resource: {
            name: name,
            type: 'docker-image',
            icon: 'docker',
            source: {
                repository: repository || name,
                tag,
                username,
                password,
            },
        },
    };
}
