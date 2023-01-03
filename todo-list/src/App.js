
import './App.css';

import TodoList from './component/TodoList';

import React, { useState } from 'react'

function App() {

  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <button className="btn btn-primary" onClick={() => setShow(!show)}>Hide</button>
      {show ? <TodoList /> : <div>Good Bye</div>}




    </div>
  )
}

export default App




