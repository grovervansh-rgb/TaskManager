export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  text: string;
  priority: Priority;
  completed: boolean;
}

export type FilterType = 'All' | 'Active' | 'Completed';

export interface TaskState {
  tasks: Task[];
  filter: FilterType;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: { text: string; priority: Priority } }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: { id: string; text: string; priority: Priority } }
  | { type: 'SET_FILTER'; payload: FilterType };
