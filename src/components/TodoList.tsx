import React, { useEffect, useState } from 'react';
import Todo from './Todo'
import { connect } from 'react-redux';
const TodoList = ({
  todoList
}) => {
  return (
    <ul className='flex flex-col w-[500px]' data-cy='todolist'>

        {
          todoList.map((todo,index) => (<Todo todo ={todo} key={todo.id}/>))
        }
    </ul>
  )
}
const mapStateToProps = state => {
  return {
    todoList: state.todoList
  }
}
export default connect(mapStateToProps,)(TodoList)