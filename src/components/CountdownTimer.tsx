import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ toDateWithHour }) => {
  const [countdown, setCountdown] = useState('');

  const calculateCountdown = (): void => {
    const now: Date = new Date();
    const eventDate: Date = new Date(toDateWithHour);
    const timeLeft: number = eventDate.getTime() - now.getTime();

    if ( timeLeft > 0 ) {
      const days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes: number = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds: number = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(`${days} nap, ${hours} óra, ${minutes} perc, ${seconds} másodperc`);
    } else {
      setCountdown('Az esemény már lezajlott');
    }
  };

  useEffect(() => {
    const timerID: number = setInterval(calculateCountdown, 1000);

    calculateCountdown();

    return () => clearInterval(timerID);
  }, [toDateWithHour]);

  return <>{countdown}</>;
};

export default CountdownTimer;
