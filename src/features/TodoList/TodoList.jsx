import { useSearchParams } from 'react-router';

import TodoListItem from './TodoListItem';

import styles from './TodoList.module.css';

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredTodoList = todos.filter((todo) => todo.isCompleted === false);
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
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
        <>
          <ul className={styles.listItem}>
            {filteredTodoList.map((todo) => (
              <TodoListItem
                todo={todo}
                key={todo.id}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            ))}
          </ul>
          <div>
            <button>Previous</button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button>Next</button>
          </div>
        </>
      )}
    </>
  );
}

export default TodoList;
