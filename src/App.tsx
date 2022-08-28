import { Provider } from 'react-redux'
import store from './redux'
import './App.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import cx from 'classnames';
function App() {

  return (
    <Provider store={store}>
    <div className={'flex flex-col items-center'} >
      <AddTodo/>
      <TodoList/>
    </div>
    </Provider>
  )
}

export default App
