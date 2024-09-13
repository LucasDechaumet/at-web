import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdaComponent } from './pda.component';

describe('PdaComponent', () => {
  let component: PdaComponent;
  let fixture: ComponentFixture<PdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
