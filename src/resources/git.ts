/* eslint-disable @typescript-eslint/camelcase */
import { ResourceWrapper } from '../builder';

export type GitResourceParams = {
    uri: string;
    name?: string;
    private_key?: string;
    branch?: string;
};

export function git({ uri, name, private_key, branch }: GitResourceParams): ResourceWrapper {
    return {
        resource: {
            name: name || 'source',
            type: 'git',
            icon: 'source-repository',
            source: {
                uri,
                private_key,
                branch,
            },
        },
    };
}
