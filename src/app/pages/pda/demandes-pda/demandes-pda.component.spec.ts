import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesPdaComponent } from './demandes-pda.component';

describe('DemandesPdaComponent', () => {
  let component: DemandesPdaComponent;
  let fixture: ComponentFixture<DemandesPdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesPdaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandesPdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
