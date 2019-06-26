import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Observable } from 'rxjs/Observable';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, afDatabase: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.tasksRef = afDatabase.list('tasks');
    this.tasks = this.tasksRef.valueChanges();
  }

  addTask() {
    let prompt = this.alertCtrl.create({
      title: 'Tarefa',
      message: 'Informe a descrição da tarefa a ser realizada',
      inputs: [
        {
          name: 'descricao',
          placeholder: 'Descrição'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar acionado');
          }
        }, {
          text: 'Salvar',
          handler: data => {
            const newTaskRef = this.tasksRef.push({});
            newTaskRef.set({
              id: newTaskRef.key,
              descricao: data.descricao
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(taskId, taskDescricao) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você deseja fazer?',
      buttons: [
        {
          text: 'Excluir tarefa',
          role: 'destructive',
          handler: () => {
            this.removeTask(taskId);
          }
        }, {
          text: 'Atualizar tarefa',
          handler: () => {
            this.updateTask(taskId, taskDescricao);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clicado.');
          }
        }
      ]
    });
    actionSheet.present();

  }

  removeTask(taskId: string) {
    this.tasksRef.remove(taskId);
  }

  updateTask(taskId: string, taskDescricao: string) {
    let prompt = this.alertCtrl.create({
      title: 'Tarefa',
      message: 'Atualize a descrição dessa tarefa',
      inputs: [
        {
          name: 'descricao',
          placeholder: 'Descrição',
          value: taskDescricao
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar clicado.');
          }
        }, {
          text: 'Salvar',
          handler: data => {
            this.tasksRef.update(taskId, {
              descricao: data.descricao
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
