import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormWrapperComponent implements OnInit {
  show$!: Observable<boolean>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.show$ = this.formService.getIsFormOpen;
  }

  close(event: Event) {
    const target = event.target as HTMLDivElement;

    if (!target.classList.contains('backdrop')) {
      return;
    }

    this.formService.onChangeFormVisibility();
  }
}
