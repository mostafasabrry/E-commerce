import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  isLoading:boolean=false;
  isSuccess:string='';
  msgError:string='';

  loginForm:FormGroup=this.formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{8,20}$/)]]
  })


  submitLogin(){
    console.log(this.loginForm);
    

    if(this.loginForm.valid){
      this.isLoading=true;
      this.authService.SendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
            //1-save token
            localStorage.setItem('userToken',res.token);
            //2-decode token
            this.authService.decodeTokenUser();
            

            this.isLoading=false;
            if(res.statusMsg="success"){
                this.isSuccess=res.message;
                setTimeout(() => {
                  this.router.navigate(['/home']);
                }, 500);
               

            }
        },
        error:(err)=>{
          console.log(err);
          this.isLoading=false;
          this.msgError=err.error.message;
        }
  
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
   
  }

}
