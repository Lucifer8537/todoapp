import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newTask!: string;
  isTaskCreationFinal = false;
  onCreateTask = () => {
    console.log('newTask : ', this.newTask);
    this.newTask = '';
    if (this.isTaskCreationFinal) this.isTaskCreationFinal = false;
  };
}
