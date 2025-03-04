
import { Component, inject, OnInit } from '@angular/core';
import { WhislistService } from '../../core/services/whislist.service';
import { Iwhislist } from '../../shared/interfaces/iwhislist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly whislistService=inject(WhislistService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  wishlistData:Iwhislist[]=[];
  
  ngOnInit(): void {
    this.getWishlist()
  }

 getWishlist(){
  this.whislistService.Getloggeduserwishlist().subscribe({
    next:(res)=>{
      console.log(res);
      this.wishlistData=res.data;
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }

 removeItem(id:string){
  this.whislistService.Removeproductfromwishlist(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.getWishlist();
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }


 addTocart(id:string){
  this.cartService.AddProductToCart(id).subscribe({
    next:(res)=>{
        console.log(res);
        this.cartService.cartNumber.next(res.numOfCartItems);
        localStorage.setItem('userId',res.data.cartOwner);
        this.toastrService.success(res.message,'Fresh Cart');
        this.removeItem(id)
    },
    error:(err)=>{
          console.log(err)
    }
  })
}
  

}
