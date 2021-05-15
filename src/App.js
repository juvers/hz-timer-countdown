import "./styles.css";
import { useState, useEffect } from 'react';
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Container from "./components/Container/Container";
import Typography from "./components/Typography/Typography";
import { useCountdown } from "./hooks/useCountdown";
import timeStore from './store/TimeStore';



export default function App() {
  const [timer, setTimer] = useState(timeStore.initialState);
  useEffect(() => {
    const sub = timeStore.subscribe(setTimer);
  }, []);

  const INITIAL_VALUES = [timer.INITIAL_VALUES[0], timer.INITIAL_VALUES[1]];
  
  const singleFire = (function (func) {
    let executed = false;
    return function (func) {
      if (!executed) {
        func()
        executed = true;
      }
    };
  })();


  const reExecute = () => {
    setMinutes(10);
    setSeconds(0);
    timeStore.sendData({ isrunning: false, reset: false });
  }
  useEffect(() => {
    if (timer.reset) {
      singleFire(reExecute);
    }
  }, [timer.reset, singleFire, reExecute])
  const padTime = (time) => time.toString().padStart(2, "0");

  const {
    remainingTime: { seconds, minutes },
    setter: { setMinutes, setSeconds },
    stop,
    start,
    restart,

  } = useCountdown(INITIAL_VALUES);

  const handleStart = () => {
    start();
    timeStore.sendData({ isrunning: true });
  };

  const handleStop = () => {
    stop();
    timeStore.sendData({ isrunning: false });
  };

  const handleRestart = () => {
    restart();
    timeStore.sendData({ isrunning: false, reset: true });
  };
  const handleInputChange = (e, type) => {
    if (type === "minute") {
      setMinutes(!e.target.value ? "" : Number(e.target.value));
    }
    if (type === "second") {
      setSeconds(!e.target.value ? "" : Number(e.target.value));
    }
  };

  return (
    <div className="App">
      <Container>
        <Input
          disabled={timer.isrunning}
          value={padTime(minutes)}
          name="minute"
          onChange={handleInputChange}
        />

        <Input
          disabled={timer.isrunning}
          value={padTime(seconds)}
          name="second"
          onChange={handleInputChange}
        />
      </Container>

      <Container>
        <Typography>MINUTE</Typography>
        <Typography>SECOND</Typography>
      </Container>

      <Container>
        <Button disabled={!timer.isrunning} onClick={handleStop} name="stop">
          Stop
        </Button>
        <Button
          disabled={timer.isrunning || (!minutes && !seconds) || (!minutes && !seconds)}
          onClick={handleStart}
          name="start"
        >
          Start
        </Button>
        <Button onClick={handleRestart} name="Restart">
          Restart
        </Button>
      </Container>
      <Typography>
        {padTime(minutes)} : {padTime(seconds)}
      </Typography>
    </div>
  );
}
