import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfBankTransactionsComponent } from './table-of-bank-transactions.component';

describe('TableOfBankTransactionsComponent', () => {
  let component: TableOfBankTransactionsComponent;
  let fixture: ComponentFixture<TableOfBankTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOfBankTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfBankTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
