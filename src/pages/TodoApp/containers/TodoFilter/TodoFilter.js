import React , { useContext, useCallback, useState, useEffect } from "react";
import FilterContext from '../../../../state/filter/Context'
import * as filterActions from '../../../../state/filter/actions'
import TodoSelect from './components/TodoSelect/TodoSelect'
import styles from './TodoFilter.module.css'

function TodoFilter() {
    const { filter, dispatchToFilter } = useContext(FilterContext)
    const updateFilter = useCallback((filter) => {
        dispatchToFilter(filterActions.toggleFilter(filter))
    }, [dispatchToFilter])
    const [selectValue, setSelectValue] = useState(filter)
    const handleOptionChange = useCallback((evt) => {
        setSelectValue(evt.target.value)
        console.warn('FOI', evt.target.value)
    }, [setSelectValue])
    useEffect(() =>{
        updateFilter(selectValue)
    }, [updateFilter, selectValue])
    return (
        <div className={styles.container}>
            <TodoSelect 
                value={selectValue} 
                onOptionChange={handleOptionChange}
                options={[
                    { value: 'all', title: 'Todas as tarefas' },
                    { value: 'active', title: 'Tarefas a fazer'},
                    { value: 'completed', title: 'Tarefas concluídas' }
                ]}
            />
        </div>
    )
}

export default TodoFilter