import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledTodoForm = styled.form`
  margin: 0.2em 0.5em;
  padding: 0.1em 0.3em;
`;

const StyledButton = styled.button`
  &:disabled {
    font-style: italic;
  }
`;

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
      <StyledTodoForm onSubmit={handleAddTodo}>
        <TextInputWithLabel
          elementId="todoTitle"
          label="Todo"
          value={workingTodo}
          onChange={(event) => {
            setWorkingTodo(event.target.value);
          }}
          ref={todoTitleInput}
        />
        <StyledButton disabled={workingTodo === ''}>
          {isSaving ? <>Saving...</> : <>Add Todo</>}
        </StyledButton>
      </StyledTodoForm>
    </>
  );
}

export default TodoForm;
