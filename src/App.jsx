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

    //save target time to local storage
    window.localStorage.setItem("targetTime", event.target.value);
  }

  const toggleButton = ()=> setTimerON(prev => !prev);

  //start interval for every 1 sec
  const startInterVal = (target) => {

    console.log(target)
    let inter = setInterval(()=> {
      convertTimestamp({ targetTime: target, setTimerON, setUserMessage, setTimeObject });
    }, 1000)

    setRunInterval(inter);
  }

  //check local storage for existing timer
  const checkForExistingTimer = () => {
    let doesExist = window.localStorage.getItem("targetTime");
    
    if(doesExist) {
      setTargetTime(doesExist);
      setTimerON(true);
    }
  }

  // const playSound = () => {
  //   return .play();
  // }

  //lifecycle
  useEffect(()=> {
    checkForExistingTimer();
    if(runInterval) return clearInterval(runInterval);
  }, [])

  useEffect(()=> {
    if(timerON) {
      const difference = new Date(targetTime) - new Date();
  
      if(difference < 0) {
        return setUserMessage({timeUp: false, error: true, message: "Date/Time is in the past"});
      }
  

      startInterVal(targetTime);
    }
    if(!timerON){
      setRunInterval(previousInterval => {
        clearInterval(previousInterval);
        return null;
      });
      setTimeObject({days: 0, hours: 0, minutes: 0, seconds: 0});
    }
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
