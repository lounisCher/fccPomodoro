import { useEffect, useState } from 'react'
import './App.css'
import { FaPause, FaPlay, FaPlus, FaMinus } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";

function App() {
   const [timer, setTimer] = useState(25 * 60);
   const [isWork, setIsWork] = useState(true);
   const [isActive, setIsActive] = useState(false);
   const [breakLength, setBreakLength] = useState(5);
   const [sessionLength, setSessionLength] = useState(25);
   
   const increaseBreak = () => {
    if (!isActive && breakLength < 60){
      setBreakLength(breakLength + 1);
      if(!isWork){
        setTimer((breakLength + 1) * 60);
      }
    } 
  };

  const decreaseBreak = () => {
    if (!isActive && breakLength > 1){
      setBreakLength(breakLength - 1);
    } 
    if(!isWork){
      setTimer((breakLength - 1) * 60);
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

  const formaTime = (ts) => {
    const minutes = Math.floor(ts / 60);
    const secondes = ts % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      secondes < 10 ? "0" + secondes : secondes
    }`;
  }

  const reset = () => {
    setTimer(25 * 60);
    setIsActive(false);
    setIsWork(true);
    setBreakLength(5);
    setSessionLength(25);
    const audio = document.getElementById("beep");
    audio.pause();        
    audio.currentTime = 0;
  }

  const togglePlayPause = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (timer === 0) {
          document.getElementById('beep').play();
          if (isWork) {
            setIsWork(false); 
            setTimer(breakLength * 60); 
          } else {
            setIsWork(true); 
            setTimer(sessionLength * 60); 
          }
        } else {
          setTimer((prev) => prev - 1); 
        }
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isWork, breakLength, sessionLength]);

  return (
    <div className='bg-slate-900 flex flex-col items-center justify-center w-full h-screen p-4 rounded-md'>
      <h1 className='text-white font-bold text-3xl sm:text-5xl lg:text-6xl font-mono m-3'>Pomodoro</h1>
      <h3 className='font-bold text-xl sm:text-3xl lg:text-4xl font-mono text-fuchsia-200 m-4'>25/5 Clock</h3>

      <div className='w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-orange-600 rounded-full flex items-center justify-center shadow-md shadow-slate-600'>
        <div className='w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-orange-400 rounded-full flex items-center justify-center flex-col gap-5'>
          <p className='font-serif text-gray-300 text-3xl sm:text-4xl lg:text-5xl' id="timer-label">
            {isWork ? "Session" : "Break"}
          </p>
          <p className='font-serif text-gray-300 text-4xl sm:text-5xl lg:text-6xl' id="time-left">
            {formaTime(timer)}
          </p>
        </div>
      </div>

      <div className='flex gap-6 sm:gap-10 m-6'>
        <button id="start_stop" onClick={togglePlayPause}>
          {isActive ? (
            <FaPause size={30} className='sm:size={36} lg:size={42}' color='white'/>
          ) : (
            <FaPlay size={30} className='sm:size={36} lg:size={42}' color='white'/>
          )}
        </button>
        <button id="reset" onClick={reset}>
          <RiRestartLine size={30} className='sm:size={36} lg:size={42}' color='white'/>
        </button>
      </div>

      <div className='flex justify-around w-full max-w-sm sm:max-w-md lg:max-w-lg'>
        <div className='flex flex-col items-center p-4 sm:p-6 lg:p-8 m-2 sm:m-4 lg:m-5'>
          <h1 className='text-white text-xl sm:text-2xl lg:text-3xl mb-2' id="break-label">Break Length</h1>
          <div className='flex items-center gap-4'>
            <button className='bg-orange-600 p-2 sm:p-3 lg:p-4 rounded-full hover:bg-orange-500' id="break-decrement" onClick={decreaseBreak}>
              <FaMinus size={20} className='sm:size={24} lg:size={28}' color='white' />
            </button>
            <p className='text-white text-2xl sm:text-3xl lg:text-4xl' id="break-length">{breakLength}</p>
            <button className='bg-orange-600 p-2 sm:p-3 lg:p-4 rounded-full hover:bg-orange-500' id="break-increment" onClick={increaseBreak}>
              <FaPlus size={20} className='sm:size={24} lg:size={28}' color='white' />
            </button>
          </div>
        </div>

        <div className='flex flex-col items-center p-4 sm:p-6 lg:p-8 m-2 sm:m-4 lg:m-5'>
          <h1 className='text-white text-xl sm:text-2xl lg:text-3xl mb-2' id="session-label">Session Length</h1>
          <div className='flex items-center gap-4'>
            <button className='bg-orange-600 p-2 sm:p-3 lg:p-4 rounded-full hover:bg-orange-500' id="session-decrement" onClick={decreaseSession}>
              <FaMinus size={20} className='sm:size={24} lg:size={28}' color='white' />
            </button>
            <p className='text-white text-2xl sm:text-3xl lg:text-4xl' id="session-length">{sessionLength}</p>
            <button className='bg-orange-600 p-2 sm:p-3 lg:p-4 rounded-full hover:bg-orange-500' id="session-increment" onClick={increaseSession}>
              <FaPlus size={20} className='sm:size={24} lg:size={28}' color='white' />
            </button>
            <audio id="beep" preload="auto" src="src/assets/buzzer.mp3"></audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
