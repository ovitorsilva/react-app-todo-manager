import * as todoTypes from './types'

//const todo = {
//    id,
//    title,
//    completed
//
//}

export function addTodo(title) {
    return {
        type: todoTypes.ADD_TODO,
        payload: {
            title: title
        }
    }
}


export function toggleTodoStatus(id, completed) {
    return {
        type: todoTypes.TOGGLE_TODO_STATUS,
        payload: {
            id: id,
            completed: completed
        }
    }
}

export function updateTitleTodo(id, title) {
    return {
        type: todoTypes.UPDATE_TITLE_TODO,
        payload: {
            id: id,
            title: title
        }
    }
}

export function removeTodo(id) {
    return {
        type: todoTypes.REMOVE_TODO,
        payload: {
            id: id
        }
    }
}
