import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfOperationsComponent } from './table-of-operations.component';

describe('TableOfOperationsComponent', () => {
  let component: TableOfOperationsComponent;
  let fixture: ComponentFixture<TableOfOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOfOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
