import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = { email: '', password: '' }
  constructor(private auth_service: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }
  sign_up() {
    this.auth_service.sign_up(this.user).then(data => {
      this.auth_service.set_user(data.user);
      this.auth_service.set_token(data.access_token)
      this.router.navigate(['/todo/all'])
    }).catch((e) => {
      this.toastr.error(e.error.message, 'Sign up failed !!!', {
        timeOut: 3000
      })
    })
  }
}
