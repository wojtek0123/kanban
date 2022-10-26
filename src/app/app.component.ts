import { Component } from '@angular/core';
import { FormAddTaskService } from './form-add-task/form-add-task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public formAddTaskService: FormAddTaskService) {}

  onOpenAddTaskForm() {
    this.formAddTaskService.onChangeFormVisibility();
  }
}
