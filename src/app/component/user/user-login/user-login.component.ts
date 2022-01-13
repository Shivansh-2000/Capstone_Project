import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public loginForm !: FormGroup
  constructor(private formbuilder: FormBuilder,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      Email:['',Validators.required,Validators.email],
      Password:['',Validators.required]
    });
  }
  
  login(){
    this.http.get<any>("http://localhost:3000/signup")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
      return a.email === this.loginForm.value.email && a.passsword===this.loginForm.value.password;
});
if(user){
  alert("Login Successfully!!");
  this.loginForm.reset();
  this.router.navigate(['/home'])
}else{
  alert("User not found!!")
}
    },err=>{
      alert("Something went wrong!!")
    })
  }
}
