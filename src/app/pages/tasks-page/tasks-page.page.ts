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
import { catchError } from 'rxjs';
import { addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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
  taskService = inject(TasksService);
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
  pageSize = 10;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.taskItems().length / this.pageSize) || 1;
  }

  get paginatedTasks(): Task[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.taskItems().slice(start, start + this.pageSize);
  }

  get paginationPages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    if (total <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    // First 3 pages
    if (current <= 2) {
      pages.push(1, 2, 3);
      pages.push('...');
      pages.push(total);
      return pages;
    }

    if (current === 3) {
      pages.push(1, 2, 3, 4);
      pages.push('...');
      pages.push(total);
      return pages;
    }

    if (current === total - 2) {
      pages.push(1);
      pages.push('...');
      pages.push(total - 3, total - 2, total - 1, total);
      return pages;
    }

    // Last 3 pages
    if (current >= total - 1) {
      pages.push(1);
      pages.push('...');
      pages.push(total - 2, total - 1, total);
      return pages;
    }

    // Middle pages: current-1, current, current+1
    pages.push(1);
    pages.push('...');
    pages.push(current - 1, current, current + 1);
    pages.push('...');
    pages.push(total);

    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnInit(): void {
    // Fetch tasks when the component is initialized
    this.taskService
      .getTasksFromAPI()
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          throw error;
        })
      )
      .subscribe((tasks: Task[]) => {
        // Clean up dueDate for all tasks
        const cleanedTasks = tasks.map((task) => ({
          ...task,
          dueDate:
            typeof task.dueDate === 'string'
              ? task.dueDate.split('.')[0] // Keep only the date part
              : task.dueDate,
        }));
        this.taskItems.set(cleanedTasks);
      });
  }

  editTask(task: Task): void {
    // Console log the task before editing and after editing
    console.log('Task before editing:', task);
    // Set the task to be edited
    this.editingTaskId = task.id;
    this.newTask = {
      ...task,
      description: task.description ?? '', // Ensure it's always a string
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '',
      priority: (task.priority ?? '') as string, // Ensure priority is always a string
    };
    this.showAddTaskModal = true;
  }

  saveEditedTask(): void {
    const allowedPriorities = ['low', 'medium', 'high'] as const;
    const priority = allowedPriorities.includes(this.newTask.priority as any)
      ? (this.newTask.priority as 'low' | 'medium' | 'high')
      : undefined;

    const updated = this.taskItems().map((t: Task) =>
      t.id === this.editingTaskId
        ? {
            ...t,
            title: this.newTask.title,
            description: this.newTask.description,
            dueDate: this.newTask.dueDate
              ? new Date(this.newTask.dueDate)
              : null,
            completed: this.newTask.completed,
            priority: allowedPriorities.includes(this.newTask.priority as any)
              ? (this.newTask.priority as 'low' | 'medium' | 'high')
              : undefined,
          }
        : t
    );
    this.taskItems.set(updated as Task[]);
    this.resetNewTask();
    this.closeAddTaskModal();
  }

  addTask(): void {
    const allowedPriorities = ['low', 'medium', 'high'] as const;
    const priority = allowedPriorities.includes(this.newTask.priority as any)
      ? (this.newTask.priority as 'low' | 'medium' | 'high')
      : undefined;

    if (this.editingTaskId !== null) {
      // Edit mode: update existing task
      console.log('Editing task with ID:', this.editingTaskId);
      console.log('New task data:', this.newTask);
      const updated = this.taskItems().map((t: Task) =>
        t.id === this.editingTaskId
          ? {
              ...t,
              title: this.newTask.title,
              description: this.newTask.description,
              dueDate: this.newTask.dueDate
                ? new Date(this.newTask.dueDate)
                : null,
              priority,
              completed: this.newTask.completed,
            }
          : t
      );
      this.taskItems.set(updated);
    } else {
      // Add mode: create new task
      const newTask: Task = {
        id: this.getNextTaskId(),
        title: this.newTask.title,
        description: this.newTask.description,
        completed: false,
        dueDate: this.newTask.dueDate ? new Date(this.newTask.dueDate) : null,
        priority,
      };
      console.log('Adding new task:', newTask);
      this.taskItems.set([...this.taskItems(), newTask]);
    }
    this.closeAddTaskModal();
    this.resetNewTask();
    this.editingTaskId = null;
  }

  deleteTask(task: Task): void {
    // Console log the task before deleting
    console.log('Task before deleting:', task);
    const updated = this.taskItems().filter((t: Task) => t.id !== task.id);
    this.taskItems.set(updated);
  }

  toggleTaskCompletion(task: Task): void {
    const updated = this.taskItems().map((t: Task) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    this.taskItems.set(updated);
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
    const allowedPriorities = ['low', 'medium', 'high'] as const;
    const priority = allowedPriorities.includes(this.newTask.priority as any)
      ? (this.newTask.priority as 'low' | 'medium' | 'high')
      : undefined;

    const newTask: Task = {
      ...this.newTask,
      id: this.getNextTaskId(),
      dueDate: this.newTask.dueDate ? new Date(this.newTask.dueDate) : null,
      priority,
      completed: false,
    };

    const updatedTasks = [...this.taskItems(), newTask];
    this.taskItems.set(updatedTasks);
    this.resetNewTask();
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
    const tasks = this.taskItems();
    if (!tasks.length) return 1;
    return Math.max(...tasks.map((t) => t.id)) + 1;
  }

  toNumber(value: any): number {
    return Number(value);
  }

  constructor() {
    addIcons({
      addCircleOutline,
    });
  }
}
