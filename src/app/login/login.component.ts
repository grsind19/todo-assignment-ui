import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={email:'',password:''}
  constructor(private auth_service: AuthService,
      private toastr: ToastrService,
      private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.auth_service.login(this.user).then(data=>{
      this.auth_service.set_user(data.user);
      this.auth_service.set_token(data.access_token)
      this.router.navigate(['/todo/all'])
    }).catch(e=>{
      this.toastr.error(e.error.message, 'Login failed !!!', {
        timeOut: 3000
      })
    })
  }
}
