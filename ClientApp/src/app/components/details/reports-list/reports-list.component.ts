import { Component, Input, OnInit } from '@angular/core';
import { report } from 'process';
import { SharedService } from '../../../services/shared/shared.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  constructor(private service: SharedService) {
  }
  @Input() managerId: any //Get manager id from details component
  reports: any //Reports list
  EmpReporters: Array<any> =new Array();
  ngOnInit() {

  }
  ngOnChanges() {
    this.refreshList()
  }

   refreshList() {
     console.log(this.managerId)
     //Check if manager id exist
     if (typeof this.managerId !== 'undefined') {
        //Get report from db by manager id
         this.service.getReportsByManager(this.managerId).toPromise().then(res => {
           this.reports = res;
           //For each report get the reporter details
           for (let r of this.reports) {
             console.log(r)
             //Get the reporter details from DB
             this.service.getEmpById(r.emp_id).toPromise().then(function (result) {
               //Create object with the reporter name
               var EmployeeReport = {
                 empId: r.emp_id,
                 assign_date: r.assign_date,
                 text: r.text,
                 first_name: result[0].first_name,
                 last_name: result[0].last_name,
               }
              //Push the object to Employee reporter array
               this.EmpReporters.push(EmployeeReport)
             }.bind(this)
             ).catch((err) => {
               console.log(err)
             })
           }
          
         }).catch((err2) => {
           console.log(err2)
         });
    }

  }

}
