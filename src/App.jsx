import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import DateTime from './components/DateTime'
import Button from './components/Button'

function App() {
  const [timerON, setTimerON] = useState(false);
  const [targetTime, setTargetTime] = useState("2024-03-20T02:00");
  const [runInterval, setRunInterval] = useState(null);
  const [timeObject, setTimeObject] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});


  //functions
  const changeTimer = event => {
    setTargetTime(event.target.value);
  }

  const toggleButton = ()=> setTimerON(prev => !prev);

  const startInterVal = () => {
    return setInterval(()=> {
      convertTimestamp(new Date(targetTime) - new Date())
    }, 1000)
  }

  const convertTimestamp = timestamp => {
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60) ;
    const hours = Math.floor(minutes / 60) ;
    const days = Math.floor(hours / 24);

    setTimeObject({days: days, hours: hours%24, minutes: minutes%60, seconds: seconds%60});
  }

  //lifecycle
  useEffect(()=> {
    if(timerON) setRunInterval(startInterVal());
    if(!timerON){
      setRunInterval(previousInterval => {
        clearInterval(previousInterval);
        return null;
      });
      setTimeObject({days: 0, hours: 0, minutes: 0, seconds: 0});
    }
    return clearInterval(runInterval);
  }, [timerON])



  return (
    <div>
      <h1>Countdown Timer</h1>
      <DateTime changeTimer={changeTimer} value={targetTime}/>
      <Button toggleButton={toggleButton} timerON={timerON}/>
      <Card value={timeObject.days} type={"Days"}/>
      <Card value={timeObject.hours} type={"Hours"}/>
      <Card value={timeObject.minutes} type={"Minutes"}/>
      <Card value={timeObject.seconds} type={"Seconds"}/>
    </div>
  )
}

export default App
