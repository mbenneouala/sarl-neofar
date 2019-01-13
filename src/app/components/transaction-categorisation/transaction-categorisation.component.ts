import { Component, OnInit } from '@angular/core';
import { BankingOperations } from 'src/app/models/bankingOperations';
import { Categories } from 'src/app/models/categories';
import { ApiBankingOperationsService } from 'src/app/api-banking-operations.service';
import { stringConst } from 'src/environments/stringConst';


@Component({
  selector: 'app-transaction-categorisation',
  templateUrl: './transaction-categorisation.component.html',
  styleUrls: ['./transaction-categorisation.component.css']
})
export class TransactionCategorisationComponent implements OnInit {

  /**
   * Attributes
   */
  private bankingOperations: BankingOperations[];
  private cols: { field: string; header: string; width: string; }[];
  private categories: string[] = ['Courses', 'Transports', 'Abonnements', 'Loisirs'];
  private selectedCategory: string;
  private newCategory: Categories;
  private listOfCategories = [];
  private sumOfCourses = 0;
  private sumOfTransportsEnCommun = 0;
  private sumOfAbonnements = 0;
  private sumOfLoisirs = 0;
  private sumOfNewCategory = 0;
  private addedCategory: string;
  private temporaryListOfCategories: Categories;


  /**
   * Constructor
   */
  constructor(private apiBankingOperationsService: ApiBankingOperationsService) { }

  /**
  * Get banking operations for REST API
  */
  private getBankingOperations(): void {
    this.apiBankingOperationsService.getBankingOperations().subscribe(data => {
      this.bankingOperations = data;
      // this.totalRecords = this.bankingOperations.length; // enable IF lazy loading
    });
  }


  /**
   * Select a category
   *
   * @param isSelectedCategory
   */
  private onRadioButtonClick(isSelectedCategory): void {
    if (isSelectedCategory) {
      this.selectedCategory = isSelectedCategory;
    }
  }

  /**
 * Add operation to the category cell when row selected
 * @param event
 */
  private onRowSelect(event) {
    if (this.selectedCategory) {
      event.data.bankingOperationCategory = this.selectedCategory;
      if (this.newCategory != null
        && !this.newCategory.listOfCategorizedBankingOperations.includes(event.data)
        && !['Courses', 'Transports', 'Abonnements', 'Loisirs'].includes(this.selectedCategory)) {
        this.newCategory.name = this.selectedCategory;
        this.newCategory.listOfCategorizedBankingOperations.push(event.data);
        this.newCategory.sumOfCategorizedOperations += -(event.data.bankingOperationValue);
        if (this.temporaryListOfCategories.name !== this.newCategory.name) {
          this.temporaryListOfCategories = this.newCategory;
          this.listOfCategories.push(this.newCategory);
        }
      }
    }
  }

  /**
* Create a new banking category
* @param newCategory
*/
  private createOperationCategory(pNewCategory: string) {
    if (pNewCategory) {
      this.addedCategory = pNewCategory;
      if (!this.categories.includes(this.addedCategory)) {
        this.categories.push(this.addedCategory);
        this.newCategory = new Categories();
        this.temporaryListOfCategories = new Categories();
      }
    }
  }

  /**
 * Add existing peration to a category when row selected
 * @param event
 */
  private categoriseOnRowClick(event) {
    switch (this.selectedCategory) {
      case stringConst.courses: {
        this.sumOfCourses += -(event.data.bankingOperationValue);
        break;
      }
      case stringConst.transports: {
        this.sumOfTransportsEnCommun += -(event.data.bankingOperationValue);
        break;
      }
      case stringConst.abonnements: {
        this.sumOfAbonnements += -(event.data.bankingOperationValue);
        break;
      }
      case stringConst.loisirs: {
        this.sumOfLoisirs += -(event.data.bankingOperationValue);
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * Initialise sum of operations which are categorized
   */
  public initialise() {
    this.newCategory.sumOfCategorizedOperations = 0;
  }

  ngOnInit() {
    this.getBankingOperations();

    this.cols = [
      { field: 'bankingOperationDate', header: 'Date', width: '10%' },
      { field: 'bankingOperationLabel', header: 'Libéllé', width: '25%' },
      { field: 'bankingOperationValue', header: 'Valeur', width: '10%' },
      { field: 'bankingOperationType', header: 'Type', width: '10%' },
      { field: 'bankingOperationCategory', header: 'Catégorie', width: '10%' }
    ];
  }

}
