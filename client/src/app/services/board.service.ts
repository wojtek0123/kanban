import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Board } from '../models/board.model';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private selectedColumnId$ = new BehaviorSubject<string>('');
  private selectedTaskId$ = new BehaviorSubject<string>('');
  private selectedBoard$ = new BehaviorSubject<Board | undefined>(undefined);
  private selectedProject$ = new BehaviorSubject<Project | undefined>(
    undefined
  );

  get getSelectedColumnId(): Observable<string> {
    return this.selectedColumnId$;
  }

  get getSelectedTaskId(): Observable<string> {
    return this.selectedTaskId$;
  }

  get getSelectedBoard(): Observable<Board | undefined> {
    return this.selectedBoard$;
  }

  get getSelectedProject(): Observable<Project | undefined> {
    return this.selectedProject$;
  }

  onChangeSelectedProject(project: Project) {
    this.selectedProject$.next(project);
  }

  onChangeSelectedBoard(board: Board | undefined) {
    this.selectedBoard$.next(board);
  }

  onChangeSelectedColumnId(columnId: string) {
    this.selectedColumnId$.next(columnId);
  }

  onChangeSelectedTaskId(taskId: string) {
    this.selectedTaskId$.next(taskId);
  }
}
