import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }

  GetAllBrands():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
  
}
