import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }
   
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)


  myToken:any=localStorage.getItem('userToken');

  AddProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
    },
    
    )
  }

  GetUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:{
          token:this.myToken
        }
      }
    )
  }

  RemovespecificcartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers:{
          token:this.myToken
        }
      }
    )
  }



  Updatecartproductquantity(id:string,count:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": count
    },
    {
      headers:{
        token:this.myToken
      }
    }
    )
  }


  Clearusercart():Observable<any>{
   return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`,
    {
      headers:{
        token:this.myToken
      }
    }
   )
  }
}
