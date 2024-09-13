import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilInventaireComponent } from './seuil-inventaire.component';

describe('SeuilInventaireComponent', () => {
  let component: SeuilInventaireComponent;
  let fixture: ComponentFixture<SeuilInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeuilInventaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeuilInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
