

export const convertTimestamp = params => {
    const { targetTime, setTimerON, setUserMessage, setTimeObject } = params;

    const difference = new Date(targetTime) - new Date();

    if(difference < 0){
      setTimerON(prev => !prev);
      setUserMessage({timeUp: true, error: false, message: "The countdown is over! What's next on your adventure?"});
      setTimeObject({days: 0, hours: 0, minutes: 0, seconds: 0});
    }

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60) ;
    const hours = Math.floor(minutes / 60) ;
    const days = Math.floor(hours / 24);

    //validations
    if(days > 100) {
      setTimerON(prev => !prev);
      setUserMessage({timeUp: false, error: true, message: "Selected time is more than 100 days"});
      setTimeObject({days: 0, hours: 0, minutes: 0, seconds: 0});
    }

    setTimeObject({days: days, hours: hours%24, minutes: minutes%60, seconds: seconds%60});
  }

