import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableOfOperationsComponent } from 'src/app/table-of-operations/table-of-operations.component';
import { TableOfBankTransactionsComponent } from './components/table-of-bank-transactions/table-of-bank-transactions.component';
import { TransactionCategorisationComponent } from './components/transaction-categorisation/transaction-categorisation.component';

const routes: Routes = [
  // { path: 'myAccount', component: TableOfOperationsComponent },
  { path: 'Categorisation', component: TransactionCategorisationComponent },
  { path: 'table-of-bank-transactions', component: TableOfBankTransactionsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
