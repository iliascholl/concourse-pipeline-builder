import Step from './step';

export default interface InParallel {
    in_parallel:
        | Step[]
        | {
              steps?: Step[];
              limit?: number;
              fail_fast?: boolean;
          };
}
