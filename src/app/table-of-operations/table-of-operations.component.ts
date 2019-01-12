import { Component, OnInit, ViewChild } from '@angular/core';
import { BankingOperations } from '../models/bankingOperations';
import { ApiBankingOperationsService } from 'src/app/api-banking-operations.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Categories } from 'src/app/table-of-operations/model/categories';
import { LazyLoadEvent } from 'primeng/api';
import { ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import {Message} from 'primeng/components/common/api';
import * as XLSX from 'ts-xlsx';


@Component({
  selector: 'app-table-of-operations',
  templateUrl: './table-of-operations.component.html',
  styleUrls: ['./table-of-operations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableOfOperationsComponent implements OnInit {

  /**
   * Attributes
   */
  private listDes = 'Liste des';
  private sumOfOperations = 0;
  private categories: string[] = ['Courses', 'Transports en commun', 'Abonnements', 'Loisirs'];
  private categorySelected = false;
  private selectedOperationForCategorization = [];
  private bo: BankingOperations[];
  private totalRecords: number;
  private loading: boolean;
  private uberCategory: Categories = new Categories();
  private sum = 0;
  private categoryName: string;
  private msgs: Message[] = [];
  private bankingOperations: BankingOperations[];
  cols: any[];

  /**
   * Constructor
   * @param apiBankingOperationsService
   */
  constructor(private apiBankingOperationsService: ApiBankingOperationsService) { }

  /**
   * Handle a row in the banking operations table
   * @param row
   */
  private selectOperationOnRowClick(row) {
    if (row.bankingOperationValue < 0 && !this.selectedOperationForCategorization.includes(row)) {
      this.selectedOperationForCategorization.push(row);
      console.log('this.selectedOperationForCategorization');
      console.log(this.selectedOperationForCategorization);
      this.sumOfOperations += -(Math.round(row.bankingOperationValue).toFixed(2));
    }
  }

  /**
   * Fetch operations to selected category
   * @param isSelectedCategory
   */
  private addOperationToSelectedCategory(isSelectedCategory): void {
    this.initializeSumOfOperations();
    this.categorySelected = true;
    if (isSelectedCategory) {
      this.selectedOperationForCategorization = [];
      this.categoryName = isSelectedCategory;
    }
  }

  /**
   * Create a new banking category
   * @param newCategory
   */
  private createOperationCategory(newCategory: string) {
    if (newCategory) {
      this.categories.push(newCategory);
    }
  }

  /**
   * Initialise sum of operations
   */
  private initializeSumOfOperations(): void {
    this.sumOfOperations = 0;
  }

  /**
   * NOT WORKING: calculate the sum of categorized operations: not used
   * @param operationValue
   */
  private doSumOfCategorizedOperations(operationValue: number) {
    // this.myCategory.sumOfOperationsCategory += -(operationValue);
  }

  /**
   * Get banking operations for REST API
   */
  private getBankingOperations(): void {
    this.apiBankingOperationsService.getBankingOperations().subscribe(data => {
      this.bankingOperations = data;
      // this.totalRecords = this.bankingOperations.length; // enable when lazy loading
    });
  }

  /**
   * DISABLED: get UBER operations from SUBSCRIBING REST API
   */
  private getUberOperationsApi(): void {
    this.apiBankingOperationsService.getBankingOperations().subscribe(data => {
      for (let i = 0; i < this.bankingOperations.length; i++) {
        // if(this.bankingOperations[i].bankingOperationLabel.includes("UBER")) {
        //   this.tempBankingOperations.push(this.bankingOperations[i]);
        //   this.sum += -(parseFloat(this.bankingOperations[i].bankingOperationValue));
        // }
      }
      // this.uberCategory = new Categories("UBER", this.tempBankingOperations, this.sum);
    });
  }

    /**
   * get UBER operations from excel FILE
   */
  private getUberOperations(): void {
    for (let i = 0; i < this.bankingOperations.length; i++) {
      if (this.bankingOperations[i].bankingOperationLabel.includes('UBER')) {
        this.uberCategory.listOfCategorizedBankingOperations.push(this.bankingOperations[i]);
        this.sum += -(parseFloat(this.bankingOperations[i].bankingOperationValue));
      }
    }
    console.log(this.sum);
  }

  /**
   * DISABLED: Get banking operations from REST API with Lazy Loading (to enable this function,
   * set [lazy]="true" & [value]="bo" in the p-table HTML tag)
   * @param event
   */
  loadLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
        if (this.bankingOperations) {
            this.bo = this.bankingOperations.slice(event.first, (event.first + event.rows));
            this.loading = false;
        }
    }, 10);
  }

  /**
   * Display a message when sum of operations is initialized
   */
  showInfo() {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Info Message', detail: 'Sum of operations was successfully initialized'});
  }

  ngOnInit() {
    /* Get banking operations from REST API */
    this.getBankingOperations();

    this.cols = [
      { field: 'bankingOperationDate', header: 'Date', width: '10%'},
      { field: 'bankingOperationLabel', header: 'Libéllé', width: '25%' },
      { field: 'bankingOperationValue', header: 'Valeur', width: '10%' },
      { field: 'bankingOperationType', header: 'Type', width: '10%' }
  ];
  }
}
