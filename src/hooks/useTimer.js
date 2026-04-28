import { useRef, useState, useCallback } from "react";

const playEndBeep = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);
  } catch (e) {
    console.warn("Audio Context not supported");
  }
};

const triggerHaptic = (duration = 50) => {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(duration);
  }
};

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerActive(false);
  }, []);

  const startTimer = useCallback(
    (duration, onComplete) => {
      setTimeLeft(duration);
      setIsTimerActive(true);
      triggerHaptic(100);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopTimer();
            playEndBeep();
            triggerHaptic([100, 50, 100]);
            onComplete();
            return 0;
          }
          if (prev % 2 === 0) triggerHaptic(10);
          return prev - 1;
        });
      }, 1000);
    },
    [stopTimer],
  );

  return {
    timeLeft,
    isTimerActive,
    startTimer,
    stopTimer,
    setTimeLeft,
    triggerHaptic,
  };
};
