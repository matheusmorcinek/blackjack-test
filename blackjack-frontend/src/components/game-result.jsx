import React from "react";
import { useEffect, useState } from "react";
import CountdownBar from "./countdown-bar";

const GameResult = ({ result, onCompleteCountdown, secondsToCountdown = 5 }) => {

    const [timeLeft, setTimeLeft] = useState(secondsToCountdown);

    useEffect(() => {

        // result = 'dealer' or 'player' or 'tie'

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
        <div data-testid={`${result}-game-result`}>
            <CountdownBar width={width} />
            <h2>{result === 'dealer' ? 'Dealer won...' : result === 'player' ? 'Player won!!!' : 'Tie'}</h2>
        </div>
    );
};

export default GameResult;