import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategorisationComponent } from './transaction-categorisation.component';

describe('TransactionCategorisationComponent', () => {
  let component: TransactionCategorisationComponent;
  let fixture: ComponentFixture<TransactionCategorisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCategorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCategorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
