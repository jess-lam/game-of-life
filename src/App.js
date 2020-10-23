import React from 'react'
import {Route} from 'react-router-dom'
import home from './components/home/home';
import instructions from './components/instructions/instructions'
import grid from './components/grid/grid'
import './App.css'
const App = () => {
    

    return (
      <div className = "App">
        <Route exact path='/' component ={home}></Route>
        <Route exact path='/play' component ={grid}></Route>
        <Route exact path='/about' component ={instructions}></Route>

      </div>

    )
}

export default App;
