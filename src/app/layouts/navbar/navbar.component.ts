import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly authService=inject(AuthService);
  private readonly cartService=inject(CartService);
 
  countNumber:number=0;
   isMain=input<boolean>(true);

   logOut(){
       this.authService.signOut();
   }

   ngOnInit(): void {

    this.cartService.GetUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.next( res.numOfCartItems)
      }
    })
    this.cartService.cartNumber.subscribe({
      next:(data)=>{
        this.countNumber=data
      }
    })
   }
}
