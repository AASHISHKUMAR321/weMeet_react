import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [gradientColor, setGradientColor] = useState("");
  useEffect(() => {
    const timeId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timeId);
  }, []);

  useEffect(() => {
    // Calculate the gradient color based on the current time
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // Calculate color values based on time
    const red =
      Math.sin(((hour * 60 + minute) / 1440) * Math.PI * 2) * 127 + 128;
    const green =
      Math.sin(((minute * 60 + second) / 3600) * Math.PI * 2) * 127 + 128;
    const blue = Math.sin((second / 60) * Math.PI * 2) * 127 + 128;

    // Set the gradient color as CSS
    setGradientColor(
      `linear-gradient(45deg, rgb(${red}, ${green}, ${blue}), rgb(${
        255 - red
      }, ${255 - green}, ${255 - blue}))`
    );
  }, []);

  const formatedTime = currentDateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[currentDateTime.getDay()];
  // console.log(currentDateTime);
  return (
    <div
      className="dynamic-text text-3xl mt-5 flex justify-evenly p-4 text-white"
      style={{ background: gradientColor }}
    >
      <div className="">{dayOfWeek}</div>
      <div className="">{formatedTime}</div>
    </div>
  );
};
