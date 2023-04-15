import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { Column } from '../../models/column.model';
import { Board } from '../../models/board.model';
import { Subtask } from '../../models/subtask.model';
import { Project } from '../../models/project.model';
import { FormType, TabNameAssign } from '../../models/types';

import { BehaviorSubject, Observable, combineLatest, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
  private _isFormOpen$ = new BehaviorSubject(false);
  private _isEditing$ = new BehaviorSubject(false);
  private _parentId$ = new BehaviorSubject('');
  private _enableSelectColumn$ = new BehaviorSubject<boolean | undefined>(
    undefined
  );
  private _assignUserTabName$ = new BehaviorSubject<TabNameAssign>('assign');
  private _project$ = new BehaviorSubject<Project | undefined>(undefined);
  editingObject$ = new Observable<
    Project | Board | Column | Task | Subtask | undefined
  >();

  private _editingProject?: Project;
  private _editingBoard?: Board;
  private _editingColumn?: Column;
  private _editingTask?: Task;
  private _editingSubtask?: Subtask;
  private _typeOfForm$ = new BehaviorSubject<FormType | undefined>(undefined);

  get parentId$() {
    return this._parentId$.asObservable();
  }

  get assignUserTabName$() {
    return this._assignUserTabName$.asObservable();
  }

  get project$() {
    return this._project$.asObservable();
  }

  get isFormOpen$() {
    return this._isFormOpen$.asObservable();
  }

  get isEditing$() {
    return this._isEditing$.asObservable();
  }

  get getTypeOfForm() {
    return this._typeOfForm$.asObservable();
  }

  get getEditingProject() {
    return this._editingProject;
  }

  get getEditingBoard() {
    return this._editingBoard;
  }

  get getEditingColumn() {
    return this._editingColumn;
  }

  get getEditingTask() {
    return this._editingTask;
  }

  get getEditingSubtask() {
    return this._editingSubtask;
  }

  get selectColumn$() {
    return this._enableSelectColumn$.asObservable();
  }

  onChangeProject(project: Project | undefined) {
    this._project$.next(project);
  }

  onChangeTabName(name: TabNameAssign) {
    this._assignUserTabName$.next(name);
  }

  onChangeParentId(id: string) {
    this._parentId$.next(id);
  }

  onChangeFormVisibility(formType?: FormType, selectColumn?: boolean) {
    this._isFormOpen$.next(!this._isFormOpen$.value);
    this._typeOfForm$.next(formType);
    this._enableSelectColumn$.next(selectColumn);
  }

  onEdit(type: FormType, id: string, project?: Project | undefined) {
    this.onChangeFormVisibility(type);
    this._isEditing$.next(true);

    if (type === 'project') {
      if (project) {
        this._editingProject = project;
        return;
      }
      this._project$
        .pipe(take(1))
        .subscribe(project => (this._editingProject = project));
    }

    if (type === 'board') {
      this.getBoards()
        .pipe(
          map(boards => boards?.find(board => board.id === id)),
          take(1)
        )
        .subscribe(board => (this._editingBoard = board));
    }

    if (type === 'column') {
      this.getColumns()
        .pipe(
          map(columns => columns?.find(column => column.id === id)),
          take(1)
        )
        .subscribe(column => (this._editingColumn = column));
    }

    if (type === 'task') {
      this.getTasks()
        .pipe(
          map(tasks => tasks?.find(task => task.id === id)),
          take(1)
        )
        .subscribe(task => (this._editingTask = task));
    }

    if (type === 'subtask') {
      this.getSubtasks()
        .pipe(
          map(subtasks => subtasks?.find(subtask => subtask.id === id)),
          take(1)
        )
        .subscribe(subtask => (this._editingSubtask = subtask));
    }
  }

  private getBoards() {
    return this._project$.pipe(map(project => project?.boards));
  }

  private getColumns() {
    return this.getBoards().pipe(
      map(boards =>
        boards?.flatMap(board =>
          board.columns.flatMap(columnWrapper => columnWrapper.column)
        )
      )
    );
  }

  private getTasks() {
    return this.getColumns().pipe(
      map(columns => columns?.flatMap(column => column.tasks))
    );
  }

  private getSubtasks() {
    return this.getTasks().pipe(
      map(tasks => tasks?.flatMap(task => task.subtasks))
    );
  }

  getColumnsFormBoard() {
    return combineLatest([this.parentId$, this.project$]).pipe(
      map(([parentId, project]) =>
        project?.boards.find(board => board.id === parentId)
      ),
      map(board =>
        board?.columns.flatMap(columnWrapper => columnWrapper.column)
      )
    );
  }
}
