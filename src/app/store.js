import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../todo/ToDoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
