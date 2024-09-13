import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenduComponent } from './attendu.component';

describe('AttenduComponent', () => {
  let component: AttenduComponent;
  let fixture: ComponentFixture<AttenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttenduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
