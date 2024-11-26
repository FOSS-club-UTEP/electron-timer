import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import alarmSoundResource from './assets/audio/alarm.wav'

const App = () => {
    const [inputTime, setInputTime] = useState('');
    
    // none means timer hasn't started
    // 0 means timer is done and waiting to be dismissed
    // > 0 means timer is running
    const [timeLeft, setTimeLeft] = useState(null);
    
    const alarmSound = new Audio(alarmSoundResource)
    const alarmStopFunc = () => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        setTimeLeft(null);
    };

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);

            alarmSound.play()
            alarmSound.addEventListener('ended', () => {
                alarmSound.currentTime = 0;
                alarmSound.play();
            });

            const alarmNotif = new window.Notification("Timer done!", {body: 'Click to stop alarm.'})
            alarmNotif.onclick = alarmStopFunc;
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
            {timeLeft !== null && timeLeft === 0 && (
                <button onClick={alarmStopFunc}>Stop alarm sound.</button>
            )}
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App />);
