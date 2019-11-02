import { writeFileSync } from 'fs';
import Pipeline from './api/pipeline';

export default function(config: Pipeline): void {
    writeFileSync('./pipeline.yml', JSON.stringify(config));
}
