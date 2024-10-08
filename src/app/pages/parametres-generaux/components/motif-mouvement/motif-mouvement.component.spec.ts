import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifMouvementComponent } from './motif-mouvement.component';

describe('MotifMouvementComponent', () => {
  let component: MotifMouvementComponent;
  let fixture: ComponentFixture<MotifMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotifMouvementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotifMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
