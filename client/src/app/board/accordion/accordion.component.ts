import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../board.component';
import { BoardService } from '../board.service';
import { NavigationService } from '../mobile-navigation/navigation.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit, OnDestroy {
  projects!: Project[];
  subscription = new Subscription();

  showContent = true;
  selectedBoardId = '';
  selectedProjectId = '';

  constructor(
    private boardService: BoardService,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.boardService.projects.subscribe(
      result => (this.projects = result)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
