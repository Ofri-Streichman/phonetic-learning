import React, { useState, useEffect } from "react";
const Timer = ({ seconds, timeOutHandler }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
        if (timeLeft==0){
            timeOutHandler()
            return;
        };
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <>{timeLeft}</>
    );
};

export default Timer;