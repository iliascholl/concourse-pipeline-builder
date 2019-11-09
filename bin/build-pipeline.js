#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');
require('ts-node/register');

const [, , relativePathToConfig] = process.argv;
const absolutePathToConfig = path.resolve(process.cwd(), relativePathToConfig);
const pipeline = require(absolutePathToConfig).default;

const targetFile = path.join(
    path.dirname(absolutePathToConfig),
    path.basename(absolutePathToConfig, path.extname(absolutePathToConfig)) + '.json',
);

fs.writeFileSync(targetFile, JSON.stringify(pipeline));
