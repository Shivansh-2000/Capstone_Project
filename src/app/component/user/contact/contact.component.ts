import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { contactModel } from './contact.modulas';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactModelObj : contactModel = new contactModel(); 
  constructor(private formbuilder: FormBuilder,private api: ApiService) { }
  contactForm =new FormGroup({
    fullName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
     //10-digit phone number valiadtion pattern
    phoneNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  })
  get fullName(){return this.contactForm.get('fullName')}
  get email(){return this.contactForm.get('email')}
  get phoneNo(){return this.contactForm.get('phoneNo')}
  
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.contactForm.valid) {
      alert("Thanks! We will Contact you soon.");
      this.contactForm.reset();
      this.postContactDetail();
    }else{
      alert("Please fill all the required fields.")
    }
  }

  postContactDetail(){
    this.contactModelObj.fullName = this.contactForm.value.fullName;
    this.contactModelObj.email = this.contactForm.value.email;
    this.contactModelObj.phoneNo = this.contactForm.value.phoneNo;
    this.contactModelObj.message = this.contactForm.value.message;

    this.api.postConatact(this.contactModelObj)
    .subscribe(res=>{
      console.log(res);
    },
    err=>{
      alert("Something Went Wrong");
    }
    )
  }
}
