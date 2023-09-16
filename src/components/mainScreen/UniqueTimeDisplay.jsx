import React, { useEffect, useState } from "react";

function SimpleClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[time.getDay()];
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Helper function to format time values with leading zeros
  const formatTimeValue = (value) => (value < 10 ? `0${value}` : value);

  // Define a CSS class for minute change effect
  const minuteChangeEffect =
    minutes % 2 === 0 ? "text-blue-500" : "text-red-500";

  return (
    <div className="text-center p-2 border border-blue-400 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
      <div className="text-2xl font-semibold mb-2 text-blue-600 border-b-2  border-blue-400 pb-2">
        {dayOfWeek}
      </div>

      <div className="flex justify-center items-center">
        <div className={`text-4xl font-semibold ${minuteChangeEffect}`}>
          {formatTimeValue(hours)}
        </div>
        <div className={`text-4xl font-semibold ${minuteChangeEffect}`}>:</div>
        <div
          className={`text-4xl font-semibold transition-all duration-300 ${minuteChangeEffect}`}
        >
          {formatTimeValue(minutes)}
        </div>
        <div className={`text-4xl font-semibold ${minuteChangeEffect}`}>:</div>
        <div className={`text-4xl font-semibold ${minuteChangeEffect}`}>
          {formatTimeValue(seconds)}
        </div>
      </div>
    </div>
  );
}

export default SimpleClock;
