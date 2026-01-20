import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import type { Task, Priority } from '../types';

interface TaskItemProps {
    task: Task;
}

/**
 * Individual task component. 
 * Using memo would be good for performance but keeping it simple for now.
 */
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { dispatch } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [editPriority, setEditPriority] = useState(task.priority);

    const handleToggle = () => {
        dispatch({ type: 'TOGGLE_TASK', payload: task.id });
    };

    const handleDelete = () => {
        if (window.confirm('Delete this task?')) {
            dispatch({ type: 'DELETE_TASK', payload: task.id });
        }
    };

    const handleUpdate = () => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: { id: task.id, text: editText, priority: editPriority }
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="task-item editing">
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                />
                <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as Priority)}
                    className="edit-select"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <div className="actions">
                    <button className="btn-save" onClick={handleUpdate}>Save</button>
                    <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={handleToggle}
            />
            <div className="task-text">
                {task.text}
                <span className={`priority-badge ${task.priority}`} style={{ marginLeft: '10px' }}>
                    {task.priority}
                </span>
            </div>
            <div className="actions">
                <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn-delete" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;
