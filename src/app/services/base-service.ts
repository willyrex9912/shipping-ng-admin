import { HttpParams } from '@angular/common/http';

export abstract class BaseService {
  protected getParams(queryParams: Map<string, string>): HttpParams {
    return Array.from(queryParams.entries()).reduce((params: HttpParams, currentValue: [string, string]) => {
      if (currentValue && currentValue[0] && currentValue[1] != '') {
        params = params.set(currentValue[0], currentValue[1]);
      }
      return params;
    }, new HttpParams())
  }
}
