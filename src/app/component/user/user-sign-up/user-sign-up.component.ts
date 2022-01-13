import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formbuilder: FormBuilder,private http: HttpClient,private router: Router,private api : ApiService) { }

  ngOnInit(): void {
    this.signupForm= this.formbuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',Validators.required,Validators.email],
      Password:['',Validators.required],
    });
  }
  signUp(){
    this.api.signUp(this.signupForm.value)
    .subscribe(res=>{
      alert("Sign Up Successfull")
      this.signupForm.reset();
        this.router.navigate(['/UserLogin'])
    },err=>{
      alert("Something went wrong")
    })
  }
}
