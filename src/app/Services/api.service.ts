import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  //<---------product CRUD----------->
  //will get user from database
  getProduct(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postProduct(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateProduct(data : any,id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  // <-------- category CRUD---------->

   //will get category data from database
   getCategory(){
    return this.http.get<any>("http://localhost:12000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will post data on server
  postCategory(data:any){
    return this.http.post<any>("http://localhost:12000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will edit data on server
  updateCategory(data : any,id: number){
    return this.http.put<any>("http://localhost:12000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will delete data from server
  deleteCategory(id:number){
    return this.http.delete<any>("http://localhost:12000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  // <--------user profile CRUD---------->

   //will get user data from database
   getUser(){
    return this.http.get<any>("http://localhost:8000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will post data on server
  postUser(data:any){
    return this.http.post<any>("http://localhost:8000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will edit data on server
  updateUser(data : any,id: number){
    return this.http.put<any>("http://localhost:8000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will delete data from server
  deleteUser(id:number){
    return this.http.delete<any>("http://localhost:8000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  // <--------admin profile CRUD---------->

   //will get user data from database
   getAdmin(){
    return this.http.get<any>("http://localhost:9000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will post data on server
  postAdmin(data:any){
    return this.http.post<any>("http://localhost:9000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will edit data on server
  updateAdmin(data : any,id: number){
    return this.http.put<any>(" http://localhost:9000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //will delete data from server
  deleteAdmin(id:number){
    return this.http.delete<any>(" http://localhost:9000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //<-------- contact form-------->
          // contact form
//post contact us data
postConatact(data: any){
  return this.http.post<any>("http://localhost:13000/posts",data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
//  <------user sign up------->
// user post
signUp(empObj : any){
  return this.http.post<any>("http://localhost:8000/posts",empObj)
}
//  <------user log in------->
// user login 
login(empObj : any){
  return this.http.get<any>("http://localhost:8000/posts",empObj)
}


}
