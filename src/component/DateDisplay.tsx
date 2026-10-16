"use client";

const DateDisplay = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return <p className="text-xs text-gray-500">{date}</p>;
};

export default DateDisplay;