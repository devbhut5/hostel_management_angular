import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeConfigurationView } from './fee-configuration-view';

describe('FeeConfigurationView', () => {
  let component: FeeConfigurationView;
  let fixture: ComponentFixture<FeeConfigurationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeConfigurationView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeConfigurationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
