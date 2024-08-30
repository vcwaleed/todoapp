import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCalendarAlt } from "react-icons/fa";
import {
  addTodo,
  toggleTodo,
  removeTodo,
  markAllCompleted,
  markCompleted,
} from "./todo/ToDoSlice";
import { MdDeleteOutline } from "react-icons/md";
import {
  IoCheckmarkDoneCircleOutline,
  IoToggleOutline,
  IoToggleSharp,
} from "react-icons/io5";
import VerticalNavbar from "./VerticalNavbar";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

// TodoItem Component
function getRemainingTime(dueDate, dueTime) {
  if (!dueDate || !dueTime) return "";

  const [hours, minutes, period] = dueTime.split(/[: ]/);
  const dueHour =
    period === "PM" && hours !== "12"
      ? parseInt(hours, 10) + 12
      : period === "AM" && hours === "12"
      ? 0
      : parseInt(hours, 10);
  const dueDateTime = new Date(dueDate);
  dueDateTime.setHours(dueHour);
  dueDateTime.setMinutes(parseInt(minutes, 10));
  dueDateTime.setSeconds(0);

  const now = new Date();
  const timeDiff = dueDateTime - now;

  if (timeDiff <= 0) return "Overdue";

  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hoursLeft}h ${minutesLeft}m remaining`;
}

function TodoItem({ todo, index }) {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
      <label className="inline-flex items-center cursor-pointer size={24}">
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          className="w-4 h-4"
        />
        <span className="ml-2"></span>
      </label>
      <span
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
        style={{ whiteSpace: "normal", wordWrap: "break-word" }}  // Allow text to wrap
      >
        {todo.text}
        {todo.dueDate && (
          <span className="text-sm text-gray-400 ml-2">
            Due: {todo.dueDate} {todo.dueTime}
          </span>
        )}
        {todo.dueDate && todo.dueTime && (
          <span className="text-sm text-gray-400 ml-2">
            {getRemainingTime(todo.dueDate, todo.dueTime)}
          </span>
        )}
      </span>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(toggleTodo({ id: index }))}
          className="text-blue-400 hover:text-green-600 focus:outline-none"
        >
          {todo.completed ? (
            <IoToggleSharp size={24} />
          ) : (
            <IoToggleOutline size={24} />
          )}
        </button>

        <button
          onClick={() => dispatch(markCompleted({ id: index }))}
          className="text-green-400 hover:text-green-600 focus:outline-none"
        >
          <IoCheckmarkDoneCircleOutline size={24} />
        </button>

        <button
          onClick={() => dispatch(removeTodo({ id: index }))}
          className="text-red-400 hover:text-red-600 focus:outline-none"
        >
          <MdDeleteOutline size={24} />
        </button>
      </div>
    </li>
  );
}



// TodoList Component
function TodoList() {
  const todos = useSelector((state) => {
    const todos = state.todos.todos;
    const filter = state.todos.filter;
    if (!Array.isArray(todos)) return [];
    switch (filter) {
      case "COMPLETED":
        return todos.filter((todo) => todo.completed);
      case "INCOMPLETE":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  });

  return (
    <ul >
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </ul>
  );
}


// App Component
function App() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState(null); // State for due date
  const [dueTime, setDueTime] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      alert("Please enter a todo item.");
      return;
    }

    if (!dueDate && !dueTime) {
      alert("Please enter a due date and/or time.");
      return;
    }

    dispatch(
      addTodo({
        text: newTodo,
        dueDate: dueDate ? dueDate.toLocaleDateString() : null,
        dueTime,
      })
    );
    setNewTodo("");
    setDueDate(null);
    setDueTime("");
  };

  const handleMarkAllCompleted = () => {
    dispatch(markAllCompleted());
  };

  return (
    <>
      <div className="flex flex-row h-screen ">
        {/* Fixed-width sidebar */}
        <div className="w-64 bg-gray-800 text-white h-full">
          <VerticalNavbar />
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-gray-700 flex items-center justify-center py-10">
          <div className="bg-gray-600 shadow-lg rounded-lg p-6 max-w-md w-full">
            <h1 className="text-2xl font-bold text-white mb-4">Todo List</h1>

            <div className="mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                className={`w-full p-2 border ${
                  newTodo.trim() === "" ? "border-gray-600" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2`}
              />
              <div className="flex flex-row space-x-4">
                <div className="flex mb-2">
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    placeholderText="Select due date"
                    className={`w-full p-2 border ${
                      !dueDate && dueTime ? "border-blue-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <FaCalendarAlt className="absolute top-2 right-2 text-white" size={20} />
                </div>

                <div className="flex mb-4">
                  <TimePicker
                    value={dueTime}
                    onChange={setDueTime}
                    clockType="12-hour"
                    format="hh:mm a"
                    disableClock={true}
                    className={`w-full p-2 border ${
                      dueDate && !dueTime ? "border-white" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                  />
                </div>
              </div>

              <button
                onClick={handleAddTodo}
                className="bg-blue-500 text-gray-100 w-full px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Add
              </button>
            </div>
            <div className="flex flex-col items-center">

            <TodoList/>

            </div>


            <button
              onClick={handleMarkAllCompleted}
              className="w-full mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Mark All Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
