import { legacy_createStore as createStore}  from 'redux'
import produce from 'immer'
import type { Reducer } from 'react'

interface TodoType {
  id: string,
  val: string,
  state: TodoState
}
interface StateType {
  todoList: TodoType[]
}


export enum TodoState {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ONHOLD = 'onhold'
}
export enum ActionType {
  ADD = 'ADD_TODO',
  DELETE = 'DELETE_TODO',
  FINISH = 'FINISH_TODO',
  REVERT = 'REVERT_TODO'
}

export const addTodoAction = (val:string) => {
  return {
    type: ActionType.ADD,
    payload: {
      val
    }
  }
}
export const deleteTodoAction = (id: string) => {
  return {
    type: ActionType.DELETE,
    payload: {
      id
    }
  }
}
export const finishTodoAction = (id: string) => {
  return {
    type: ActionType.FINISH,
    payload: {
      id
    }
  }
}
export const revertTodoAction = (id: string) => {
  return {
    type: ActionType.REVERT,
    payload: {
      id
    }
  }
}
type TodoActionTypes = ReturnType<typeof addTodoAction> | ReturnType<typeof deleteTodoAction> | ReturnType<typeof finishTodoAction> | ReturnType<typeof revertTodoAction>
const initialState = {
  todoList: []
}

const todoReducer: Reducer<StateType,TodoActionTypes> = (state = initialState, action) => {
  switch(action.type){
    case ActionType.ADD:
      return produce(state,draftState => {
        const {val} = action.payload as {val: string}
        draftState.todoList.push({
          id: (Math.random() + new Date().getTime()).toString(36).slice(0,8),
          val,
          state: TodoState.PENDING
        })
      })
    case ActionType.DELETE:
      return produce(state,draftState => {
        const {id} = action.payload as {id: string}
        const itemIndex = draftState.todoList.findIndex((item) => item.id === id)
        console.log(draftState);
        
        draftState.todoList.splice(itemIndex,1)
      })
    case ActionType.FINISH:
      return produce(state,draftState => {
        const {id} = action.payload as {id: string}
        const draftItem = draftState.todoList.find((item) => item.id === id)
        draftItem.state = TodoState.COMPLETED
      })
    case ActionType.REVERT:
      return produce(state,draftState => {
        const {id} = action.payload as {id: string}
        const draftItem = draftState.todoList.find((item) => item.id === id)
        draftItem.state = TodoState.PENDING
      })
    default:
      return state
  }
}

export default createStore(todoReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)