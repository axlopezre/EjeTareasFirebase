import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: string[] = [];

  constructor() {
    this.tasks.push("Tarea 1");
    this.tasks.push("Tarea 2");
   }

   public getTasks():string[] {
      return this.tasks;
   }

   public addTasks(task:string){
      this.tasks.push(task);
   }

   public removeTask(pos:number){
      this.tasks.splice(pos, 1);
   }
}
