import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

interface filterConfig {
  checked: boolean;
  task: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newTask!: string;
  isTaskCreationFinal = false;
  activeTask: string[] = [];
  completedTask: string[] = [];
  itemLeft!: number;
  filter: filterConfig[] = [
    {
      checked: true,
      task: 'All',
    },
    {
      checked: false,
      task: 'Active',
    },
    {
      checked: false,
      task: 'Completed',
    },
  ];
  isActive = true;
  isComplete = true;
  ngOnInit(): void {
    this.completedTask = ['Complete online JavaScript course'];
    this.activeTask = [
      'Jog around the park 3x',
      '10 minutes meditation',
      'Read for 1 hour',
      'Pick up groceries',
      'Complete Todo App on Frontend Mentor',
    ];
    this.itemLeft = this.activeTask.length;
  }

  onCreateTask = () => {
    if (!this.newTask || this.newTask.length === 0) return;
    console.log('newTask : ', this.newTask);
    this.activeTask.unshift(this.newTask);
    this.itemLeft++;
    this.newTask = '';
    if (this.isTaskCreationFinal) this.isTaskCreationFinal = false;
  };

  onDropActive = (event: CdkDragDrop<string[]>): void => {
    moveItemInArray(this.activeTask, event.previousIndex, event.currentIndex);
  };

  onDropComplete = (event: CdkDragDrop<string[]>): void => {
    moveItemInArray(
      this.completedTask,
      event.previousIndex,
      event.currentIndex
    );
  };

  onActive = (complete: string) => {
    this.completedTask = this.completedTask.filter(
      (comp) => comp && comp !== complete
    );
    this.activeTask.unshift(complete);
    this.itemLeft++;
  };

  onComplete = (active: string) => {
    this.activeTask = this.activeTask.filter((act) => act && act !== active);
    this.completedTask.unshift(active);
    this.itemLeft--;
  };

  onClickFilter = (filter: string) => {
    if (filter === 'All') {
      this.isActive = true;
      this.isComplete = true;
    } else if (filter === 'Active') {
      this.isActive = true;
      this.isComplete = false;
    } else {
      this.isActive = false;
      this.isComplete = true;
    }
    this.filter.forEach((f) => {
      if (f.task === filter) f.checked = true;
      else f.checked = false;
    });
  };
  onClickClear = () => {
    this.completedTask = [];
  };

  onRemove = (type: string, task: string) => {
    if (type === 'complete') {
      this.completedTask = this.completedTask.filter(
        (comp) => comp && comp !== task
      );
    } else {
      this.activeTask = this.activeTask.filter((act) => act && act !== task);
      this.itemLeft--;
    }
  };
}
