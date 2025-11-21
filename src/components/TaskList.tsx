import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import { useTasks } from '../hooks/useTasks';

const CATEGORIES = ['Work', 'Personal', 'Urgent', 'Other'];

const TaskList: React.FC = () => {
    const { tasks, addTask, toggleTask, deleteTask, clearCompleted, handleDragEnd } = useTasks();
    const [newTask, setNewTask] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Work');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        addTask(newTask, selectedCategory);
        setNewTask('');
    };

    return (
        <div style={{ width: '100%', maxWidth: '500px', marginTop: '2rem' }}>
            <form onSubmit={handleAddTask} style={{ marginBottom: '2rem' }}>
                <div className="flex-col gap-4">
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="What's your focus?"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button
                            type="submit"
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                color: 'var(--color-accent)',
                                fontWeight: 'bold',
                                padding: '0.5rem'
                            }}
                            aria-label="Add task"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex-center gap-4" style={{ flexWrap: 'wrap' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    background: selectedCategory === cat ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                    border: `1px solid ${selectedCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
                                    color: 'var(--color-text-main)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </form>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={tasks}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="task-list">
                        {tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {tasks.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--color-text-dim)', marginTop: '2rem' }}>
                    <p>No tasks yet. Add one to get started.</p>
                </div>
            )}

            {tasks.some(t => t.completed) && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        onClick={clearCompleted}
                        style={{
                            background: 'transparent',
                            color: 'var(--color-text-dim)',
                            textDecoration: 'underline',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Completed
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
