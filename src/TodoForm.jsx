import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  let todoId = useRef(1);
  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo({ title: title, id: todoId.current });
    event.target.title.value = '';
    todoTitleInput.current.focus();
    todoId.current = todoId.current + 1;
  };
  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Todo</label>
        <input type="text" id="todoTitle" name="title" ref={todoTitleInput} />
        <button>Add Todo</button>
      </form>
    </>
  );
}

export default TodoForm;
