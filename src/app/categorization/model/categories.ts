import { BankingOperations } from "src/app/container/model/bankingOperations";

export class Categories {
    name: string;
    sumOfCategorizedOperations: number = 0;
    listOfCategorizedBankingOperations: BankingOperations[] = [];

    constructor(){
    }
}