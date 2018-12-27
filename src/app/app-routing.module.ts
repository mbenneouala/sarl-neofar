import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableOfOperationsComponent } from 'src/app/table-of-operations/table-of-operations.component';
import { CategorizationComponent } from './categorization/categorization.component';
import { TableOfBankTransactionsComponent } from './components/table-of-bank-transactions/table-of-bank-transactions.component';


const routes: Routes = [
  { path: 'myAccount', component: TableOfOperationsComponent },
  { path: 'Categorisation', component: CategorizationComponent },
  { path: 'table-of-bank-transactions', component: TableOfBankTransactionsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
