import { Component, OnInit } from '@angular/core';
import { BankingOperations } from 'src/app/models/bankingOperations';
import { ApiBankingOperationsService } from 'src/app/api-banking-operations.service';

@Component({
  selector: 'app-scrollable-menu',
  templateUrl: './scrollable-menu.component.html',
  styleUrls: ['./scrollable-menu.component.css']
})
export class ScrollableMenuComponent implements OnInit {

  /**
   * Attributes
   */
  private bankingOperations: BankingOperations[];
  positive: boolean;

  /**
   * Constructor
   */
  constructor(private apiBankingOperationsService: ApiBankingOperationsService) { }

  /**
  * Get bank transactions from REST API
  */
  public getBankingOperations(): void {
    this.apiBankingOperationsService.getBankingOperations().subscribe(data => {
      this.bankingOperations = data;
    });
  }

  /**
   * Set bank transaction color
   */
  setBankTransactionColor() {
    this.apiBankingOperationsService.getBankingOperations().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (+data[i].bankingOperationValue < 0) {
          this.positive = false;
          // console.log(this.positive, +data[i].bankingOperationValue);
        } else {
          this.positive = true;
          // console.log(this.positive, +data[i].bankingOperationValue);
        }
      }
    });
  }

  printToto(event) {
    const stringToSplit = event.srcElement.innerText.split('');
    console.log(stringToSplit[stringToSplit.length - 2]);
  }

  ngOnInit() {
   /**
    * Get banking operations for REST API
    */
    this.getBankingOperations();

    this.setBankTransactionColor();

  }
}
