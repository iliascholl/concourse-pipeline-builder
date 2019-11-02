import { writeFileSync } from 'fs';

export default function(config: object): void {
    writeFileSync('./pipeline.yml', JSON.stringify(config));
}
