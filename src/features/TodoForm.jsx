import { useState, useRef } from 'react';
import InputWithLabel from '../shared/InputWIthLabel';

function TodoForm({ onAddTodo }) {
  const [workingTodo, setWorkingTodo] = useState('');
  const todoTitleInput = useRef('');
  const id = Date.now();

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: workingTodo, id });
    todoTitleInput.current.focus();
    setWorkingTodo('');
  };
  return (
    <>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          elementId="todoTitle"
          label="Todo"
          value={workingTodo}
          onChange={(event) => {
            setWorkingTodo(event.target.value);
          }}
          ref={todoTitleInput}
        />
        <button disabled={workingTodo === ''}>Add Todo</button>
      </form>
    </>
  );
}

export default TodoForm;
