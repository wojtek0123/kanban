export type FormType =
  | 'project'
  | 'board'
  | 'task'
  | 'column'
  | 'subtask'
  | 'user'
  | 'assign-user'
  | 'profile'
  | 'see-tasks';

export type ToastType = 'confirm' | 'warning';

export type Status = 'loading' | 'error' | 'ok';

export type TabNameAssign = 'peek' | 'assign';
