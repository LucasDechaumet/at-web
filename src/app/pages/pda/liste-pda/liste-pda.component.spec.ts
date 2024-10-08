import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePdaComponent } from './liste-pda.component';

describe('ListePdaComponent', () => {
  let component: ListePdaComponent;
  let fixture: ComponentFixture<ListePdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePdaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListePdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
