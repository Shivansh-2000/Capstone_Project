import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import {  UserModel} from 'src/app/models/User.module';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {

  formValue !: FormGroup;
  userProfileModelObj : UserModel = new UserModel();
  userProfileData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      FirstName : ['',[Validators.required]],
      LastName : ['',[Validators.required]],
      Email : ['',[Validators.required,Validators.email]],
      Password : ['',[Validators.required,Validators.minLength(6)]],
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
    this.api.deleteUser(user.id)
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
    this.userProfileModelObj.userId = user.id;
    this.formValue.controls['FirstName'].setValue(user.FirstName);
    this.formValue.controls['LastName'].setValue(user.LastName);
    this.formValue.controls['Email'].setValue(user.Email);
    this.formValue.controls['Password'].setValue(user.Password);
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
