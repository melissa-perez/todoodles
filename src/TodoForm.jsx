import { useState, useRef } from 'react';

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
        <label htmlFor="todoTitle">Todo</label>
        <input
          type="text"
          id="todoTitle"
          value={workingTodo}
          onChange={(event) => {
            setWorkingTodo(event.target.value);
          }}
          ref={todoTitleInput}
        />
        <button>Add Todo</button>
      </form>
    </>
  );
}

export default TodoForm;
