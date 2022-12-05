import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Input,ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tasks } from "../models/tasks";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  //public tasks: string[];
  public tasks: Tasks[];
  public task: Tasks;
  public idelim;
  //public compTask: string[];
  @ViewChild('inputTask') myInput;

  public compTasks: Tasks[];

  constructor(private taskService: TasksService, private alertController: AlertController, private router: Router, private activatedRoute: ActivatedRoute, private tc: ToastController) {
    //this.tasks = this.taskService.getTasks();
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
     // console.log(this.tasks);
    });
    this.ionViewLoaded()
  }

  //
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idelim = params.id;
     // console.log(this.idelim);
      this.taskService.getCompTaskById(params.id).subscribe(item => {
        //console.log(item);
        this.task = item as Tasks;
        //this.comptask2 = this.comptask;
        this.taskService.addTasks(this.task);
        this.tasks = this.taskService.removecompTask(params.id);
        return;
      });
      return;
    });
  }
  //
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
    console.log(this.myInput.value)
    this.myInput.value=" ";
    this.toast('Tarea Agregada');
  }

  public async removeTask(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.tasks = this.taskService.removeTask(id);
            this.toast('Tarea Eliminada');
          }
        }
      ]
    });

    await alert.present();
  }

  public getTaskById(id: string): void {
    //console.log(this.studentService.getStudentByControlNumber(cn));
    this.router.navigate(['/tab2'], {
      queryParams: { id: id},
    });
    this.toast('Tarea Completada');
    //this.tasks = this.taskService.removeTask(id);
  }

  async toast(message: string) {
    let toast = await this.tc.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
