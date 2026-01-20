import React, { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import type { Priority } from '../types';

const TaskInput: React.FC = () => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');
    const { dispatch } = useTasks();

    // useRef for auto-focusing the input field
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus input on initial mount
        inputRef.current?.focus();
    }, []);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        dispatch({
            type: 'ADD_TASK',
            payload: { text, priority },
        });

        setText('');
        setPriority('Medium');
        inputRef.current?.focus();
    };

    return (
        <form className="input-section" onSubmit={handleAddTask}>
            <div className="input-row">
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    autoComplete="off"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit" className="add-btn">Add Task</button>
            </div>
        </form>
    );
};

export default TaskInput;
