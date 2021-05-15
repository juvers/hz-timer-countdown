import { useState, useEffect, useRef } from "react";
import timeStore from '../store/TimeStore';

export const useCountdown = (time, callback) => {
    const [minutes, setMinutes] = useState(time[0]);
    const [seconds, setSeconds] = useState(time[1]);

    const intervalRef = useRef();
    const [timer, setTimer] = useState(timeStore.initialState);
    useEffect(() => {
        const sub = timeStore.subscribe(setTimer);
    }, []);

    const isOver = (function () {
        let executed = false;
        return function () {
            if (!executed) {
                // global execution of isover
                console.log("Its over")
                timeStore.sendData({ isrunning: false });
                executed = true;
            }
        };
    })();


    useEffect(() => {
        if (timer.isrunning) {
            intervalRef.current = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(intervalRef);
                    timeStore.sendData({ isrunning: false });
                    isOver();
                } else {
                    if (seconds === 0) {
                        setMinutes((prevState) => prevState - 1);
                    }
                    setSeconds((prevState) => {
                        if (prevState === 0) {
                            return 59;
                        } else {
                            return prevState - 1;
                        }
                    });
                }
            }, 1000);
            return () => {
                clearInterval(intervalRef.current);
            };
        }

    }, [callback, minutes, seconds, timer.isrunning]);

    const stop = () => {
        timeStore.sendData({ isrunning: false });
        clearInterval(intervalRef.current);
    };

    const start = () => {
        timeStore.sendData({ isrunning: true });

    };

    const restart = () => {
        clearInterval(intervalRef.current);
        setMinutes(10);
        setSeconds(0);
        timeStore.sendData({ isrunning: false, reset: true });
    }
    return {
        remainingTime: { minutes, seconds },
        setter: { setMinutes, setSeconds },
        stop,
        start,
        restart,
    };
};