import { QueryOptionsInterface } from '../../base/interfaces/query-options.interface';

export const projectsFilterInterceptorParameters: QueryOptionsInterface = {
  name: ['searchable', 'sortable'],
  description: ['searchable', 'sortable'],
  budget: ['searchable', 'sortable'],
  status: ['searchable', 'sortable'],
};
