import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks: string[];
  public task: string;
  public compTask: string[];

 constructor(private taskService:TasksService) {
    this.tasks = this.taskService.getCompTask();
    console.log(this.compTask)
    this.task = "algo";
  }
}
