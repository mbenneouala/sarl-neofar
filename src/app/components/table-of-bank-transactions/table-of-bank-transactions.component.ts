import { Component, OnInit } from '@angular/core';
import { BankingOperations } from 'src/app/models/bankingOperations';
import { ApiBankingOperationsService } from 'src/app/api-banking-operations.service';

@Component({
  selector: 'app-table-of-bank-transactions',
  templateUrl: './table-of-bank-transactions.component.html',
  styleUrls: ['./table-of-bank-transactions.component.css']
})
export class TableOfBankTransactionsComponent implements OnInit {

  /**
   * Attributes
   */
  private bankingOperations: BankingOperations[];
  private cols: { field: string; header: string; width: string; }[];

  /**
   * Constructor
   */
  constructor(private apiBankingOperationsService: ApiBankingOperationsService) { }

  /**
  * Get banking operations for REST API
  */
  public getBankingOperations(): void {
    this.apiBankingOperationsService.getBankingOperations().subscribe(data => {
      this.bankingOperations = data;
      // this.totalRecords = this.bankingOperations.length; // enable IF lazy loading
    });
  }

  ngOnInit() {
   /**
    * Get banking operations for REST API
    */
    this.getBankingOperations();

    this.cols = [
      { field: 'bankingOperationDate', header: 'Date', width: '10%' },
      { field: 'bankingOperationLabel', header: 'Libéllé', width: '25%' },
      { field: 'bankingOperationValue', header: 'Valeur', width: '10%' }
    ];
  }

}
