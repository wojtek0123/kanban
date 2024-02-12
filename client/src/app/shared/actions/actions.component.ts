import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @Output() addEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  add() {
    this.addEvent.emit();
  }

  edit() {
    this.editEvent.emit();
  }

  delete() {
    this.deleteEvent.emit();
  }
}
