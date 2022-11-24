import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuModalComponent } from './context-menu-modal.component';

describe('ContextMenuModalComponent', () => {
  let component: ContextMenuModalComponent;
  let fixture: ComponentFixture<ContextMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextMenuModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContextMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
