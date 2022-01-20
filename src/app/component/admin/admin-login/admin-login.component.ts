import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { adminProfileModel } from 'src/app/models/admin.module';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminloginForm !: FormGroup;
  adminProfileModelObj : adminProfileModel = new adminProfileModel();
  constructor(private formbuilder: FormBuilder,private http: HttpClient,private router: Router,private api : ApiService) { }


  ngOnInit(): void {
    this.adminloginForm = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  
  adminlogin(){
      this.adminProfileModelObj.adminEmail= this.adminloginForm.value.email;
      this.adminProfileModelObj.adminPassword= this.adminloginForm.value.Password;
      this.api.login(this.adminProfileModelObj)
    .subscribe(res=>{
      alert("Login Successfully!!");
      this.adminloginForm.reset();
      this.router.navigate(['/adminProduct'])
    })
  }
}

