import { writeFileSync } from 'fs';
import compile from './index';

jest.mock('fs');

test('should write the provided configuration to file', () => {
    const config = {
        jobs: [
            {
                name: 'job',
                plan: [{ get: 'resource' }, { put: 'resource' }],
            },
        ],
    };

    compile(config);

    expect(writeFileSync).toBeCalledWith('./pipeline.yml', JSON.stringify(config));
});
