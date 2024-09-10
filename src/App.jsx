import { useEffect, useState, useRef } from 'react'
import './App.css'
import { FaPause, FaPlay, FaPlus, FaMinus } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";

function App() {
   const [timer, setTimer] = useState(25*60);
   const [isWork, setIsWork] = useState(true);
   const [isActive, setIsActive] = useState(false);
   const [breakLength, setBreakLength] = useState(5);
   const [sessionLength, setSessionLength] = useState(25);
   const timerRef = useRef(null)
   const increaseBreak = () => {
    if (!isActive && breakLength < 60){
      setBreakLength(breakLength + 1);
      if(!isWork){
        setTimer((breakLength+1)*60);
      }
    } 
  };

  const decreaseBreak = () => {
    if (!isActive && breakLength > 1){
      setBreakLength(breakLength - 1);
    } 
    if(!isWork){
      setTimer((breakLength-1)*60);
    }
  };

  const increaseSession = () => {
    if (!isActive && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimer((sessionLength + 1) * 60);
    }
  };

  const decreaseSession = () => {
    if (!isActive && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimer((sessionLength - 1) * 60);
    }
  };

  const formaTime=(ts)=>{
      const minutes = Math.floor(ts/60);
      const secondes =  ts%60;
      return `${minutes < 10 ? "0" + minutes : minutes}:${
        secondes < 10 ? "0" + secondes : secondes
      }`;
  }

  const reset=()=>{
    clearInterval(timerRef.current); 
    setTimer(25*60);
    setIsActive(false);
    setIsWork(true);
    setBreakLength(5);
    setSessionLength(25);
    const audio = document.getElementById("beep");
    audio.pause();        
    audio.currentTime = 0;
  }

  const togglePlayPause=()=>{
    setIsActive((prevActive) => !prevActive);
  }

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            document.getElementById('beep').play();
            if (isWork) {
              setIsWork(false);
              return breakLength * 60; 
            } else {
              setIsWork(true);
              return sessionLength * 60; 
            }
          } else {
            return prevTimer - 1; 
          }
        });
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(timerRef.current); 
    }
  
    return () => clearInterval(timerRef.current); 
  }, [isActive, isWork, breakLength, sessionLength]);
  

  return (
    <div className='bg-slate-900 flex flex-col items-center justify-center w-full h-full rounded-md p-4 sm:w-screen' >
      <h1 className='text-white font-bold text-4xl sm:text-6xl font-mono m-3'>Pomodoro</h1>
      <h3 className='font-bold text-2xl sm:text-4xl font-mono text-fuchsia-200 m-4'>25/5 Clock</h3>

      <div className='w-64 h-64 sm:w-80 sm:h-80 bg-orange-600 rounded-full flex items-center justify-center shadow-md shadow-slate-600'>
        <div className='w-56 h-56 sm:w-72 sm:h-72 bg-orange-400 rounded-full flex items-center justify-center flex-col gap-5'>
          <p className='font-serif text-gray-300 text-3xl sm:text-4xl' id="timer-label">{isWork ? "session" : "break"} </p>
          <p className='font-serif text-gray-300 text-5xl sm:text-6xl'  id="time-left">{formaTime(timer)}</p> 
        </div>
      </div>

      <div className='flex gap-6 sm:gap-10 m-6'>
        <button id="start_stop" onClick={togglePlayPause}>
          {isActive ? <FaPause size={30} sm:size={36} color='white'/> : <FaPlay size={30} sm:size={36} color='white'/>}
        </button>
        <button id="reset" onClick={reset}>
          <RiRestartLine size={30} sm:size={36} color='white'/>
        </button>
      </div>

      <div className='flex justify-around w-full max-w-sm sm:max-w-md'>
        <div className='flex flex-col items-center p-4 sm:p-6 m-2 sm:m-5'>
          <h1 className='text-white text-xl sm:text-2xl mb-2' id="break-label">Break Length</h1>
          <div className='flex items-center gap-4'>
            <button className='bg-orange-600 p-2 sm:p-2.5 rounded-full hover:bg-orange-500' id="break-decrement" onClick={decreaseBreak}>
              <FaMinus size={20} sm:size={24} color='white' />
            </button>
            <p className='text-white text-2xl sm:text-3xl' id="break-length">{breakLength}</p>
            <button className='bg-orange-600 p-2 sm:p-2.5 rounded-full hover:bg-orange-500' id="break-increment" onClick={increaseBreak}>
              <FaPlus size={20} sm:size={24} color='white' />
            </button>
          </div>
        </div>

        <div className='flex flex-col items-center p-4 sm:p-6 m-2 sm:m-5'>
          <h1 className='text-white text-xl sm:text-2xl mb-2' id="session-label">Session Length</h1>
          <div className='flex items-center gap-4'>
            <button className='bg-orange-600 p-2 sm:p-2.5 rounded-full hover:bg-orange-500' id="session-decrement" onClick={decreaseSession}>
              <FaMinus size={20} sm:size={24} color='white' />
            </button>
            <p className='text-white text-2xl sm:text-3xl' id="session-length">{sessionLength}</p>
            <button className='bg-orange-600 p-2 sm:p-2.5 rounded-full hover:bg-orange-500' id="session-increment" onClick={increaseSession}>
              <FaPlus size={20} sm:size={24} color='white' />
            </button>
            <audio id="beep" preload="auto" src="src/assets/buzzer.mp3"></audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;