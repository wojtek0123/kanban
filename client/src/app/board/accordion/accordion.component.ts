import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../types';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {
  @Input() projects: Project[] | undefined = undefined;
  selectedBoardId = '';

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.selectedBoard.subscribe(board => {
      this.selectedBoardId = board?.id ?? '';
    });
  }
}
