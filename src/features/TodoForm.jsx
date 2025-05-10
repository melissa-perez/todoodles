import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodo, setWorkingTodo] = useState('');
  const todoTitleInput = useRef('');
  const id = Date.now();

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: workingTodo, id, isCompleted: false });
    todoTitleInput.current.focus();
    setWorkingTodo('');
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          elementId="todoTitle"
          label="Todo"
          value={workingTodo}
          onChange={(event) => {
            setWorkingTodo(event.target.value);
          }}
          ref={todoTitleInput}
        />
        <button disabled={workingTodo === ''}>{isSaving ? (<>Saving...</>) : (<>Add Todo</>)}</button>
      </form>
    </>
  );
}

export default TodoForm;
