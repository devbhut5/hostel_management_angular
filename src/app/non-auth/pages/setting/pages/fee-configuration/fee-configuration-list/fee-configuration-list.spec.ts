import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeConfigurationList } from './fee-configuration-list';

describe('FeeConfigurationList', () => {
  let component: FeeConfigurationList;
  let fixture: ComponentFixture<FeeConfigurationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeConfigurationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeConfigurationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
