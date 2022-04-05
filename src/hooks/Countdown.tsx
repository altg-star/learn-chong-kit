import React, { useState, useEffect, useRef, useCallback } from "react";

const useCountdown = (time: number): [number, React.Dispatch<React.SetStateAction<number>>, (value: boolean) => void, boolean] => {
    const [seconds, setSeconds] = useState<number>(time * 60);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
    const start = useRef<boolean>(false);
    useEffect(() => () => {
        if(intervalId) {
            return clearInterval(intervalId)
        }
    }, [intervalId]);

    const enable = useCallback((value: boolean): void => {
        if(value) {
            setIntervalId(setInterval(() => {
                setSeconds(second => second - 1);
            }, 1000));
            start.current = true;
        } else {
            if(intervalId) {
                return clearInterval(intervalId);
            }
            setIntervalId(null);
            start.current = false;
        }
    }, [intervalId]);
    
    return [seconds, setSeconds, enable, start.current];
}

export default useCountdown;