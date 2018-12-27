import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BankingOperations } from 'src/app/container/model/bankingOperations';

@Injectable({
  providedIn: 'root'
})
export class ApiBankingOperationsService {

  private _api = '/MoneyManager/getBankingOperations';

  constructor(private http: Http) { }

  /**
   * Get banking operations from REST API ws
   */
  public getBankingOperations(): Observable<BankingOperations[]> {
    return this.http.get(environment._localhost + this._api).pipe(
                    map((res: Response) => res.json()));
  }
}
