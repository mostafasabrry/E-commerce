import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../shared/interfaces/product';
import { Interface } from 'readline';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productsService=inject(ProductsService);
  
  detailsProduct:Product|null=null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
         
          let productId=p.get('id');

          this.productsService.GetSpecificProducts(productId).subscribe({
             next:(res)=>{
              this.detailsProduct=res.data;
             },
             error:(err)=>{
                 console.log(err)
             }
          })
      }
     
    })

    
      
  

  }

}
