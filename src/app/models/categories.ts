import { BankingOperations } from './bankingOperations';

export class Categories {
    name: string;
    sumOfCategorizedOperations = 0;
    listOfCategorizedBankingOperations: BankingOperations[] = [];

    constructor() {

    }
}
