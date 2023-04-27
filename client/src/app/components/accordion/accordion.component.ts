import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() projects: Project[] = [];

  projectTrackBy(_index: number, project: Project) {
    return project.id;
  }
}
