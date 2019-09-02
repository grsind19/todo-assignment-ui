import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private heroesUrl = '/api/todo/'
  private httpOptions : any;
  constructor(private http: HttpClient) { 
  }
  create_headers(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  add_todo(todo){
    this.create_headers()
    return this.http.post(this.heroesUrl, todo, this.httpOptions).toPromise()
  }
  update_todo(todo){
    this.create_headers()
    return this.http.put(this.heroesUrl+todo.id, todo, this.httpOptions).toPromise()
  }
  delete_todo(todo){
    this.create_headers()
    return this.http.delete(this.heroesUrl+todo.id,this.httpOptions).toPromise()
  }
  get_todos(){
    this.create_headers()
    return this.http.get(this.heroesUrl,this.httpOptions).toPromise()
  }
}
