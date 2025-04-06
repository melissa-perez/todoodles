import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  return (
    <div>
      <h1>Todoodles</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todoList} />
    </div>
  );
}

export default App;
