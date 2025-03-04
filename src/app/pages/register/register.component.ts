import { Component, inject } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
   msgErorr:string='';
  isSuccess:string='';
  isLoading:boolean=false;

  register:FormGroup=this.formBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{8,20}$/)]],
    rePassword:[null,[Validators.required]],
  },{validators:[this.confirmPassword]} )


  submitRegister(){
    if(this.register.valid){
      this.isLoading=true;
      this.authService.SendRegisterForm(this.register.value).subscribe({
         next:(res)=>{
            console.log(res);
            if(res.message==='success'){
             
              setTimeout(() => {
              this.router.navigate(['/login'])
                }, 500);

               this.isSuccess=res.message;
            }

            this.isLoading=false;
           
         },
         error:(err)=>{
          console.log(err);
           this.msgErorr=err.error.message;
           this.isLoading=false;
         }
      })
    }
    else{
       this.register.setErrors({mismatch:true});
       this.register.markAllAsTouched();
    }
    
  }

  confirmPassword(group:AbstractControl){
    const pass=group.get('password')?.value;
    const rePass=group.get('rePassword')?.value;
    if(pass===rePass){
       return null;
    }else{
       return {mismatch:true}
    }
  }



  
}
