import type { TaskState, TaskAction, Task } from '../types';

/**
 * Reducer function to handle state transitions for the task manager.
 * Using a switch statement for clarity and standard practice.
 */
export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask: Task = {
                id: crypto.randomUUID(), // modern way to generate IDs
                text: action.payload.text,
                priority: action.payload.priority,
                completed: false,
            };
            return {
                ...state,
                tasks: [newTask, ...state.tasks],
            };
        }

        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };

        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };

        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, text: action.payload.text, priority: action.payload.priority }
                        : task
                ),
            };

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload,
            };

        default:
            return state;
    }
};
