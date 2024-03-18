import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import DateTime from './components/DateTime'
import Button from './components/Button'

function App() {
  const [timerON, setTimerON] = useState(false)

  //functions
  const changeTimer = event => {

  }

  const toggleButton = ()=> setTimerON(prev => !prev);


  return (
    <div>
      <h1>Countdown Timer</h1>
      <DateTime changeTimer={changeTimer}/>
      <Button toggleButton={toggleButton} timerON={timerON}/>
      <Card value={10} type={"Days"}/>
      <Card value={2} type={"Hours"}/>
      <Card value={54} type={"Minutes"}/>
      <Card value={29} type={"Seconds"}/>
    </div>
  )
}

export default App
