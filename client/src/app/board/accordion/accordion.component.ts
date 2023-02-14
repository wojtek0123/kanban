import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {
  projects$!: Observable<Project[] | undefined>;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.projects$ = this.boardService.getProjects;
  }
}
