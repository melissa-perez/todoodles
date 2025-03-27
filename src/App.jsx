import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [newTodo, setNewTodo] = useState('PLACEHOLDER: newTodo state');
  return (
    <div>
      <h1>Todoodles</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
