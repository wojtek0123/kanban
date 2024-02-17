import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
export class DisplayNumberOfUsersInTaskComponent implements OnInit {
  @Input() taskId: string = '';
  usersLength$ = new Observable<number>();

  constructor(private apollo: ApolloService) {}

  ngOnInit() {
    this.usersLength$ = this.apollo
      .getUsersFromTask(this.taskId)
      .pipe(map(users => users.length));
  }
}
