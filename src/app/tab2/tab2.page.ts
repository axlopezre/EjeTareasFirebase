import { Component, OnInit} from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Tasks } from "../models/tasks";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  //public tasks: string[];
  public tasks: Tasks[];
  public task: Tasks;
  public comptask: Tasks;
  public comptask2: Tasks;
  public idelim;


  constructor(private taskService: TasksService, private activatedRoute: ActivatedRoute, private router: Router, private tc: ToastController) {
    //this.tasks = this.taskService.getCompTask();

   this.taskService.getCompTask().subscribe(res => {
     this.tasks = res;
     //console.log(this.tasks);
   });
  }

  public getTaskById(id: string): void {
    //console.log(this.studentService.getStudentByControlNumber(cn));
    this.router.navigate(['tabs/tab1'], {
      queryParams: { id: id },
    });
    this.toast('Tarea Descompletada');
    //this.tasks = this.taskService.removeTask(id);
  }
  async toast(message: string) {
    let toast = await this.tc.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


    ngOnInit(): void{
      this.activatedRoute.queryParams.subscribe((params) => {
        this.idelim = params.id;
        console.log(this.idelim);
        this.taskService.getTaskById(params.id).subscribe(item => {
          console.log(item);
          this.comptask = item as Tasks;
          //this.comptask2 = this.comptask;
          this.taskService.addCompTasks(this.comptask);
          this.tasks = this.taskService.removeTask(params.id);
          return;
        });
        return;
      }); 
    }
}
