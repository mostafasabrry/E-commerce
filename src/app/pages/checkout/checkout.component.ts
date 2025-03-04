import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly ordersService=inject(OrdersService);

   checkOutForm!:FormGroup;

   cartId:string='';

   ngOnInit(): void {
     this.checkOutForm=new FormGroup({
      details:new FormControl(null,[Validators.required]),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city:new FormControl(null,[Validators.required])
     })

     this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        
         this.cartId=p.get('id')!;
          localStorage.setItem('cartId',this.cartId);
      },
      error:(err)=>{
        console.log(err)
      }
     })
   }

   submitForm(){
   
    this.ordersService.checkOuyPayment(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
           console.log(res);
           open( res.session.url,'_self')
          
      },
      error:(err)=>{
          console.log(err)
      }
    })
   }
}
