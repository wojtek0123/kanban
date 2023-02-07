import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormType } from '../../models/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  typeOfForm$!: Observable<FormType | undefined>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.typeOfForm$ = this.formService.getTypeOfForm;
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }
}
