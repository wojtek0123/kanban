import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddTaskComponent } from './form-add-task.component';

describe('FormAddTaskComponent', () => {
  let component: FormAddTaskComponent;
  let fixture: ComponentFixture<FormAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
