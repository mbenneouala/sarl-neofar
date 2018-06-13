import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BankingOperations } from 'src/app/container/model/bankingOperations';
import { Car } from 'src/app/table-of-operations/table-of-operations.component';



@Injectable({
  providedIn: 'root'
})
export class ApiBankingOperationsService {

  private _api = '/MoneyManager/getBankingOperations';  

  constructor(private http: Http) { }

  public getBankingOperations(): Observable<BankingOperations[]> {
    return this.http.get(environment._localhost + this._api).pipe(
                    map((res:Response) => res.json()));
  }

  getCarsSmall() {
    return this.http.get('/assets/cars-small.json')
                .toPromise()
                .then(res => <Car[]> res.json().data)
                .then(data => { return data; });
}
}
