import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Input,ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tasks } from "../models/tasks";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  //public tasks: string[];
  public tasks: Tasks[];
  public task: Tasks;
  //public compTask: string[];
  @ViewChild('inputTask') myInput;

  public compTasks: Tasks[];

  constructor(private taskService:TasksService) {
    //this.tasks = this.taskService.getTasks();
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    });
    this.ionViewLoaded()
  }

  ionViewLoaded() {

    setTimeout(() => {
      this.myInput.setFocus();
    },150);

 }

  public addTask() {
    this.task = {
      task: this.myInput.value
    }
    this.taskService.addTasks(this.task);
    this.myInput.value = '';
  }

  public removeTask(pos:number){
    this.taskService.removeTask(pos);
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    });
  }
  
  public completeTask(pos:number){
    this.taskService.completeTask(pos);
    //this.tasks=this.taskService.getCompTask();

    this.taskService.getCompTask().subscribe(res => {
      this.compTasks = res;
      console.log(this.compTasks);
    });

    this.taskService.removeTask(pos);
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    });
 }

}
