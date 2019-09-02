import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "underscore";
import { AuthService } from '../services/auth.service'
import {TodoService} from '../services/todo.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo_list_type: any;
  filtered_todos= [];
  todos_list: any;
  current_value:any;
  constructor(private route: ActivatedRoute, 
    private toastr: ToastrService,
    private router: Router,
    private auth_service:AuthService,
    private todo_service: TodoService) {
    
    this.route.params.subscribe(params => {
      if (params['element']) {
        this.todo_list_type = params['element'];
      }else{
        this.todo_list_type ="all"
      }
      this.compute_todos()
    });
  }
  addTodo(title){
    const todo:any = {
      title,
      completed: false
    }
    this.todos_list.push(todo);
    this.todo_service.add_todo(todo).then((data:any)=>{
      todo.id = data.id
    }).catch(e=>{
      this.todos_list.pop();
      this.toastr.error(e.error.message, 'Todo add failed', {
        timeOut: 3000
      })
    })
    this.compute_todos()
  }
  compute_todos(){
    if (this.todo_list_type == "all") {
      this.filtered_todos = this.todos_list;
    }else{
      const filter_element = this.todo_list_type == 'active' ? false : true
      this.filtered_todos = _.filter( this.todos_list,(todo)=>{
        return todo.completed == filter_element;
      });
    }
  }

  async ngOnInit() {
    this.todo_service.get_todos().then(response=>{
      this.todos_list = response;
      
      this.compute_todos()
    }).catch(e=>{
      console.log(e)
    })
  }
  update_todo(todo){
    todo.is_edit = false;
    if(this.current_value == todo.title){return false}
    this.todo_service.update_todo(todo).then((data:any)=>{
      this.toastr.success("Updated successfully", 'Todo update', {
        timeOut: 3000
      })
    }).catch(e=>{
      this.toastr.error(e.error.message, 'Todo add failed', {
        timeOut: 3000
      })
    })
  }

  delete_todo(elem){
    this.todos_list = _.filter( this.todos_list, (todo:any)=>{
      return todo.id !=elem.id;
    });
    this.compute_todos()
    this.todo_service.delete_todo(elem).then((data:any)=>{
      this.toastr.success("Deleted successfully", 'Todo delete', {
        timeOut: 3000
      })
    }).catch(e=>{
      this.toastr.error(e.error.message, 'Todo delete failed', {
        timeOut: 3000
      })
      this.ngOnInit()
    })
  }
  active_times(){
    const active_items = _.filter( this.todos_list, (todo:any)=>{
      return todo.completed ==false;
    });
    return active_items.length
  }
  clear_completed(){
    this.todos_list = _.filter( this.todos_list, (todo:any)=>{
      return !todo.completed;
    });
    this.compute_todos()
  }
  logout(){
    this.auth_service.clear_data()
    this.router.navigate(['/login'])
  }
  make_editable(todo:any, field){
    this.current_value = todo.title;
    todo.is_edit = true
    setTimeout(()=>{
      field.focus()
    },0)
    
  }
}
