import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Iorder } from '../../shared/interfaces/iorder';
import { FormArray } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit  {
  private readonly ordersService=inject(OrdersService);
 
  allorders:Iorder|null={} as Iorder ;
   
  ngOnInit(): void {
    let userId=localStorage.getItem('userId')!;
    console.log(userId)
     this.getOrders(userId);
     
  }

  
  getOrders(id:string):void{
    this.ordersService.getUserOrders(id).subscribe({
      next:(res)=>{
        
          console.log(res[res.length - 1]);
          this.allorders=res[res.length - 1];
          
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  

  

}
