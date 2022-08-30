import React from 'react'
import {TodoState,finishTodoAction,revertTodoAction,deleteTodoAction} from '../redux'
import cx from 'classnames'
import { connect } from 'react-redux'
import {BackspaceIcon} from '@heroicons/react/24/outline'
import CloseIcon from './CloseIcon'
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
<li className='cursor-pointer border rounded-lg p-[10px] flex justify-between mb-[10px]' onClick={() => {
      toggleTodo()
    }}>
      <div className={cx(
        'inline-flex px-2 text-xs font-medium leading-5 rounded-full select-none text-[18px]',
        {'line-through': todo.state === TodoState.COMPLETED
        },
        {
          'text-blue-600/100': todo.state === TodoState.COMPLETED
        })}>
        {todo.val}
      </div>
      <CloseIcon className='w-6' data-cy='deletetodo' onClick={(e) => {
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