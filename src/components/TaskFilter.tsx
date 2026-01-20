import React from 'react';
import { useTasks } from '../context/TaskContext';
import type { FilterType } from '../types';

const TaskFilter: React.FC = () => {
    const { state, dispatch } = useTasks();
    const filters: FilterType[] = ['All', 'Active', 'Completed'];

    const totalTasks = state.tasks.length;
    const activeTasks = state.tasks.filter(t => !t.completed).length;

    return (
        <div className="filter-row">
            <div className="filters">
                {filters.map(filter => (
                    <button
                        key={filter}
                        className={`filter-tag ${state.filter === filter ? 'active' : ''}`}
                        onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className="stats">
                <span>Total: {totalTasks}</span>
                <span>Active: {activeTasks}</span>
                <span>Completed: {totalTasks - activeTasks}</span>
            </div>
        </div>
    );
};

export default TaskFilter;
