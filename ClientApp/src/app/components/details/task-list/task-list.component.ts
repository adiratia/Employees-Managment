import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() empId: any //Get employee id from details component
  tasks: any //Tasks list
  constructor(private service: SharedService) { }
  ngOnInit() {

  }

  ngOnChanges() {
    this.refreshList()

  }
  refreshList() {
    //Check if the employee id exist
    if (typeof this.empId !== 'undefined') {
      console.log(this.empId)
      //Get tasks by employee id from db
      this.service.getTaksByEmployee(this.empId).toPromise().then(res => {
        this.tasks = res;
      }).catch((err) => {
        console.log(err)
      });
    }

  }

}
