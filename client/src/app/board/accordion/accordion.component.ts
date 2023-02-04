import { Component, Input } from '@angular/core';
import { Project } from '../../types';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  @Input() projects: Project[] | null = null;
  @Input() selectedBoardId: string | null = null;
}
