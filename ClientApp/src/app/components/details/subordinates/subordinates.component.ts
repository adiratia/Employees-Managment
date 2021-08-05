import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-subordinates',
  templateUrl: './subordinates.component.html',
  styleUrls: ['./subordinates.component.css']
})
export class SubordinatesComponent implements OnInit {

  constructor(private service: SharedService) { }
  subordinatesList: any
  @Input() managerId: any // Get manager id from details component
  emp_id:any
  ModalTitle: string
  ActivateAssignTask: boolean = false; // boolean flag to open/close the
  ngOnInit() {
    this.ModalTitle ="Assign Task"
  }
  ngOnChanges() {
    this.refreshList()
  }
  refreshList() {
    //Get subordinates by manager id
    this.service.getEmpByManager(this.managerId).toPromise().then(res => {
      this.subordinatesList = res
    }).catch((err) => {
      console.log(err)
    });
  }
  //open assign task popup
  assignTask(empId: any) {
    this.emp_id = empId;
    console.log(empId)
    this.ModalTitle = "Assign Task";
   // this.ActivateAssignTask = true;
  }
  //Close assign task popup
  CloseClick() {
    this.ActivateAssignTask = false;
    this.refreshList();
  }

}
