import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryModalPage } from './inventory-modal.page';

describe('InventoryModalPage', () => {
  let component: InventoryModalPage;
  let fixture: ComponentFixture<InventoryModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
