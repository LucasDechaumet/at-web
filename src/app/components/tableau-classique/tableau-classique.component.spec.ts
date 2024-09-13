import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauClassiqueComponent } from './tableau-classique.component';

describe('TableauClassiqueComponent', () => {
  let component: TableauClassiqueComponent;
  let fixture: ComponentFixture<TableauClassiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauClassiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableauClassiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
