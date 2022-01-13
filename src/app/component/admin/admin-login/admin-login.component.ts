import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public adminloginForm !: FormGroup
  constructor(private formbuilder: FormBuilder,private http: HttpClient,private router: Router) { }


  ngOnInit(): void {
    this.adminloginForm = this.formbuilder.group({
      email:['',Validators.required,Validators.email],
      password:['',Validators.required]
    });
  }

  
  adminlogin(){
    this.http.get<any>("http://localhost:3000/signup")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
      return a.email === this.adminloginForm.value.email && a.passsword===this.adminloginForm.value.password;
});
if(user){
  alert("Admin Login Successfully!!");
  this.adminloginForm.reset();
  this.router.navigate(['/adminProduct'])
}else{
  alert("Admin not found!!")
}
    },err=>{
      alert("Something went wrong!!")
    })
  }
}

