import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddEdit } from './student-add-edit';

describe('StudentAddEdit', () => {
  let component: StudentAddEdit;
  let fixture: ComponentFixture<StudentAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
