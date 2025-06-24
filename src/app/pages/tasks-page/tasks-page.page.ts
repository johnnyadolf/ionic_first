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
  IonLabel,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonCheckbox,
  IonToggle,
} from '@ionic/angular/standalone';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { catchError } from 'rxjs';
import {
  addCircleOutline,
  refreshOutline,
  trashOutline,
  createOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.page.html',
  styleUrls: ['./tasks-page.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonModal,
    IonButtons,
    IonBackButton,
    IonLabel,
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
    IonInput,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonIcon,
    IonToggle, // Add this import
    CommonModule,
    FormsModule,
  ],
  animations: [
    trigger('taskAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px) scale(0.95)' }),
        animate(
          '600ms cubic-bezier(.35,0,.25,1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '400ms cubic-bezier(.35,0,.25,1)',
          style({ opacity: 0, height: 0, margin: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class TasksPagePage implements OnInit {
  taskService = inject(TasksService);
  taskItems = signal<Array<Task>>([]);
  showAddTaskModal = false;
  newTask = {
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    completed: false,
  };
  editingTaskId: number | null = null;
  pageSize = 10;
  currentPage = 1;
  searchTerm: string = '';
  searchByDescription: boolean = false;

  ngOnInit(): void {
    this.taskService
      .getTasksFromAPI()
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          return [];
        })
      )
      .subscribe((tasks: Task[]) => {
        const cleanedTasks = tasks.map((task) => ({
          ...task,
          dueDate:
            typeof task.dueDate === 'string'
              ? task.dueDate.split('.')[0]
              : task.dueDate,
        }));
        this.taskService.setTasks(cleanedTasks);
        this.taskItems.set(cleanedTasks);
      });
  }

  addTask(): void {
    const allowedPriorities = ['low', 'medium', 'high'] as const;
    const priority = allowedPriorities.includes(this.newTask.priority as any)
      ? (this.newTask.priority as 'low' | 'medium' | 'high')
      : undefined;
    const finalDueDate = this.newTask.dueDate
      ? typeof this.newTask.dueDate === 'string'
        ? this.newTask.dueDate.split('.')[0]
        : this.newTask.dueDate
      : undefined;
    if (this.editingTaskId !== null) {
      const taskToUpdate: Task | undefined = this.taskItems().find(
        (t) => t.id === this.editingTaskId
      );
      if (taskToUpdate) {
        const updatedTask = {
          ...taskToUpdate,
          title: this.newTask.title,
          description: this.newTask.description,
          dueDate: finalDueDate,
          priority,
          completed: this.newTask.completed,
        };
        this.taskService.updateTask(updatedTask);
        this.taskItems.set([...this.taskService.getTasks()]);
      }
    } else {
      const newTaskToAdd: Task = {
        id: this.getNextTaskId(),
        title: this.newTask.title,
        description: this.newTask.description,
        completed: false,
        dueDate: finalDueDate,
        priority,
      };
      this.taskService.addTask(newTaskToAdd);
      this.taskItems.set([...this.taskService.getTasks()]);
    }
    this.closeAddTaskModal();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
    const updated = this.taskService.getTasks();
    const newTotalPages = Math.ceil(updated.length / this.pageSize) || 1;
    if (this.currentPage > 1 && this.currentPage > newTotalPages) {
      this.currentPage = Math.max(1, newTotalPages);
    }
    this.taskItems.set([...updated]);
  }

  toggleTaskCompletion(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask);
    this.taskItems.set([...this.taskService.getTasks()]);
  }

  deleteCompletedTasks(): void {
    this.taskService.deleteCompletedTasks();
    const updated = this.taskService.getTasks();
    const newTotalPages = Math.ceil(updated.length / this.pageSize) || 1;
    if (this.currentPage > 1 && this.currentPage > newTotalPages) {
      this.currentPage = Math.max(1, newTotalPages);
    }
    this.taskItems.set([...updated]);
  }

  get hasCompletedTasks(): boolean {
    return this.taskItems().some((t) => t.completed);
  }

  openAddTaskModal() {
    this.resetNewTask();
    this.showAddTaskModal = true;
  }
  closeAddTaskModal() {
    this.showAddTaskModal = false;
    this.resetNewTask();
  }
  editTask(task: Task): void {
    this.editingTaskId = task.id;
    this.newTask = {
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate
        ? typeof task.dueDate === 'string'
          ? task.dueDate
          : (task.dueDate as Date).toISOString()
        : '',
      priority: task.priority || '',
      completed: task.completed,
    };
    this.showAddTaskModal = true;
  }
  toNumber(value: any): number {
    return Number(value);
  }
  private getNextTaskId(): number {
    const tasks = this.taskService.getTasks();
    if (!tasks.length) return 1;
    return Math.max(...tasks.map((t) => t.id)) + 1;
  }
  private resetNewTask() {
    this.newTask = {
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      completed: false,
    };
    this.editingTaskId = null;
  }

  // --- Pagination logic ---
  get totalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.pageSize) || 1;
  }

  get paginatedTasks(): Task[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTasks.slice(start, start + this.pageSize);
  }

  get paginationPages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    if (current <= 3) {
      pages.push(1, 2, 3);
      if (current === 3) pages.push(4);
      pages.push('...', total);
      return pages;
    }
    if (current >= total - 2) {
      pages.push(1, '...');
      if (current === total - 2) pages.push(total - 3);
      pages.push(total - 2, total - 1, total);
      return pages;
    }
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
    return pages;
  }

  goToPage(page: number) {
    if (this.filteredTasks.length === 0) return;
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
  nextPage() {
    if (this.filteredTasks.length === 0) return;
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
  prevPage() {
    if (this.filteredTasks.length === 0) return;
    if (this.currentPage > 1) this.currentPage--;
  }

  get filteredTasks(): Task[] {
    let tasks = this.taskItems();
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      if (this.searchByDescription) {
        tasks = tasks.filter(
          (t) => t.description?.toLowerCase().includes(term));
      } else {
        tasks = tasks.filter((t) => t.title.toLowerCase().includes(term));
      }
    }
    return tasks;
  }

  get isLoading$() {
    return this.taskService.isLoading$;
  }

  constructor() {
    addIcons({
      addCircleOutline,
      trashOutline,
      refreshOutline,
      createOutline,
    });
  }

  onToggleChange() {
    // Clear search term and reset to first page when toggling
    this.currentPage = 1;
  }
}
