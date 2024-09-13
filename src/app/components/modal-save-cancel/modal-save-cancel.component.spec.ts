import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveCancelComponent } from './modal-save-cancel.component';

describe('ModalSaveCancelComponent', () => {
  let component: ModalSaveCancelComponent;
  let fixture: ComponentFixture<ModalSaveCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSaveCancelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSaveCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
