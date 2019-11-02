import Step from './step';

export default interface Job {
    name: string;
    old_name?: string;
    plan: Step[];
    serial?: boolean;
    build_log_retention?: {
        days: number;
        builds: number;
        minimum_succeeded_build: number;
    };
    serial_groups?: string[];
    max_in_flight?: number;
    public?: boolean;
    disable_manual_trigger?: boolean;
    interruptible?: boolean;
    on_success?: Step;
    on_failure?: Step;
    on_error?: Step;
    on_abort?: Step;
    ensure?: Step;
}
