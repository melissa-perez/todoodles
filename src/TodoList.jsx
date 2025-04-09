import TodoListItem from './TodoListItem';

function TodoList({ todos }) {
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoListItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
