import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { ProductModel } from '../admin-product/product.model';
import { categoryModel } from './category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  formValue !: FormGroup;
  categoryModelObj : categoryModel = new categoryModel();
  categoryData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      catName : [''],
    }) 
    this.getAllCategory();
  }
  clickAddCategory(){
    this.formValue.reset();
    this.showAdd = true;
  this.showUpdate = false;
  }
  postCategoryDetail(){
    this.categoryModelObj.catName = this.formValue.value.catName;
  

    this.api.postCategory(this.categoryModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Category Added Successfully")
      let ref =document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllCategory();
    },
    err=>{
      alert("Something went wrong in adding category!")
    })
  }


  getAllCategory(){
    this.api.getCategory()
    .subscribe(res=>{
      this.categoryData = res;
    })
  }

  deleteCategory(item:any){
    this.api.deleteCategory(item.catId)
    .subscribe(res=>{
      alert("Category Deleted.")
      this.getAllCategory();
    },err=>{
      alert("Failed to delete category.")
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.categoryModelObj.catId = row.catId;
    this.formValue.controls['catName'].setValue(row.catName);
  }

  UpdateCategoryDetail(){
    this.categoryModelObj.catName = this.formValue.value.catName;
 
    this.api.updateCategory(this.categoryModelObj,this.categoryModelObj.catId)
    .subscribe(res=>{
      alert("Category Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllCategory();
    },err=>{
      alert("Something went wrong while updating category!")
    })
  }

}
