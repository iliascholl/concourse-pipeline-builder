import Get from './get';
import InParallel from './inParallel';
import Do from './do';
import Task from './task';
import Try from './try';
import Put from './put';

type Step = (Get | Put | Task | InParallel | Do | Try) & {
    tags?: string[];
    timeout?: string;
    attempts?: number;
    on_success?: Step;
    on_failure?: Step;
    on_error?: Step;
    on_abort?: Step;
    ensure?: Step;
};

export default Step;
