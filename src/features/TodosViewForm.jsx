import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div>
        <TextInputWithLabel
          elementId="todoSearch"
          label="Search todos:"
          value={queryString}
          onChange={(event) => {
            setQueryString(event.target.value);
          }}
          ref={null}
        />
        <button
          type="button"
          onClick={() => {
            setQueryString('');
          }}
        >
          Clear
        </button>
      </div>
      <div>
        <form onSubmit={preventRefresh}>
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
        </form>
      </div>
    </>
  );
}

export default TodosViewForm;
