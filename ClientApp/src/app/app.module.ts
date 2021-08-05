import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SharedService } from './services/shared/shared.service';
import { ShowempComponent } from './components/employee/showemp/showemp.component';
import { DetailsComponent } from './components/details/details.component';
import { AddReportComponent } from './components/details/add-report/add-report.component';
import { ReportsListComponent } from './components/details/reports-list/reports-list.component';
import { SubordinatesComponent } from './components/details/subordinates/subordinates.component';
import { AssignTaskComponent } from './components/details/subordinates/assign-task/assign-task.component';
import { TaskListComponent } from './components/details/task-list/task-list.component'
import { LoginComponent } from './components/login/login.component'




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    EmployeeComponent,
    ShowempComponent,
    DetailsComponent,
    AddReportComponent,
    ReportsListComponent,
    SubordinatesComponent,
    AssignTaskComponent,
    TaskListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'list', component: EmployeeComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: '', component: LoginComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
