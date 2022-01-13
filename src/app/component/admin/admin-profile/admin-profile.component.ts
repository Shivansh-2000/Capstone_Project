import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { adminProfileModel } from './admin.modulas';

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
      adminEmail : [''],
      adminPassword : [''],
    }) 
    this.getAllAdmin();
  }
  clickAddAdmin(){
    this.formValue.reset();
    this.showAdd = true;
  this.showUpdate = false;
  }

  postAdminDetail(){
    this.adminProfileModelObj.adminEmail = this.formValue.value.adminEmail;
    this.adminProfileModelObj.adminPassword = this.formValue.value.adminPassword;
   
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
    this.adminProfileModelObj.id = admin.id;
    this.formValue.controls['adminEmail'].setValue(admin.adminEmail);
    this.formValue.controls['adminPassword'].setValue(admin.adminPassword);
  }
  UpdateAdminDetail(){
    this.adminProfileModelObj.adminEmail = this.formValue.value.adminEmail;
    this.adminProfileModelObj.adminPassword = this.formValue.value.adminPassword;
   
    this.api.updateAdmin(this.adminProfileModelObj,this.adminProfileModelObj.id)
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
