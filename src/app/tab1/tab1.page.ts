import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public tasks: string[];
  public task: string;
  public compTask: string[];

  constructor(private taskService:TasksService) {
    this.tasks = this.taskService.getTasks();
    this.task = "algo";
  }

  public addTask(){
    this.taskService.addTasks(this.task);
    this.tasks=this.taskService.getTasks();
    console.log(this.tasks);
    this.task="";
  }

  public removeTask(pos:number){
    this.taskService.removeTask(pos);
    this.tasks=this.taskService.getTasks();
  }
  public completeTask(pos:number){
    this.taskService.completeTask(pos);
    this.tasks=this.taskService.getCompTask();
    console.log(this.taskService.getCompTask())
    this.taskService.removeTask(pos);
    this.tasks=this.taskService.getTasks();
 }
}
