import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks: string[];

 constructor(private taskService:TasksService) {
    this.tasks = this.taskService.getCompTask();
  }

  public addTask(pos:number){
    this.taskService.completeTask2(pos);
    this.tasks=this.taskService.getCompTask();
    console.log(this.tasks);
    this.taskService.removeCompTask(pos);
    console.log(this.tasks);
  }
}
