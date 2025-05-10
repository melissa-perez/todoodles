import TodoListItem from './TodoListItem';

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todos.filter((todo) => todo.isCompleted === false);

  return (
    <>
      {filteredTodoList.length === 0 ? (
        <>
          {isLoading ? (
            <p>Todo list loading...</p>
          ) : (
            <p>Add todo above to get started</p>
          )}
        </>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              todo={todo}
              key={todo.id}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
