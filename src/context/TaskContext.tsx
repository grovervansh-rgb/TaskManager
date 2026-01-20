import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { TaskState, TaskAction } from '../types';
import { taskReducer } from '../reducer/taskReducer';

interface TaskContextType {
    state: TaskState;
    dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialState: TaskState = {
    tasks: [],
    filter: 'All',
};

/**
 * Provider component that wraps the application to provide task state.
 */
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

/**
 * Custom hook for consuming the task context.
 */
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
