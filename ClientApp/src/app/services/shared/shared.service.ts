import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //Api URL
  readonly APIUrl = "http://localhost:18676/api";
  constructor(private http: HttpClient) { }
  //Get employees list
  getEmpList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/employee');
  }
  //Add Employee to db
  addEmployee(val:any) {
    return this.http.post(this.APIUrl + '/employee/',val);
  }
  //Get employee by id
  getEmpById(val: any) {
    return this.http.get(this.APIUrl + '/employee/'+ val );
  }
  //Get employee by username
  getUser(username: any) {
    return this.http.get(this.APIUrl + '/user/' + username);
  }
  //Get employees by manager id
  getEmpByManager(val: any) {
    return this.http.get(this.APIUrl + '/employee/manager/' + val);
  }
  //Get reports by manager id
  getReportsByManager(val: any) {
    return this.http.get(this.APIUrl + '/report/' + val);
  }
  //Add new report to db
  addReport(val: any) {
    return this.http.post(this.APIUrl + '/report', val);
  }
  //Get Tasks by employee id
  getTaksByEmployee(val: any) {
    return this.http.get(this.APIUrl + '/task/' + val);
  }
  //Add new task to Db
  addTask(val: any) {
    return this.http.post(this.APIUrl + '/task', val);
  }

}
