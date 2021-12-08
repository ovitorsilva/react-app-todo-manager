import * as todoTypes from './types';
import {v4 as uuidv4} from 'uuid';

function reducer(state, action){
    switch(action.type){
        case todoTypes.ADD_TODO:
            return state.concat({
                id: uuidv4(),
                title: action.payload.title,
                completed: false
            });
        case todoTypes.REMOVE_TODO:
            return state.filter((todo) => {
                return todo.id !== action.payload.id;
            });
        case todoTypes.TOGGLE_TODO_STATUS:
            return state.map((todo) => {
                if(todo.id === action.payload.id){
                    return { ...todo, completed: action.payload.completed }
                } else{
                    return todo;
                }
            });
        case todoTypes.UPDATE_TITLE_TODO:
            return state.map((todo) => {
                if(todo.id === action.payload.id){
                    return { ...todo, title: action.payload.title }
                } else{
                    return todo;
                }
            });

        default:
            throw new Error();
    }
}

export default reducer;