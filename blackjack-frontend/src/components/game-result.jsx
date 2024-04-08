import { useEffect, useState } from "react";
import CountdownBar from "./countdown-bar";

const GameResult = ({ role, onCompleteCountdown, secondsToCountdown = 5 }) => {

    const [timeLeft, setTimeLeft] = useState(secondsToCountdown);

    useEffect(() => {

        if (timeLeft === 0) {
            onCompleteCountdown();
            return;
        };

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const width = (timeLeft / secondsToCountdown) * 100;

    return (
        <div>
            <CountdownBar width={width} />
            <h2>{role === 'dealer' ? 'Dealer won...' : 'Player won!!!'}</h2>
        </div>
    );
};

export default GameResult;