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
    if(timestamp <= 0){
      setTimerON(prev => !prev);
      return setTimeObject({days: 0, hours: 0, minutes: 0, seconds: 0});
    }

    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60) ;
    const hours = Math.floor(minutes / 60) ;
    const days = Math.floor(hours / 24);

    //validations
    if(days > 99) {
      setTimerON(prev => !prev);
      return setTimeObject({days: 0, hours: 0, minutes: 0, seconds: 0});
    }

    return setTimeObject({days: days, hours: hours%24, minutes: minutes%60, seconds: seconds%60});
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
    <div className='App'>
      <h1>Countdown <span className='timerWord'>Timer</span></h1>
      <DateTime changeTimer={changeTimer} value={targetTime}/>
      <Button toggleButton={toggleButton} timerON={timerON}/>
      <section className='cardsSection'>
        <Card value={timeObject.days} type={"Days"}/>
        <Card value={timeObject.hours} type={"Hours"}/>
        <Card value={timeObject.minutes} type={"Minutes"}/>
        <Card value={timeObject.seconds} type={"Seconds"}/>
      </section>
    </div>
  )
}

export default App
