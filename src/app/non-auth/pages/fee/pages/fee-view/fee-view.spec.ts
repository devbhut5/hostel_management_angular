import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeView } from './fee-view';

describe('FeeView', () => {
  let component: FeeView;
  let fixture: ComponentFixture<FeeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
