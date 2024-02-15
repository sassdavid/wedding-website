import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ toDateWithHour }) => {
  const [state, setState] = useState({
    timeLeft: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    eventPassed: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now: Date = new Date();
      const eventDate: Date = new Date(toDateWithHour);
      const difference: number = eventDate.getTime() - now.getTime();

      if ( difference > 0 ) {
        const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours: number = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes: number = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds: number = Math.floor((difference % (1000 * 60)) / 1000);

        setState({ timeLeft: { days, hours, minutes, seconds }, eventPassed: false });
      } else {
        setState({ timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }, eventPassed: true });
      }
    };

    calculateCountdown();
    const intervalId: number = setInterval(calculateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [toDateWithHour]);

  const { timeLeft, eventPassed } = state;

  const timerClass: string = eventPassed ? 'countdown-timer-event-passed' : 'countdown-timer';

  return (
    <span className={timerClass}>
      {eventPassed
        ? 'Az esemény már lezajlott, kérjük töltsd fel az általad készített képeket, videókat.'
        : `${timeLeft.days} nap, ${timeLeft.hours} óra, ${timeLeft.minutes} perc, ${timeLeft.seconds} másodperc`}
    </span>
  );
};

export default CountdownTimer;
