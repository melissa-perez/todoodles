import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    newTodo.isCompleted = false;
    setTodoList([...todoList, newTodo]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) return { ...todo, isCompleted: true };
      return todo;
    });
    setTodoList([...updatedTodos]);
  };
  return (
    <div>
      <h1>Todoodles</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
