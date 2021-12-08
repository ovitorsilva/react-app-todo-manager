import React, { useContext, useEffect, useRef } from "react";
import { useFormik } from 'formik';
import TodosContext from '../../../../state/todos/Context'
import * as TodosActions from '../../../../state/todos/actions'
import * as yup from 'yup'
import styles from './TodoCreator.module.css'

function TodoCreator() {
    const { dispatchTodos } = useContext(TodosContext);

    const { getFieldProps, errors, handleSubmit  } = useFormik({
        initialValues: {
            title: ''
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: yup.object({
            title: yup.string()
            .required('Você precisa preencher com uma tarefa!')
        }),
        onSubmit: (values, formikBag) => {
            dispatchTodos(TodosActions.addTodo(values.title))
            formikBag.setFieldValue('title', '', false)
        }
    })
    const inputTitle = useRef(null)
    useEffect(() =>{
        inputTitle.current.focus()
    }, []);
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <input 
                className={styles.input}
                type='text'
                placeholder='Nova tarefa'
                autoComplete='off'
                ref={inputTitle} 
                { ... getFieldProps('title')}
            />
            {errors.title ? (
                <small className={styles.error}>{errors.title}</small>
            ) : null}
            <button 
                className={styles.submit}
                type='submit' >
                Adicionar tarefa
            </button>
        </form>
    )

}

export default TodoCreator