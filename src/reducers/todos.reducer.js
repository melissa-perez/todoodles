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
        case actions.loadTodos:
            return {
                ...state,
                isLoading: false,
                todoList: action.records.map((record) => {
                    const todo = {
                        id: record.id,
                        ...record.fields,
                    };
                    if (!todo.isCompleted) todo.isCompleted = false;
                    return todo;
                })
            };
        case actions.setLoadError:
            return { ...state, isLoading: false, errorMessage: action.error.message };
        case actions.startRequest:
            return { ...state };
        case actions.addTodo:
            return { ...state };
        case actions.endRequest:
            return { ...state };
        case actions.updateTodo:
            return { ...state };
        case actions.completeTodo:
            return { ...state };
        case actions.revertTodo:
            return { ...state };
        case actions.clearError:
            return { ...state };
    }

};


export { initialState, actions };