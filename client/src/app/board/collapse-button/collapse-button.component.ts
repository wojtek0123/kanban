import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../board.component';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-collapse-button',
  templateUrl: './collapse-button.component.html',
  styleUrls: ['./collapse-button.component.css'],
  animations: [
    trigger('rotateState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default<=>rotated', animate('250ms')),
    ]),
  ],
})
export class CollapseButtonComponent {
  @Input() project!: Project;
  @Output() toggleMenu = new EventEmitter<boolean>();
  showContent = true;

  constructor(private boardService: BoardService) {}

  toggleShowContent(projectId: string) {
    this.showContent = !this.showContent;
    this.toggleMenu.emit(this.showContent);
    this.boardService.onChangeSelectedProjectId(this.project.id);
    this.boardService.onChangeSelectedProjectId(this.project.id);
  }
}
