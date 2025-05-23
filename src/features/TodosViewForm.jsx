import { useState, useEffect } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledTodosViewForm = styled.form`
  margin: 0.2em 0.5em;
  padding: 1em 2em;
`;

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  return (
    <>
      <div>
        <TextInputWithLabel
          elementId="todoSearch"
          label="Search todos:"
          value={localQueryString}
          onChange={(event) => {
            setLocalQueryString(event.target.value);
          }}
          ref={null}
        />
        <button
          type="button"
          onClick={() => {
            setLocalQueryString('');
          }}
        >
          Clear
        </button>
      </div>
      <div>
        <StyledTodosViewForm onSubmit={preventRefresh}>
          <label htmlFor="sort">Sort by</label>
          <select
            name="sort"
            id="sort"
            onChange={(event) => setSortField(event.target.value)}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
          <label htmlFor="direction">Direction</label>
          <select
            name="direction"
            id="direction"
            onChange={(event) => setSortDirection(event.target.value)}
            value={sortDirection}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </StyledTodosViewForm>
      </div>
    </>
  );
}

export default TodosViewForm;
