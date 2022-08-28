import React from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import store, { ActionType,TodoState } from '../redux'
describe('AddTodo',() => {
  it('add one item by click', () => {
    const todo = 'add todo by click'
    cy.mount(<AddTodo/>,{reduxStore:store})
    cy.get("[data-cy='addinput']")
    .type(todo)
    .get("[data-cy='addbutton']")
    .click()
    .then(() => {
      const todoList = store.getState().todoList
      assert.equal(todoList[todoList.length - 1].val,todo,'add one successful')
    })
  })
  it('add one item by enter', () => {
    const todo = 'add todo by enter'
    cy.mount(<AddTodo/>,{reduxStore:store})
    cy.get("[data-cy='addinput']")
    .type(`${todo}\n`)
    .get("[data-cy='addbutton']")
    .then(() => {
      const todoList = store.getState().todoList
      assert.equal(todoList[todoList.length - 1].val,todo,'add one successful')
    })
  })
})
describe('TodoList', () => {
  it('show the item',() => {

    cy.mount(<TodoList/>,{reduxStore:store})
  })
  it('finish one item',() => {
    store.dispatch({
      type: ActionType.ADD,
      payload:{
        val: 'the todo need to be finish'
      }
    })
    cy.mount(<TodoList/>,{reduxStore:store})
    cy.get("[data-cy='todolist']").children().last().wait(1000).click()
    .then(() => {
      const todoList = store.getState().todoList
      assert.equal(todoList[todoList.length - 1].state,TodoState.COMPLETED,'finish one item')
    })
  })
  it('delete one item',() => {
    const oldTodoList = [...store.getState().todoList]
    cy.wait(1000)
    store.dispatch({
      type: ActionType.ADD,
      payload:{
        val: 'the todo need to be delete'
      }
    })
    cy.mount(<TodoList/>,{reduxStore:store})
    cy.get("[data-cy='todolist']").children().last().find("[data-cy='deletetodo']").wait(1000).click()
    .then(() => {
      const todoList = store.getState().todoList
      expect(todoList).to.deep.equal(oldTodoList)
    })
  })

  
})
