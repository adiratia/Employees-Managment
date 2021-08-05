import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-showemp',
  templateUrl: './showemp.component.html',
  styleUrls: ['./showemp.component.css']
})
export class ShowempComponent implements OnInit {

  constructor(private service: SharedService, private router: Router) { }
  
    employeeList:any[] // Employees list array
    ngOnInit(): void {
      this.refreshEmpList();
    }
  refreshEmpList() {
    //Get employees list from api 
    this.service.getEmpList().toPromise().then(data => {
      this.employeeList = data;
    }).catch((err) => {
      console.log(err)
    })
  }
    //Click on View buttun
  clickView(id: number) {
      //Navigate to employee details page
      this.router.navigate(['/details',id]);
    }
}
