import React, { useState, useEffect, useRef } from 'react';
import { useNebula } from '../context/NebulaContext';
import type { TimerMode } from '../types';

const FULL_DASH_ARRAY = 283;

const Timer: React.FC = () => {
    const { settings, incrementStats } = useNebula();
    const [mode, setMode] = useState<TimerMode>('focus');
    const [timeLeft, setTimeLeft] = useState(settings.timerDurations[mode]);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [sessionsSinceLongBreak, setSessionsSinceLongBreak] = useState(0);

    // Request notification permission on mount
    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const sendNotification = (title: string, body: string) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/vite.svg' });
        }
    };

    // Update time when mode or settings change, but only if not active
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(settings.timerDurations[mode]);
        }
    }, [mode, settings.timerDurations, isActive]);

    const playSound = () => {
        if (settings.soundEnabled && audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed', e));
        }
    };

    const handleTimerComplete = () => {
        setIsActive(false);
        playSound();

        if (mode === 'focus') {
            const newSessions = sessionsSinceLongBreak + 1;
            setSessionsSinceLongBreak(newSessions);
            incrementStats(settings.timerDurations.focus / 60);
            sendNotification('Focus Session Complete!', 'Time for a break.');

            // Auto-cycle logic
            if (newSessions >= 4) {
                switchMode('longBreak');
                setSessionsSinceLongBreak(0);
            } else {
                switchMode('shortBreak');
            }
        } else {
            sendNotification('Break Over!', 'Time to focus.');
            switchMode('focus');
        }

        if (settings.autoStart) {
            setIsActive(true);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const calculateTimeFraction = () => {
        const totalTime = settings.timerDurations[mode];
        const rawTimeFraction = timeLeft / totalTime;
        return rawTimeFraction - (1 / totalTime) * (1 - rawTimeFraction);
    };

    const setCircleDasharray = () => {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        return circleDasharray;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input
            if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
                return;
            }

            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    toggleTimer();
                    break;
                case 'KeyR':
                    resetTimer();
                    break;
                case 'KeyF':
                    switchMode('focus');
                    break;
                case 'KeyS':
                    switchMode('shortBreak');
                    break;
                case 'KeyL':
                    switchMode('longBreak');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, mode, settings.timerDurations]); // Dependencies for toggle/reset/switch logic

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimerComplete();
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, mode, settings.timerDurations, incrementStats, settings.autoStart]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(settings.timerDurations[mode]);
    };

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(settings.timerDurations[newMode]);
    };

    return (
        <div className="glass-panel flex-col flex-center" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
            <div className="mode-selector flex-center gap-4" style={{ marginBottom: '2rem' }}>
                {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
                    <button
                        key={m}
                        onClick={() => switchMode(m)}
                        style={{
                            background: mode === m ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            border: 'none',
                            color: mode === m ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {m === 'focus' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
                    </button>
                ))}
            </div>

            <div className="base-timer" style={{ position: 'relative', width: '300px', height: '300px' }}>
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3" fill="none" />
                        <path
                            id="base-timer-path-remaining"
                            strokeDasharray={setCircleDasharray()}
                            className={`base-timer__path-remaining ${timeLeft <= 60 ? 'red' : ''}`}
                            d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
                            stroke="var(--color-accent)"
                            strokeWidth="3"
                            fill="none"
                            style={{
                                transition: '1s linear all',
                                transform: 'rotate(90deg)',
                                transformOrigin: 'center',
                                strokeLinecap: 'round'
                            }}
                        ></path>
                    </g>
                </svg>
                <span id="base-timer-label" style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    top: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    color: 'var(--color-text-main)',
                    fontFamily: 'var(--font-family-main)',
                    fontWeight: 300
                }}>
                    {formatTime(timeLeft)}
                </span>
            </div>

            <div className="controls flex-center gap-4" style={{ marginTop: '2rem' }}>
                <button className="glass-button" onClick={toggleTimer} aria-label={isActive ? 'Pause timer' : 'Start timer'}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="glass-button" onClick={resetTimer} aria-label="Reset timer">
                    Reset
                </button>
            </div>

            <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />
        </div>
    );
};

export default Timer;
