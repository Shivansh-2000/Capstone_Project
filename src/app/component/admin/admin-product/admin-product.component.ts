import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { ProductModel } from 'src/app/models/product.module';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  formValue !: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  productData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      image : ['',Validators.required],
      productName : ['',[Validators.required]],
      productDescription : ['',[Validators.required]],
      catName : ['',Validators.required],
      productPrice : ['',Validators.required]
    }) 
    this.getAllProduct();
  }
  clickAddProduct(){
    this.formValue.reset();
    this.showAdd = true;
  this.showUpdate = false;
  }
  postProductDetail(){
    this.productModelObj.image = this.formValue.value.image;
    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productDescription = this.formValue.value.productDescription;
    this.productModelObj.catName = this.formValue.value.catName;
    this.productModelObj.productPrice = this.formValue.value.productPrice;

    this.api.postProduct(this.productModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Product Added Successfully")
      let ref =document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllProduct();
    },
    err=>{
      alert("Something went wrong in adding product!")
    })
  }


  getAllProduct(){
    this.api.getProduct()
    .subscribe(res=>{
      this.productData = res;
    })
  }

  deleteProduct(item:any){
    this.api.deleteProduct(item.id)
    .subscribe(res=>{
      alert("Product Deleted.")
      this.getAllProduct();
    },err=>{
      alert("Failed to delete product.")
    })
  }

  onEdit(item : any){
    this.showAdd = false;
  this.showUpdate = true;
    this.productModelObj.id = item.id;
    this.formValue.controls['image'].setValue(item.image);
    this.formValue.controls['productName'].setValue(item.productName);
    this.formValue.controls['productDescription'].setValue(item.productDescription);
    this.formValue.controls['catName'].setValue(item.catName);
    this.formValue.controls['productPrice'].setValue(item.productPrice);
  }

  UpdateProductDetail(){
    this.productModelObj.image = this.formValue.value.image;
    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productDescription = this.formValue.value.productDescription;
    this.productModelObj.catName = this.formValue.value.catName;
    this.productModelObj.productPrice = this.formValue.value.productPrice;

    this.api.updateProduct(this.productModelObj,this.productModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref =document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllProduct();
    },err=>{
      alert("Something went wrong in updating product!")
    })
  }
  
}
