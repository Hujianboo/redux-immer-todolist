import React from 'react'
import {TodoState,finishTodoAction,revertTodoAction,deleteTodoAction} from '../redux'
import cx from 'classnames'
import { connect } from 'react-redux'
import {BackspaceIcon} from '@heroicons/react/24/outline'
const Todo = ({todo,finishTodoAction,revertTodoAction,deleteTodoAction}) => {
  const toggleTodo = () => {
    if(todo.state === TodoState.PENDING){
      finishTodoAction(todo.id)
    }else if(todo.state === TodoState.COMPLETED){
      revertTodoAction(todo.id)
    }
  }
  const deleteTodo = () => {
    deleteTodoAction(todo.id)
    
  }
  return (
    <li className='cursor-pointer border flex justify-between mb-[10px]' onClick={() => {
      toggleTodo()
    }}>
      <div className={cx(
        'inline-flex px-2 text-xs font-medium leading-5 rounded-full',
        {'line-through': todo.state === TodoState.COMPLETED})}>
        {todo.val}
      </div>
      <BackspaceIcon className='w-4' data-cy='deletetodo' onClick={(e) => {
        deleteTodo()
        e.stopPropagation()
      }}/>
    </li>
  )
}
export default connect(null,{
  finishTodoAction,
  revertTodoAction,
  deleteTodoAction
})(Todo)