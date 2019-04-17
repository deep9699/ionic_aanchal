import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastOrderPage } from './past-order.page';

describe('PastOrderPage', () => {
  let component: PastOrderPage;
  let fixture: ComponentFixture<PastOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
