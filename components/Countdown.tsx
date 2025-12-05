import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-8 py-6 border-t border-b border-paper-border mt-6">
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-headline font-bold text-ink">{timeLeft.days}</div>
        <div className="text-xs uppercase tracking-widest font-body text-gray-500">Days</div>
      </div>
      <div className="text-2xl font-light text-gray-400">|</div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-headline font-bold text-ink">{timeLeft.hours}</div>
        <div className="text-xs uppercase tracking-widest font-body text-gray-500">Hours</div>
      </div>
      <div className="text-2xl font-light text-gray-400">|</div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-headline font-bold text-ink">{timeLeft.minutes}</div>
        <div className="text-xs uppercase tracking-widest font-body text-gray-500">Mins</div>
      </div>
      <div className="text-2xl font-light text-gray-400">|</div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-headline font-bold text-ink">{timeLeft.seconds}</div>
        <div className="text-xs uppercase tracking-widest font-body text-gray-500">Secs</div>
      </div>
    </div>
  );
};