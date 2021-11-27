import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'https://xyz.com/dempAPI';//use your url here

  constructor(private http:HttpClient) { }


  getList() {
    return this.http.post(`${this.url}/GetAll`,"");
  }

  saveData(data:any){
    console.log(data);
    return this.http.post(`${this.url}/Post`, data);
  }

  // http://159.65.151.134/api/ManufacturerAPI/Delete/421
  deleteData(id:number){
    console.log(id);
    return this.http.delete(`${this.url}/Delete/${id}`);
  }

  getCurrentRoutes(id: number) {
    return this.http.post(`${this.url}/Get/${id}`,'');
  }


  updateData(id:number,data:any){
    console.log("service page :" ,data)
    return this.http.put(`${this.url}/Put/${id}`,data);
    // http://159.65.151.134/api/ManufacturerAPI/Put/416
  }

}
