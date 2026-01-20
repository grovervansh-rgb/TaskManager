import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

/**
 * Renders the list of tasks based on the current filter state.
 */
const TaskList: React.FC = () => {
    const { state } = useTasks();

    const filteredTasks = state.tasks.filter((task) => {
        if (state.filter === 'Active') return !task.completed;
        if (state.filter === 'Completed') return task.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#718096' }}>
                <p>No tasks found for this view.</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
