# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2019-11-17
### Added
- Type definitions for Concourse Pipeline Definition API compatible to Concourse version 5.7.0
- Basic wrapper types `RessourceWrapper`, `StepWrapper`, `JobHookWrapper` and `JobWrapper`
- `ResourceWrapper` for the `docker-image` resource
- `ResourceWrapper` for the `git` resource
- `buildJob` factory function to simplify the creation of `JobWrapper` instances from arrays of `StepWrapper` and `JobHookWrapper`
- `buildPipeline` factory function to simplify the creation of a Concourse `Pipeline` from an array of `JobWrapper`
- `yarn` factory function to simplify the creation of `StepWrapper` instances for the common `yarn install` and `yarn test` steps
- `build-pipeline` binary for writing the `Pipeline` objects to file

[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/iliascholl/concourse-pipeline-builder
