import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  constructor(private service:SharedService) { }
  textReport: string //Report text
  assignDate: any //report assign date
  @Input() empId: any //get employee id from details component
  @Input() managerId: any //get manager id from details component

  ngOnInit(): void {
    // set assign date
    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    this.assignDate = mm + '/' + dd + '/' + yyyy;


  }
  //Add new report to DB
  addReport() {
    //Create report object
    var report = {
      text: this.textReport,
      assign_date: this.assignDate,
      emp_id: this.empId,
      manager_id: this.managerId
    }
    console.log(report)
    //Check if report text is not empty of undefined
    if (typeof this.textReport === 'undefined' || this.textReport === "" ) {
      alert("Please enter text");
    }
    else {
      //Add report to db
      this.service.addReport(report).toPromise().then(res => {
        alert(res.toString())
      }).catch((err) => {
        console.log(err)
      })
    }



  }

}
