import TodoListItem from './TodoListItem';

function TodoList({ todos }) {
  return (
    <>
      {todos.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
