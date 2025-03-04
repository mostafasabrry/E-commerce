import { WhislistService } from './../../core/services/whislist.service';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../shared/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,CurrencyPipe,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly categoriesService=inject(CategoriesService);
  private readonly whislistService=inject(WhislistService);
  private readonly toastrService=inject(ToastrService);
  text:string='';
  
 


  

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
     items: 1,
     autoplay:true,
     autoplaySpeed:3000,
    nav: false,
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:false,
    navText: ['<i class="fa-solid fa-circle-arrow-left text-green-600"></i>', '<i class="fa-solid fa-circle-arrow-right  text-green-600"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
   products:Product[]=[];
  getAllproducts(){
    this.productsService.GetAllProducts().subscribe({
      next:(res)=>{
      
         this.products=res.data;
         
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
 

  categories:Icategory[]=[]
  getAllCategories(){
    
     this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
         this.categories=res.data;
       
      },
      error:(err)=>{
        console.log(err);
       
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
        },
        error:(err)=>{
              console.log(err)
        }
      })
  }

 
  


wishlistView: string[] = []; 

ngOnInit(): void {
  this.getAllproducts();
  this.getAllCategories();

  this.whislistService.Getloggeduserwishlist().subscribe({
    next: (res) => {
      this.wishlistView = res.data.map((item: any) => item._id);
      this.whislistService.wishlist.next(this.wishlistView);
    },
    error: (err) => {
      console.log('Error fetching wishlist:', err);
    }
  });
}

toggleWishlist(id: string) {
  if (this.wishlistView.includes(id)) {

    this.whislistService.Removeproductfromwishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        this.wishlistView = res.data;
      },
      error: (err) => {
        console.log('Error removing from wishlist:', err);
      }
    });
  } else {
  
    this.whislistService.Addproducttowishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        this.wishlistView = res.data;
      },
      error: (err) => {
        console.log('Error adding to wishlist:', err);
      }
    });
  }
}



  
}
