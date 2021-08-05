import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute) { }
  //Employee details
  employee: any
  manager : any
  emp_id: any
  manager_id: any
  ModalTitle: string
  ActivateAddReport: boolean = false;
  ngOnInit(): void {
    this.refreshEmp();
  }
  refreshEmp() {
    //Get employee id
    this.route.params.subscribe((params: Params) => this.emp_id = params['id']);
    //Get employee data from db
    this.service.getEmpById(this.emp_id).toPromise().then(res => {
      this.employee = res[0];
      //Check if exist direct manager to the current employee
      if (this.employee.manager !== null) {
        this.manager_id = this.employee.manager
        //Get manager details from db
        this.service.getEmpById(this.manager_id).toPromise().then(res => {
          this.manager = res[0]
        }).catch((err) => {
          console.log(err)
        });


      }
      //If direct manager not exist
      else {
        this.manager_id = null;
        this.manager = {
          "id": "-1",
          "first_name": "-",
          "last_name": ""

        }
      }
    }).catch((err2) => {
      console.log(err2)
    });


  }
  //Show add report popup
  addReport() {
    this.ModalTitle = "Add Report";
    this.ActivateAddReport = true;
  }
  //Close add report popup
  CloseClick() {
    this.ActivateAddReport = false;
    this.refreshEmp();
  }

}
