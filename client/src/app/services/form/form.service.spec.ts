import { Project } from 'src/app/models/project.model';
import { FormService } from './form.service';
import { board } from 'src/app/mock/board.mock';
import { tasks } from 'src/app/mock/tasks.mock';

describe('FormService', () => {
  let service: FormService;

  const project: Project = {
    id: '1',
    name: 'Project 1',
    boards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '',
    users: [],
  };

  beforeEach(() => {
    service = new FormService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get project', () => {
    service.onChangeProject(project);
    service.project$.subscribe(result => {
      expect(result).toEqual(project);
    });
  });

  it('should set and get assign user tab name', () => {
    const name = 'assign';
    service.onChangeTabName(name);
    service.assignUserTabName$.subscribe(result => {
      expect(result).toEqual(name);
    });
  });

  it('should set and get parent id', () => {
    const id = '1';
    service.onChangeParentId(id);
    service.parentId$.subscribe(result => {
      expect(result).toEqual(id);
    });
  });

  it('should set and get form visibility', () => {
    service.onChangeFormVisibility('task', true);
    service.isFormOpen$.subscribe(result => {
      expect(result).toBeTrue();
    });
    service.selectColumn$.subscribe(result => {
      expect(result).toBeTrue();
    });
    service.getTypeOfForm.subscribe(result => {
      expect(result).toEqual('task');
    });
    service.isEditing$.subscribe(result => {
      expect(result).toBeFalse();
    });
  });

  it('should set editing task to undefined', () => {
    service.onChangeEditingTask();
    expect(service.getEditingTask).toBeUndefined();
  });

  it('should edit project', () => {
    service.onChangeFormVisibility('project');
    service.onEdit('project', '1', project);
    expect(service.getEditingProject).toEqual(project);
  });

  it('should edit board', () => {
    spyOn<any>(service, 'getBoards').and.returnValue(of([board]));

    service.onChangeFormVisibility('board');
    service.onEdit('board', board.id);
    expect(service.getEditingBoard).toEqual(board);
  });

  it('should edit column', () => {
    const columns = board.columns;

    spyOn<any>(service, 'getColumns').and.returnValue(of(columns));
    service.onChangeFormVisibility('column');
    service.onEdit('column', columns[0].id);
    expect(service.getEditingColumn).toEqual(columns[0]);
  });

  it('should edit task', () => {
    spyOn<any>(service, 'getTasks').and.returnValue(of(tasks));
    service.onChangeFormVisibility('task');
    service.onEdit('task', tasks[2].id);
    expect(service.getEditingTask).toEqual(tasks[2]);
  });

  it('should edit subtask', () => {
    const subtasks = tasks.flatMap(task => task.subtasks);

    spyOn<any>(service, 'getSubtasks').and.returnValue(of(subtasks));
    service.onChangeFormVisibility('subtask');
    service.onEdit('subtask', subtasks[3].id);
    expect(service.getEditingSubtask).toEqual(subtasks[3]);
  });
});
