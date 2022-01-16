import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { adminProfileModel } from 'src/app/models/admin.module';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  formValue !: FormGroup;
  adminProfileModelObj : adminProfileModel = new adminProfileModel();
  adminProfileData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      email : ['',[Validators.required]],
      password : ['',[Validators.required]],
    }) 
    this.getAllAdmin();
  }
  clickAddAdmin(){
    this.formValue.reset();
    this.showAdd = true;
  this.showUpdate = false;
  }

  postAdminDetail(){
    this.adminProfileModelObj.email = this.formValue.value.email;
    this.adminProfileModelObj.password = this.formValue.value.password;
   
    this.api.postAdmin(this.adminProfileModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("One more Admin Added Successfully")
      let ref =document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllAdmin();
    },
    err=>{
      alert("Something went wrong while adding one admin!")
    })
  }
  getAllAdmin(){
    this.api.getUser()
    .subscribe(res=>{
      this.adminProfileData = res;
    })
  }

  deleteAdmin(admin:any){
    this.api.deleteUser(admin.id)
    .subscribe(res=>{
      alert("admin Deleted");
      this.getAllAdmin();
    },err=>{
      alert("Failed to delete admin")
    })
  }

  onEdit(admin : any){
    this.showAdd = false;
  this.showUpdate = true;
    this.adminProfileModelObj.adminId = admin.id;
    this.formValue.controls['email'].setValue(admin.email);
    this.formValue.controls['password'].setValue(admin.password);
  }
  UpdateAdminDetail(){
    this.adminProfileModelObj.email = this.formValue.value.email;
    this.adminProfileModelObj.password = this.formValue.value.password;
   
    this.api.updateAdmin(this.adminProfileModelObj,this.adminProfileModelObj.adminId)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllAdmin();
    },err=>{
      alert("Something went wrong while updating admin profile!")
    })
  }
}
