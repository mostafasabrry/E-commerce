import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productSearch:Product[],word:string): Product[] {
    
    return productSearch.filter((item)=>item.title.toUpperCase().includes(word.toUpperCase()));
  }

}
