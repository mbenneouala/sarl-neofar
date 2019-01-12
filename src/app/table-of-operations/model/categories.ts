import { BankingOperations } from '../../models/bankingOperations';

export class Categories {
    name: string;
    sumOfCategorizedOperations = 0;
    listOfCategorizedBankingOperations: BankingOperations[] = [];

    constructor() {}
}
