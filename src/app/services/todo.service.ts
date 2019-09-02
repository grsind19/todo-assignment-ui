import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private heroesUrl = 'http://localhost:3000/api/todo/'
  private httpOptions : any;
  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  add_todo(todo){
    return this.http.post(this.heroesUrl, todo, this.httpOptions).toPromise()
  }
  update_todo(todo){
    return this.http.put(this.heroesUrl+todo.id, todo, this.httpOptions).toPromise()
  }
  delete_todo(todo){
    return this.http.delete(this.heroesUrl+todo.id,this.httpOptions).toPromise()
  }
  get_todos(){
    return this.http.get(this.heroesUrl,this.httpOptions).toPromise()
  }
}
