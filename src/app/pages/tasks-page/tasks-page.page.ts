import { Task } from './../../model/task.type';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCol,
  IonCardHeader,
  IonGrid,
  IonCardContent,
  IonRow,
  IonCard,
  IonCardTitle,
  IonItem,
  IonList,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonModal,
  IonSelectOption,
  IonInput,
  IonDatetime,
  IonSelect,
} from '@ionic/angular/standalone';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.page.html',
  styleUrls: ['./tasks-page.page.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonButtons,
    IonBackButton,
    IonLabel,
    IonList,
    IonItem,
    IonCardTitle,
    IonCard,
    IonRow,
    IonGrid,
    IonCardHeader,
    IonCol,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCardContent,
    IonSelectOption,
    IonInput,
    IonDatetime,
    IonIcon,
    IonSelect,
    CommonModule,
    FormsModule,
  ],
})
export class TasksPagePage implements OnInit {
  TaskService = inject(TasksService);
  taskItems = signal<Array<Task>>([]); // Initialize taskItems as an empty array</Task>
  showAddTaskModal = false;
  newTask = {
    title: '',
    description: '',
    dueDate: '',
    priority: '', // Default priority
    completed: false,
  };
  editingTaskId: number | null = null;

  ngOnInit(): void {
    // Initialize or fetch tasks when the component is initialized
    this.taskItems.set(this.TaskService.taskItems);
  }

  editTask(task: Task): void {
    this.editingTaskId = task.id;
    this.newTask = {
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
      priority: task.priority || '',
      completed: task.completed,
    };
    this.showAddTaskModal = true;
  }
  deleteTask(task: Task): void {
    // Logic to delete the task
    console.log('Delete task:', task);
    this.TaskService.taskItems = this.TaskService.taskItems.filter(
      (t) => t.id !== task.id
    );
    this.taskItems.set(this.TaskService.taskItems); // Update the signal with the new task list
  }

  addTask(): void {
    const allowedPriorities = ['low', 'medium', 'high'] as const;
    const priority = allowedPriorities.includes(this.newTask.priority as any)
      ? (this.newTask.priority as 'low' | 'medium' | 'high')
      : undefined;

    if (this.editingTaskId !== null) {
      // Edit mode: update existing task
      const idx = this.TaskService.taskItems.findIndex(
        (t) => t.id === this.editingTaskId
      );
      if (idx > -1) {
        this.TaskService.taskItems[idx] = {
          ...this.TaskService.taskItems[idx],
          title: this.newTask.title,
          description: this.newTask.description,
          dueDate: this.newTask.dueDate ? new Date(this.newTask.dueDate) : null,
          priority: priority,
          completed: this.newTask.completed,
        };
      }
    } else {
      // Add mode: create new task
      const newTask: Task = {
        id: this.getNextTaskId(),
        title: this.newTask.title,
        description: this.newTask.description,
        completed: false,
        dueDate: this.newTask.dueDate ? new Date(this.newTask.dueDate) : null,
        priority: priority,
        isDeleted: false,
      };
      this.TaskService.taskItems.push(newTask);
    }
    this.taskItems.set(this.TaskService.taskItems);
    this.closeAddTaskModal();
    this.resetNewTask();
    this.editingTaskId = null;
  }
  toggleTaskCompletion(task: Task): void {
    // Logic to toggle task completion
    task.completed = !task.completed;
    this.taskItems.set(this.TaskService.taskItems); // Update the signal with the new task list
  }
  openAddTaskModal() {
    this.showAddTaskModal = true;
  }

  closeAddTaskModal() {
    this.showAddTaskModal = false;
    this.resetNewTask();
    this.editingTaskId = null;
  }

  addNewTask() {
    // Add the new task to your tasks array
    this.TaskService.taskItems.push({
      ...this.newTask,
      id: this.getNextTaskId(),
      dueDate: this.newTask.dueDate ? new Date(this.newTask.dueDate) : null,
    } as Task);
    this.taskItems.set(this.TaskService.taskItems); // Update the signal with the new task list
    this.resetNewTask(); // Reset the new task form
    this.closeAddTaskModal();
  }

  resetNewTask() {
    this.newTask = {
      title: '',
      description: '',
      dueDate: '',
      priority: '', // Default priority
      completed: false,
    };
    this.editingTaskId = null;
  }

  getNextTaskId(): number {
    if (!this.TaskService.taskItems.length) return 1;
    return Math.max(...this.TaskService.taskItems.map((t) => t.id)) + 1;
  }
}
