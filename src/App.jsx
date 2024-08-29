import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo, markAllCompleted, filterTodos ,markCompleted} from './todo/ToDoSlice';

function FilterButtons() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.todos.filter);

  const handleFilterChange = (newFilter) => {
    dispatch(filterTodos(newFilter));
  };

  return (
    <div className="flex justify-between mb-4">
      <button
        className={`px-4 py-2 rounded ${filter === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => handleFilterChange('ALL')}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded ${filter === 'COMPLETED' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => handleFilterChange('COMPLETED')}
      >
        Completed
      </button>
      <button
        className={`px-4 py-2 rounded ${filter === 'INCOMPLETE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => handleFilterChange('INCOMPLETE')}
      >
        Incomplete
      </button>
    </div>
  );
}

function TodoItem({ todo, index }) {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
      <span
        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
        onClick={() => dispatch(toggleTodo({ id: index }))}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(removeTodo({ id: index }))}
        className="ml-4 text-red-500 hover:text-red-600 focus:outline-none"
      >
        Remove
      </button>
      <button
        onClick={() => dispatch(markCompleted({ id: index }))}
        className="ml-4 text-red-500 hover:text-red-600 focus:outline-none"
      >
        complete
      </button>

    </li>
  );
}

function TodoList() {
  const todos = useSelector((state) => {
    const todos = state.todos.todos;
    const filter = state.todos.filter;
    if (!Array.isArray(todos)) return [];
    switch (filter) {
      case 'COMPLETED':
        return todos.filter((todo) => todo.completed);
      case 'INCOMPLETE':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  });

  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </ul>
  );
}

function App() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo({ text: newTodo }));
      setNewTodo('');
    }
  };

  const handleMarkAllCompleted = () => {
    dispatch(markAllCompleted());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>

        <FilterButtons />
        <TodoList />

        <button
          onClick={handleMarkAllCompleted}
          className="w-full mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Mark All Completed
        </button>
      </div>
    </div>
  );
}

export default App;
