import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  filteredString :string ='';
  public productList : any;
  public searchTerm : string ='';
  public filterCategory: any;
  searchKey:string="";
  constructor(private api :ApiService,private cartService : CartService) { }

  ngOnInit(): void {
    //calling product from db
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
  }
  //will add item to cart
  addtocart(item:any){
    this.cartService.addToCart(item);
  }
  //search item from db
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category ==''){
        return a;
      }
    })
  }
}
