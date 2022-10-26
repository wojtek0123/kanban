import { Component, OnInit } from '@angular/core';
import { FormAddTaskService } from './form-add-task.service';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.css'],
})
export class FormAddTaskComponent implements OnInit {
  constructor(private formAddTaskService: FormAddTaskService) {}

  ngOnInit(): void {}

  onChangeFormVisibility() {
    this.formAddTaskService.onChangeFormVisibility();
  }
}
