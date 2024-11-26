import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    const [inputTime, setInputTime] = useState('');
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);

            new window.Notification("Timer done!");
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    const startTimer = () => {
        if (!isNaN(inputTime) && inputTime > 0) {
            setTimeLeft(Number(inputTime));
            setInputTime('');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Timer App</h1>
            <input
                type="number"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                placeholder="Enter seconds"
            />
            <button onClick={startTimer}>Start</button>
            {timeLeft !== null && (
                <h2 style={{ marginTop: '20px' }}>{timeLeft} seconds left</h2>
            )}
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App />);
