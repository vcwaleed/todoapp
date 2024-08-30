import { createSlice } from '@reduxjs/toolkit';

const initialState = { todos: [], filter: 'ALL', searchTerm: '' };

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ text: action.payload.text, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos[action.payload.id];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((_, index) => index !== action.payload.id);
    },
    markCompleted: (state, action) => {
      const todo = state.todos[action.payload.id];
      if (todo) {
        todo.completed = true;
      }
    },
    markIncomplete: (state, action) => {
      const todo = state.todos[action.payload.id];
      if (todo) {
        todo.completed = false;
      }
    },
    
    filterTodos: (state, action) => {
      state.filter = action.payload;
    },

    markAllCompleted: (state) => {
      state.todos.forEach(todo => todo.completed = true);
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  markCompleted,
  markIncomplete,
  filterTodos,
  markAllCompleted,
  updateSearchTerm,
} = todoSlice.actions;

export default todoSlice.reducer;
