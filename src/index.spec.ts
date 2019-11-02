import { writeFileSync } from 'fs';
import build from './index';

jest.mock('fs');

test('should write the provided configuration to file', () => {
    build({ some: 'config' });

    expect(writeFileSync).toBeCalledWith('./pipeline.yml', '{"some":"config"}');
});
