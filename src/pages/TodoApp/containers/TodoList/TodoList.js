import React, { useContext, useCallback, useState } from "react";
import styles from './TodoList.module.css'
import TodosContext from '../../../../state/todos/Context'
import TodoItem from "./components/TodoItem/TodoItem";
import * as todosActions from '../../../../state/todos/actions'
import TodoModal from './components/TodoModal/TodoModal';
import FilterContext from '../../../../state/filter/Context'

function filteredList(list, currentFilter){
    switch (currentFilter){
        case 'all':
            return list;
        case 'active':
            return list.filter((item) => {
                return item.completed === false
            })
        case 'completed':
            return list.filter((item) => {
                return item.completed === true
            })
        default: 
            throw new Error();
    }
}

function TodoList() {
    const { todos, dispatchTodos } = useContext(TodosContext);
    const handleTitleUpdate = useCallback((id, title) => {
        dispatchTodos(todosActions.updateTitleTodo(id, title))

    }, [dispatchTodos])
    const handleDelete = useCallback((id) => {
        dispatchTodos(todosActions.removeTodo(id))
    }, [dispatchTodos])
    const handleStatusUpdate = useCallback((id, completed) => {
        dispatchTodos(todosActions.toggleTodoStatus(id, completed))
    }, [dispatchTodos])
    const [curId, setCurId] = useState(null); 
    const handleModalOpen = useCallback((id) => {
        setCurId(id)
    }, [])
    const handleModalClose = useCallback(() => {
        setCurId(null)
    }, [])
    const getTitle = useCallback((id) => {
        const curTodo = todos.find((todo) => {
            return todo.id === id
        })
        return curTodo.title
    }, [todos])
    const { filter } = useContext(FilterContext)
    return (
        <div className={styles.container}>
            <ul>
                { filteredList(todos, filter).map((todo) => {
                    return (
                        <TodoItem 
                            key={ todo.id } 
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onModalOpen={handleModalOpen}
                            onStatusUpdate={handleStatusUpdate}
                            onDelete={() => { handleDelete(todo.id) }}
                        />
                    )
                })}
            </ul>
            {curId && (
                <TodoModal 
                    id={curId}
                    onModalClose={handleModalClose} 
                    onTitleUpdate={handleTitleUpdate}
                    findTitle={getTitle}
                />
            )}
        </div>
    )
}

export default TodoList;