import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideUtilisateurComponent } from './guide-utilisateur.component';

describe('GuideUtilisateurComponent', () => {
  let component: GuideUtilisateurComponent;
  let fixture: ComponentFixture<GuideUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuideUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
