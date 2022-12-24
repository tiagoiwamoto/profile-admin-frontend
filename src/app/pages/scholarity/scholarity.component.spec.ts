import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScholarityComponent} from './scholarity.component';

describe('ScholarityComponent', () => {
  let component: ScholarityComponent;
  let fixture: ComponentFixture<ScholarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
