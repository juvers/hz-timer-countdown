import { useState, useEffect } from 'react';
import timeStore from '../store/TimeStore';
import { useCountdown } from "../hooks/useCountdown";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Typography from "../components/Typography/Typography";

const padTime = (time) => time.toString().padStart(2, "0");
export default function Bucket() {

    const [timer, setTimer] = useState(timeStore.initialState);
    useEffect(() => {
        const sub = timeStore.subscribe(setTimer);
    }, []);

    const INITIAL_VALUES = [timer.INITIAL_VALUES[0], timer.INITIAL_VALUES[1]];

    const singleFire = (function () {
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
        };
    }, [timer.reset, singleFire])
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
        timeStore.sendData({ isrunning: false });
    };
    return (
        <>
            <Container>
                <Typography>Inside Bucket Component</Typography>
            </Container>
            <Container>
                <Typography>{padTime(minutes)}</Typography>
                <Typography>{padTime(seconds)}</Typography>
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

        </>
    )
}