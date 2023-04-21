import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFormButtonComponent } from './open-form-button.component';

describe('OpenFormButtonComponent', () => {
  let component: OpenFormButtonComponent;
  let fixture: ComponentFixture<OpenFormButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenFormButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
