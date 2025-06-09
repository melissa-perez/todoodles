import { useState, useEffect, useCallback, useReducer } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodoState,
} from './reducers/todos.reducer';

import TodosPage from './pages/TodosPage';

import Header from './shared/Header';

import './App.css';
import styles from './App.module.css';
import todolist from '../src/assets/list_3176366.png';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

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
  const [todoState, dispatch] = useReducer(todosReducer, initialTodoState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();

  const encodeUrl = useCallback(() => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    if (queryString)
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [queryString, sortDirection, sortField]);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Todo List');
        break;
      case '/about':
        setTitle('About');
        break;
      default:
        setTitle('Not Found');
    }
  }, [location]);
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = createOptions(HTTP_METHOD.GET);
      try {
        const response = await fetch(encodeUrl(), options);
        if (!response.ok) {
          const errorMsg = response?.message || 'Something went wrong';
          throw new Error(errorMsg);
        }
        const { records } = await response.json();
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
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
      dispatch({ type: todoActions.startRequest });
      const response = await fetch(encodeUrl(), options);
      if (!response.ok) {
        const errorMsg = response?.message || 'Something went wrong';
        throw new Error(errorMsg);
      }
      const { records } = await response.json();
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  const completeTodo = async (id) => {
    const options = createOptions(HTTP_METHOD.PATCH);
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
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
        const errorMsg = response?.message || 'Something went wrong';
        throw new Error(errorMsg);
      }
      dispatch({ type: todoActions.completeTodo, id });
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error: `${error.message}. Reverting todo...`,
      });
      dispatch({ type: todoActions.completeTodo, originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const updateTodo = async (editedTodo) => {
    const options = createOptions(HTTP_METHOD.PATCH);
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
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
        const errorMsg = response?.message || 'Something went wrong';
        throw new Error(errorMsg);
      }
      const { records } = await response.json();
      const updatedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) updatedTodo.isCompleted = false;
      dispatch({ type: todoActions.updateTodo, editedTodo: updatedTodo });
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error: `${error.message}. Reverting todo...`,
      });
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <>
      <img
        src={todolist}
        alt="checklist image"
        width={100}
        height={100}
        className={styles.center}
      />
      <Header title={title} />

      <div className={styles.center}>
        <Routes>
          <Route
            path="/"
            element={
              <TodosPage
                todoState={todoState}
                completeTodo={completeTodo}
                updateTodo={updateTodo}
                addTodo={addTodo}
                sortField={sortField}
                setSortField={setSortField}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                queryString={queryString}
                setQueryString={setQueryString}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {todoState.errorMessage ? (
        <div className={styles.errorBorder}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button
            onClick={() => {
              dispatch({ type: todoActions.clearError });
            }}
          >
            Dismiss Error Message
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
