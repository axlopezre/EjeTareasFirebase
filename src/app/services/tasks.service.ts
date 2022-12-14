import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Tasks } from "../models/tasks";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  //private tasks: string[] = [];
  private tasks: Tasks[];
  //private compTask: string[] = [];
  private compTasks: Tasks[];

  constructor(private firestore: AngularFirestore) {
    /*this.tasks.push("Tarea 1");
    this.tasks.push("Tarea 2");*/
   }

  public getTasks(): Observable<Tasks[]>{
     //return this.tasks;
     return this.firestore.collection('tasks').snapshotChanges().pipe(
       map(actions => {
         return actions.map(a => {
           //console.log(a);
           const data = a.payload.doc.data() as Tasks;
           //console.log(data);
           const id = a.payload.doc.id;
           //console.log(id);
           return { id, ...data };
         });
       })
     );
   }
  public getCompTask(): Observable<Tasks[]> {
      //return this.compTask;
    return this.firestore.collection('getcomptasks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          //console.log(a);
          const data = a.payload.doc.data() as Tasks;
          //console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
  public addTasks(sponsor: Tasks) {
    return this.firestore.collection('tasks').add(sponsor);
  }

  public addCompTasks(sponsor: Tasks) {
    return this.firestore.collection('getcomptasks').add(sponsor);
  }
  public removeTask(id: string) {
    this.firestore.collection('tasks').doc(id).delete();
    return this.tasks;
  }
  public removecompTask(id: string) {
    this.firestore.collection('getcomptasks').doc(id).delete();
    return this.tasks;
  }
   public removeCompTask(pos:number){
     this.compTasks.splice(pos, 1);
  }

  public getTaskById(id: string) {
    let result = this.firestore.collection('tasks').doc(id).valueChanges();
    return result;
  }

  public getCompTaskById(id: string) {
    let result = this.firestore.collection('getcomptasks').doc(id).valueChanges();
    return result;
  }
}
