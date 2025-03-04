import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  isLoading:boolean=false;
  step:number=1;
  isSuccess:string='';
  msgError:string='';


  verifyEmailForm:FormGroup=this.formBuilder.group({
     email:[null,[Validators.required,Validators.email]]
  });


  verifyCodeForm:FormGroup=this.formBuilder.group({
    resetCode:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
 });


 rePassForm:FormGroup=this.formBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  newPassword:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{8,20}$/)]]
});


submitEamil(){
  if(this.verifyEmailForm.valid){
    
    this.rePassForm.get('email')?.patchValue(this.verifyEmailForm.get('email')?.value);
    this.isLoading=true;
    this.authService.forgetPassApi(this.verifyEmailForm.value).subscribe({
      next:(res)=>{
            this.isLoading=false;
          
            this.isSuccess=res.statusMsg;
            setTimeout(() => {
              this.step=2;
              this.isSuccess='';
            }, 500);
  
      },
      error:(err)=>{
         console.log(err);
         this.msgError='invaild email'
        setTimeout(() => {
          this.msgError=''
        }, 900);
         this.isLoading=false;
      }
    })
  }
}


submitCode(){
  if(this.verifyCodeForm.valid){
    this.isLoading=true;
    this.authService.VerifyResetCode(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
            this.isLoading=false;
            
            this.isSuccess=res.status;
            setTimeout(() => {
              this.step=3;
              this.isSuccess='';
            }, 500);
  
      },
      error:(err)=>{
         console.log(err);
         this.msgError='invaild code'
         setTimeout(() => {
           this.msgError=''
         }, 900);
         this.isLoading=false;
      }
    })
  }
 
}


submitRepass(){
  if(this.rePassForm.valid){
    this.isLoading=true;
    this.authService.ResetPass(this.rePassForm.value).subscribe({
      next:(res)=>{
            this.isLoading=false;
            console.log(res)
            this.isSuccess=res.statusMsg;
            localStorage.setItem('userToken',res.token);
            this.authService.decodeTokenUser();
            setTimeout(() => {
             this.router.navigate(['/home'])
              this.isSuccess='';
            }, 500);
  
      },
      error:(err)=>{
         console.log(err);
         this.msgError='invaild pass'
        setTimeout(() => {
          this.msgError=''
        }, 900);
         this.isLoading=false;
      }
    })
  }
  
}







}
