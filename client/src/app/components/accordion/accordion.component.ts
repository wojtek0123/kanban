import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, AccordionItemComponent],
})
export class AccordionComponent {
  @Input() projects: Project[] = [];

  projectTrackBy(_index: number, project: Project) {
    return project.id;
  }
}
