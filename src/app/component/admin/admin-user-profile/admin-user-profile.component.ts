import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { userProfileModel } from './userProfile.modulas';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {

  formValue !: FormGroup;
  userProfileModelObj : userProfileModel = new userProfileModel();
  userProfileData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      FirstName : [''],
      LastName : [''],
      Email : [''],
      Password : [''],
    }) 
    this.getAllUser();
  }
  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
  this.showUpdate = false;
  }

  postUserDetail(){
    this.userProfileModelObj.FirstName = this.formValue.value.FirstName;
    this.userProfileModelObj.LastName = this.formValue.value.LastName;
    this.userProfileModelObj.Email = this.formValue.value.Email;
    this.userProfileModelObj.Password = this.formValue.value.Password;
   
    this.api.postUser(this.userProfileModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("User Added Successfully")
      let ref =document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
    err=>{
      alert("Something went wrong while adding user!")
    })
  }
  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.userProfileData = res;
    })
  }

  deleteUser(user:any){
    this.api.deleteUser(user.userId)
    .subscribe(res=>{
      alert("User Deleted");
      this.getAllUser();
    },err=>{
      alert("Failed to delete user")
    })
  }

  onEdit(user : any){
    this.showAdd = false;
  this.showUpdate = true;
    this.userProfileModelObj.userId = user.userId;
    this.formValue.controls['userEmail'].setValue(user.userEmail);
    this.formValue.controls['userPassword'].setValue(user.userPassword);
  }
  UpdateUserDetail(){
    this.userProfileModelObj.FirstName = this.formValue.value.FirstName;
    this.userProfileModelObj.LastName = this.formValue.value.LastName;
    this.userProfileModelObj.Email = this.formValue.value.Email;
    this.userProfileModelObj.Password = this.formValue.value.Password;
   
    this.api.updateUser(this.userProfileModelObj,this.userProfileModelObj.userId)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref =document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },err=>{
      alert("Something went wrong while updating user profile!")
    })
  }
}
