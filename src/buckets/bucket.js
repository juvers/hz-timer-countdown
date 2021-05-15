import { useState, useEffect } from 'react';
import timeStore from '../store/TimeStore';
import { useCountdown } from "../hooks/useCountdown";

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

    // should you prefer to execute certain in the component when time is expired fire the 'isOver' as a callback
    // const {
    //     remainingTime: { seconds, minutes },
    //     setter: { setMinutes, setSeconds },
    //     stop,
    //     start,
    //     restart,
    // } = useCountdown(INITIAL_VALUES, () => isOver());

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
            <h1>Inside Comp1</h1>
            <h1 style={{ color: "#fff" }}>
                {padTime(minutes)} : {padTime(seconds)}
            </h1>

            <button disabled={!timer.isrunning} onClick={handleStop} name="stop">
                Stop
        </button>
            <button
                disabled={timer.isrunning || (!minutes && !seconds) || (!minutes && !seconds)}
                onClick={handleStart}
                name="start"
            >
                Start
        </button>
            <button onClick={handleRestart} name="Restart">
                Restart
        </button>
        </>
    )
}