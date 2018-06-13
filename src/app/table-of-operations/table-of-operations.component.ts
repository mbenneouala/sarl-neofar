import { Component, OnInit, ViewChild } from '@angular/core';
import { BankingOperations } from 'src/app/container/model/bankingOperations';
import { ApiBankingOperationsService } from 'src/app/api-banking-operations.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from 'src/app/table-of-operations/model/categories';
import { SelectedOperationForCategorization } from 'src/app/table-of-operations/model/selectedOperationForCategorization';



export interface Car {
  vin;
  year;
  brand;
  color;
}

export class IValueOfLov {
  label;
  value;
  longdescription;
  valueSeqOrder;

  constructor(label: string, value: string, longdescription: string, valueSeqOrder: string) {
    this.label = label;
    this.value = value;
    this.longdescription = longdescription;
    this.valueSeqOrder = valueSeqOrder;
  }
}

export class ListOfValues {
  public data: IValueOfLov[];
  public lovName: string;
  public seqOrder: string;

  constructor(pData: IValueOfLov[], pLovName: string, pSeqOrder: string) { 
    this.data = pData;
    this.lovName = pLovName;
    this.seqOrder = pSeqOrder;
  }

  public setLovName(pLoveName: string): void {
    this.lovName = pLoveName;
  }
}

@Component({
  selector: 'app-table-of-operations',
  templateUrl: './table-of-operations.component.html',
  styleUrls: ['./table-of-operations.component.css']
})
export class TableOfOperationsComponent implements OnInit {
  cols: { field: string; header: string; }[];

  cars: any;


  /* Attributes */
  private listDes: string = 'Liste des';
  private tableHeaders = ['bankingOperationLabel', 'bankingOperationValue'];
  private bankingOperations: BankingOperations[] = [];
  private sumOfOperations: number = 0;
  private categories: string[] = ['Courses', 'Transports en commun', 'Abonnements', 'Loisirs'];
  private myCategory = new Category;
  private categorySelected: boolean = false;
  private selectedOperationForCategorization: SelectedOperationForCategorization[] = [];

  /* Constructor */
  constructor(private apiBankingOperationsService : ApiBankingOperationsService) { }

  /* Select a banking operation with a click */
  private selectOperationOnRowClick(row) {
    if (row.bankingOperationValue < 0 && !this.selectedOperationForCategorization.includes(row)) {
      this.selectedOperationForCategorization.push(row);
      this.sumOfOperations += -(Math.round(row.bankingOperationValue).toFixed(2));
      console.log("this.sumOfOperations=")     
      console.log(this.sumOfOperations)     
      
    }
  }

  /* Fetch operations to selected category*/
  private addOperationToSelectedCategory(isSelectedCategory): void {
    this.initializeSumOfOperations();
    this.categorySelected = true;
    if(isSelectedCategory) {
      this.selectedOperationForCategorization = [];
      this.myCategory.name = isSelectedCategory;
    }
  }

  /* Create a new banking category */
  private createOperationCategory(newCategory: string) {
    if(newCategory) {
      this.categories.push(newCategory);
    }
  }

  /* Initialise sum of operations */
  private initializeSumOfOperations(): void {
    this.sumOfOperations = 0;
  }

  /* calculate the sum of categorized operations: not used */
  private doSumOfCategorizedOperations(operationValue: number) {
    this.myCategory.sumOfOperationsCategory += -(operationValue);
  }

  /* get banking operations for REST API */
  private getBankingOperations(): void {
    this.apiBankingOperationsService.getBankingOperations().subscribe(data => {
      this.bankingOperations = data;
    });          
  }

  valueOfLov: IValueOfLov[] = [];
  
  listOfValues: ListOfValues;

  listOfValuesWithoutDuplicates: ListOfValues;

  /**
   * Set the list of values
   */
  setListOfValues(): void {

    this.valueOfLov.push(new IValueOfLov('a','r','s','p'));
    this.valueOfLov.push(new IValueOfLov('z','d','x','m'));
    this.valueOfLov.push(new IValueOfLov('g','b','v','c'));
    this.valueOfLov.push(new IValueOfLov('g','b','v','c'));
    
    this.listOfValues = new ListOfValues(this.valueOfLov, "LOV_NAME", "SEQ_ORDER");

    console.log("List of values")
    console.log(this.listOfValues);
  }

  /**
   * Remove duplicates from the list of values
   */
  removeDuplicatesInListOfValues(): void {
    // this.listOfValues.data.filter((el, i, a) => i === a.indexOf(el));
    // this.listOfValues.data = Array.from(new Set(this.listOfValues.data));

    var newarr = [this.listOfValues.data[0]];
    for (var i=1; i<this.listOfValues.data.length; i++) {
       if (this.listOfValues.data[i].label!=this.listOfValues.data[i-1].label) {
        newarr.push(this.listOfValues.data[i]);
       }

    }
    console.log("List of values WITHOUT duplicates")
    console.log(newarr);
  }

  /**
   * Sort the list of values
   */
  sortListOfValues(): void {
    this.listOfValues.data.sort((leftSide, rightSide): number => {
      if(leftSide.label < rightSide.label) return -1;
      if(leftSide.label > rightSide.label) return 1;
      return 0;
    });
    console.log("List of sorted values by label")
    console.log(this.listOfValues);
  }
  
  ngOnInit() {
    //this.setListOfValues();
    //this.sortListOfValues();
    //this.removeDuplicatesInListOfValues();

    this.getBankingOperations(); 

    this.apiBankingOperationsService.getCarsSmall().then(cars => this.cars = cars);
    
            this.cols = [
                { field: 'vin', header: 'Vin' },
                { field: 'year', header: 'Year' },
                { field: 'brand', header: 'Brand' },
                { field: 'color', header: 'Color' }
            ];
  }
  
}
