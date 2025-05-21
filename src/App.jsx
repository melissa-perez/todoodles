import { useState, useEffect, useCallback } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import './App.css';
import styles from './App.module.css';
import todolist from '../src/assets/list_3176366.png';

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
};

const createOptions = (action) => {
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const options = {
    method: action,
    headers: {
      Authorization: token,
    },
  };
  if (action !== HTTP_METHOD.GET) {
    options['headers']['Content-Type'] = 'application/json';
  }
  return options;
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const encodeUrl = useCallback(() => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    if (queryString)
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [queryString, sortDirection, sortField]);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = createOptions(HTTP_METHOD.GET);
      try {
        const response = await fetch(encodeUrl(), options);
        if (!response.ok) {
          throw new Error(response.message);
        }
        const { records } = await response.json();
        const fetchedTodos = records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) todo.isCompleted = false;
          return todo;
        });
        setTodoList([...fetchedTodos]);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString, encodeUrl]);

  const addTodo = async (newTodo) => {
    const options = createOptions(HTTP_METHOD.POST);
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    options['body'] = JSON.stringify(payload);
    try {
      setIsSaving(true);
      const response = await fetch(encodeUrl(), options);
      if (!response.ok) {
        throw new Error(response.message);
      }
      const { records } = await response.json();
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) savedTodo.isCompleted = false;
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodo = async (id) => {
    const options = createOptions(HTTP_METHOD.PATCH);
    const originalTodo = todoList.find((todo) => todo.id === id);
    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };
    options['body'] = JSON.stringify(payload);
    try {
      const response = await fetch(encodeUrl(), options);
      if (!response.ok) {
        throw new Error(response.message);
      }
      const { records } = await response.json();
      const updatedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) updatedTodo.isCompleted = false;
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) return { ...updatedTodo };
        return todo;
      });
      setTodoList([...updatedTodos]);
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) return { ...originalTodo };
        return todo;
      });
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const options = createOptions(HTTP_METHOD.PATCH);
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    options['body'] = JSON.stringify(payload);
    try {
      const response = await fetch(encodeUrl(), options);
      if (!response.ok) {
        throw new Error(response.message);
      }
      const { records } = await response.json();
      const updatedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) updatedTodo.isCompleted = false;
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) return { ...updatedTodo };
        return todo;
      });
      setTodoList([...updatedTodos]);
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) return { ...originalTodo };
        return todo;
      });
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.center}>
      <img src={todolist} alt="checklist image" width={100} height={100} />

      <h1>Todoodles</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todos={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      {errorMessage ? (
        <div className={styles.errorBorder}>
          <hr />
          <p>{errorMessage}</p>
          <button
            onClick={() => {
              setErrorMessage('');
            }}
          >
            Dismiss Error Message
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
