import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Tasks } from "../models/tasks";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  //public tasks: string[];
  public tasks: Tasks[];

 constructor(private taskService:TasksService) {
    //this.tasks = this.taskService.getCompTask();
   this.taskService.getCompTask().subscribe(res => {
     this.tasks = res;
     console.log(this.tasks);
   });
  }

  public addTask(pos:number){
    this.taskService.completeTask2(pos);
    //this.tasks=this.taskService.getCompTask();
    this.taskService.getCompTask().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    });
    console.log(this.tasks);
    this.taskService.removeCompTask(pos);
    console.log(this.tasks);
  }
}
