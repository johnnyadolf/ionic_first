export type Task = {
  id: number;
  title: string;
  description?: string; // Optional field for task description
  completed: boolean;
  dueDate?: string | Date | null;
  priority?: 'low' | 'medium' | 'high';
};
