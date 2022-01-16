import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User.module';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public loginForm !: FormGroup
  public loginObj = new UserModel();
  constructor(private formbuilder: FormBuilder,private http: HttpClient,private router: Router,private api : ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      Email:[null,[Validators.required,Validators.email]],
      Password:[null,[Validators.required,Validators.minLength(6)]]
    });
  }
  
  login(){
  this.loginObj.Email= this.loginForm.value.email;
  this.loginObj.Password= this.loginForm.value.Password;
  this.api.login(this.loginObj)
.subscribe(res=>{
  alert("Login Successfully!!");
  this.loginForm.reset();
  this.router.navigate(['/home'])
})
  }
}
