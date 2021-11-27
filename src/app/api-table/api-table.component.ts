import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-api-table',
  templateUrl: './api-table.component.html',
  styleUrls: ['./api-table.component.css']
})

export class ApiTableComponent implements OnInit {

  constructor(private api:ApiServiceService) { }
  dataSource:[] | any;
  dtOptions:DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  dataForm!: FormGroup;
  alert: boolean = false;
  deleteAlert:boolean=false;
  currentId!:number;
  updateData:[] | any;
  isupdate:boolean=false;


  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      pageLength: 10,
      lengthMenu: [10,15,25],
      processing: true
    }



    this.dataForm = new FormGroup({
      manufacturerName: new FormControl('',[ Validators.required,Validators.minLength(3)]),
      description: new FormControl('')
    });

    console.log("HHHHiiiiiiiii")
    this.getAllData()

  }

  getAllData(){
    this.api.getList().subscribe((result)=>{
      this.dataSource=result;
      this.dtTrigger.next();
      // console.log(result)
    })
  }


  get manufacturerName() {
    return this.dataForm?.get('manufacturerName');
  }



  formSubmit(){
    if(this.isupdate){
      console.log("update mode")
      this.update(this.currentId);
    }else{
      this.addElement();
    }
  }


  // window.location.reload();

  addElement(){
    this.api.saveData(this.dataForm.value).subscribe(() => {
      console.log('send');
      this.alert=true;
      this.getAllData();
      // $('#tblProjects').DataTable().ajax.reload();
      this.dataForm?.reset({});
    });

    console.log(this.dataForm.value)

  }

  updateForm(id:any){
    this.isupdate=true;
    this.currentId=id;
    this.api.getCurrentRoutes(id).pipe(first()).subscribe(
      x=>{
        console.log(x)
        console.log("HIiiiiiii")
        this.dataForm.patchValue(x)
      })
  }

  update(id:any){
    // .push(`manufacturerId : ${id}`)
      console.log("update method for api")
      this.updateData=this.dataForm.value;
      this.updateData["manufacturerId"]= id;
      console.log(this.updateData)
      console.log(" update method: ", this.updateData)
      this.api.updateData(id,this.updateData).subscribe((result)=>{
        console.log("updated")
        this.isupdate=false;
        this.getAllData();
        this.alert=true;
        this.dataForm?.reset({});
      })
  }



  deleteItem(id:number){
    console.log(id);
    this.api.deleteData(id).subscribe(() => {
      console.log('Delete');
      this.deleteAlert=true;
      this.getAllData();
      this.dataForm?.reset({});
    });
  }
}

