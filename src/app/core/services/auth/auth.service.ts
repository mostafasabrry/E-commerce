import { JwtDecodeOptions } from './../../../../../node_modules/jwt-decode/build/esm/index.d';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { Itoken } from '../../../shared/interfaces/itoken';
import { Interface } from 'readline';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  private readonly router=inject(Router);

  userData:Itoken[]=[];

  SendRegisterForm(data:object):Observable<any>{
     return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  SendLoginForm(data:object):Observable<any>{
     return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  decodeTokenUser(){
    if(localStorage.getItem('userToken')!==null){
      this.userData=jwtDecode(localStorage.getItem('userToken')!);
      console.log(this.userData)
    }
  }

  //signout
  signOut(){
    localStorage.removeItem('userToken');
    this.userData=[];
    this.router.navigate(['/login'])

  }


  //forgetpass

  forgetPassApi(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  VerifyResetCode(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  ResetPass(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
