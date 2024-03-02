import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from '../../services/apollo/apollo.service';
import { AsyncPipe } from '@angular/common';
import { OpenFormButtonComponent } from '../open-form-button/open-form-button.component';

@Component({
  selector: 'app-display-number-of-users-in-task',
  templateUrl: './display-number-of-users-in-task.component.html',
  styleUrls: ['./display-number-of-users-in-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [OpenFormButtonComponent, AsyncPipe],
})
export class DisplayNumberOfUsersInTaskComponent {
  @Input() taskId: string = '';
  usersLength$ = new Observable<number>();

  constructor(private apollo: ApolloService) {}
}
