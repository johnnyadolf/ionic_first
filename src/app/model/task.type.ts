export type Task = {
  id: number;
  title: string;
  description?: string; // Optional field for task description
  completed: boolean;
  dueDate?: Date | null;
  priority?: 'low' | 'medium' | 'high';
  isDeleted?: boolean; // Optional field to mark tasks as deleted
};
