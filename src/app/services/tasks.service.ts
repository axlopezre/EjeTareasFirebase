import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: string[] = [];
  private compTask: string[] = [];

  constructor() {
    this.tasks.push("Tarea 1");
    this.tasks.push("Tarea 2");
   }

   public getTasks():string[] {
      return this.tasks;
   }
   public getCompTask():string[] {
      return this.compTask;
   }

   public addTasks(task:string){
      this.tasks.push(task);
   }

   public removeTask(pos:number){
      this.tasks.splice(pos, 1);
   }
   public completeTask(pos:number){
      let taskslist = this.getTasks();
      let deltask = taskslist[pos];
      this.compTask.push(deltask);
   }
}
