import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import e from 'express';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Icart } from '../../shared/interfaces/icart';
import { Interface } from 'readline';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,SweetAlert2Module,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  userCart:Icart={} as Icart;

  ngOnInit(): void {
    this.getUserCartData();
  }

  getUserCartData(){
     this.cartService.GetUserCart().subscribe({
      next:(res)=>{
        this.userCart=res.data;
      },
      error:(err)=>{
        console.log(err)
      }
     })
  }


  removeItem(id:string){
    this.cartService.RemovespecificcartItem(id).subscribe({
      next:(res)=>{
       
        this.userCart=res.data;
        this.cartService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  updataCount(id:string,count:number){
        this.cartService.Updatecartproductquantity(id,count).subscribe({
          next:(res)=>{
            console.log(res)
            this.userCart=res.data
           this.toastrService.success(res.status,'Update Cart')
          },
          error:(err)=>{
              console.log(err)
          }
        })
  }




  msgClear:string='';
  clearCart(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.Clearusercart().subscribe({
          next:(res)=>{
          
            this.msgClear=res.message;
            this.cartService.cartNumber.next(res.numOfCartItems)
            if(res.message=='success'){
              this.userCart={} as Icart;
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          },
          error:(err)=>{
            console.log(err)
          }
        })
        
      }
    });

 
  }
}
