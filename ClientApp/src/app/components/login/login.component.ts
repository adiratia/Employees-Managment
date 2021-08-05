import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: SharedService, private router: Router) { }
  username: any
  password:any
  ngOnInit() {
  }
  ngOnChange() {
    this.login()
  }
  login() {
    console.log(this.username, this.password)
    this.service.getUser(this.username).toPromise().then(data => {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          console.log("OK")
          if (data[0].password === this.password) {
            console.log("password correct")
            //Get employees list from api 
            this.service.getEmpList().toPromise().then(res => {
              console.log(res)
              if (Array.isArray(res)) {
                res.forEach(element => {
                  if (element.username == this.username) {
                    this.router.navigate(['/details', element.id]);

                  }
                })
              }



            }).catch((err) => {
              console.log(err)
            })
          }
          else {
            alert("Incorrect username or password")
          }



        }
        else {
          alert("Incorrect username or password")
        }
      }
      


    }).catch(err => {
      console.log(err)
    })
  }

}
