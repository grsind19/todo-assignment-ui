import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private heroesUrl = 'http://localhost:3000/api/user/'
  constructor(private http: HttpClient) { }

  login(user):Promise<any>{
    return this.http.post(this.heroesUrl+"login",user).toPromise()
  }
  sign_up(user):any{
    return this.http.post(this.heroesUrl+"signup",user).toPromise()
  }
  set_user(user){
    localStorage.setItem("user", JSON.stringify(user))
  }
  get_user(){
    return JSON.parse(localStorage.getItem("user"))
  }
  set_token(token){
    localStorage.setItem("token", token)
  }
  get_token(){
    localStorage.getItem("token")
  }
  clear_data(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      return true
    }
    return false
  }
}
