import React, { useEffect, useState } from 'react';
import styles from '../styles/components/message-display.module.css';

const MessageDisplay = ({ messages }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(Math.floor(Math.random() * messages.length));

    useEffect(() => {    
        const timer = setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            console.log('randomIndex', randomIndex);
            if(randomIndex === currentMessageIndex) {
                setCurrentMessageIndex((randomIndex + 1) % messages.length);
                return;
            };

            setCurrentMessageIndex(randomIndex);
        }, 1500); 

        return () => clearTimeout(timer);
    }, [currentMessageIndex]);

    return (
        <div className={styles.messageContainer}>
            <p>{messages[currentMessageIndex]}</p>
        </div>
    );
};

export default MessageDisplay;