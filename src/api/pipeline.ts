import Job from './job';
import ResourceType from './resourceType';
import Resource from './resource';
import Group from './group';

export default interface Pipeline {
    jobs: Job[];
    resources?: Resource[];
    resource_types?: ResourceType[];
    groups?: Group[];
}
