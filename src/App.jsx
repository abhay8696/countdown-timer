import { useEffect, useRef, useState } from 'react'
//styles
import './App.css'
//components
import DateTime from './components/DateTime'
import Button from './components/Button'
import CardSection from './components/CardsSection'
//helper functions
import { convertTimestamp } from './helperFunctions/convertTime'
import audioFile from "./assets/audio.mp3"

function App() {
  const [timerON, setTimerON] = useState(false);
  const [targetTime, setTargetTime] = useState("2024-03-20T02:00");
  const [runInterval, setRunInterval] = useState(null);
  const [timeObject, setTimeObject] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [userMessage, setUserMessage] = useState({timeUp: false, error: false, message: "" });
  const sound = useRef(new Audio(audioFile));


  //functions
  const changeTimer = event => {
    setUserMessage({timeUp: false, error: false, message: ""});
    setTargetTime(event.target.value);
  }

  const toggleButton = ()=> setTimerON(prev => !prev);

  const startInterVal = () => {
    const difference = new Date(targetTime) - new Date();

    if(difference < 0) {
      return setUserMessage({timeUp: false, error: true, message: "Date/Time is in the past"});
    }

    return setInterval(()=> {
      convertTimestamp({ targetTime, setTimerON, setUserMessage, setTimeObject });
    }, 1000)
  }

  // const playSound = () => {
  //   return .play();
  // }

  //lifecycle
  useEffect(()=> {
    if(timerON) setRunInterval(startInterVal());
    if(!timerON){startInterVal
      setRunInterval(previousInterval => {
        clearInterval(previousInterval);
        return null;
      });
      setTimeObject({days: 0, hours: 0, minutes: 0, seconds: 0});
    }
    return clearInterval(runInterval);
  }, [timerON])

  //play sound when time is up
  useEffect(()=> {
    if(userMessage?.timeUp){
      sound.current.play()
    }
    else sound.current.pause();
  }, [userMessage])

  return (
    <div className='App'>
      <h1>Countdown <span className='timerWord'>Timer</span></h1>
      <DateTime changeTimer={changeTimer} value={targetTime} inputErr={userMessage.error}/>
      <Button toggleButton={toggleButton} timerON={timerON}/>
      
      {!userMessage.message.length ? 
        <CardSection timeObject={timeObject} userMessage={userMessage}/> 
      : 
        <p className='userMessage'>{userMessage.message}</p>
      }
    </div>
  )
}

export default App
