import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamAlgoComponent } from './param-algo.component';

describe('ParamAlgoComponent', () => {
  let component: ParamAlgoComponent;
  let fixture: ComponentFixture<ParamAlgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamAlgoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
