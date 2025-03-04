import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrand } from '../../shared/interfaces/ibrand';
import Swal from 'sweetalert2';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-brands',
  imports: [NgxSpinnerComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService=inject(BrandsService);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);
  
  brands:Ibrand[]=[];
  ngOnInit(): void {
    this.getBrands();
  }


  getBrands(){
    this.brandsService.GetAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.brands=res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  reload(name:string){
    setTimeout(() => {
      this.ngxSpinnerService.hide('load2');
      Swal.fire({
        title: name,
        icon: "success",
        draggable: true
      });
    },500 );

    this.ngxSpinnerService.show('load2')
   
  }
}
