import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addTodoAction,ActionType } from '../redux';
const AddTodo =  ({
  addTodoAction
}) => {
  const [todoVal,setVal] = useState('')
  const changeInput = (event) => {
    setVal(event.target.value)
  }
  const submitTodo = () => {
    if(todoVal === '') return;
    addTodoAction(todoVal as string)
  }
  return (
    <div className='flex flex-row justify-center'>
      <input
      className='block border text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md'
      value={todoVal}
      data-cy='addinput'
      onChange={changeInput} onKeyUp={(e) => {
        if(e.key === 'Enter'){
          submitTodo()
          setVal('')
        }
      }}/>
      <button onClick={submitTodo} data-cy='addbutton'>添加</button>
    </div>
  )
}
export default connect(null,{addTodoAction})(AddTodo)