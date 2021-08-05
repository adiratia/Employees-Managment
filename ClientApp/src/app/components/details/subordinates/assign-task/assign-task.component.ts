import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {
  taskText: any
  assignDate: any
  dueDate: string
  @Input() empId: any
  @Input() managerId: any
  constructor(private service: SharedService) { }

  ngOnInit() {
    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.assignDate = dd + '-' + mm + '-' + yyyy;

  }
  sendTask() {
    console.log(this.empId)
    var task = {
      text: this.taskText,
      assign_date: this.assignDate,
      due_date: this.dueDate,
      emp_id: this.empId,
      manager_id: this.managerId
    }
    console.log(task)
    if (typeof this.taskText === 'undefined' || this.taskText === "") {
      alert("Please enter text");
    }
    console.log(task)
    if (typeof this.dueDate === 'undefined' || this.dueDate === "") {
      alert("Please enter due date");
    }
    else {
      this.service.addTask(task).toPromise().then(res => {
        alert(res.toString())
      }).catch((err) => {
        console.log(err)
      })
    }

  }
}
