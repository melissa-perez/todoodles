const initialState = { todoList: [], isLoading: false, isSaving: false, errorMessage: "" };

const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.fetchTodos:
            return { ...state, isLoading: true };
        case actions.loadTodos: {
            const fetchedTodos = action.records.map((record) => {
                const todo = {
                    id: record.id,
                    ...record.fields,
                };
                if (!todo.isCompleted) todo.isCompleted = false;
                return todo;
            });
            return {
                ...state,
                isLoading: false,
                todoList: fetchedTodos
            };
        }
        case actions.setLoadError:
            return { ...state, isLoading: false, errorMessage: action.error.message };
        case actions.startRequest:
            return { ...state, isSaving: true };
        case actions.addTodo:
            {
                const savedTodo = {
                    id: action.records[0].id,
                    ...action.records[0].fields,
                };
                if (!action.records[0].fields.isCompleted) savedTodo.isCompleted = false;

                return { ...state, isSaving: false, todoList: [...state.todoList, savedTodo] };
            }
        case actions.endRequest:
            return { ...state, isLoading: false, isSaving: false };
        case actions.updateTodo:
            return { ...state };
        case actions.completeTodo:
            return { ...state };
        case actions.revertTodo:
            return { ...state };
        case actions.clearError:
            return { ...state, errorMessage: "" };
    }

};


export { initialState, actions };