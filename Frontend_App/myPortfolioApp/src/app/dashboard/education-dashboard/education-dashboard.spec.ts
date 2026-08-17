import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDashboard } from './education-dashboard';

describe('EducationDashboard', () => {
  let component: EducationDashboard;
  let fixture: ComponentFixture<EducationDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
