import React, { useState, useEffect } from "react";
import { now } from "@internationalized/date";
import {
  calculateBookingCost,
  dayNames,
  formatTime,
  formatTimeToDay,
  getCurrentDateTime,
  getDayOfWeekFromDate,
} from "./TimePickerHelpers";

const TimePicker = ({ date, schedule, handleTimeChange, time, data }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [endTimeOptions, setEndTimeOptions] = useState([]);
  const minTime = Math.max(schedule.minTime, schedule.interval);

  function calcMinStartTime() {
    let start = startTime.split(":");

    return parseFloat(`${start[0]}.${parseInt(start[1]) / 6}`) + minTime / 60;
  }
  useEffect(() => {
    const timeRange = [startTime, endTime].map((item) =>
      parseFloat(`${item.split(":")[0]}.${parseInt(item.split(":")[1]) / 6}`)
    );

    if (!isNaN(timeRange[0]) && !isNaN(timeRange[1])) {
      handleTimeChange(
        timeRange,
        calculateBookingCost(
          schedule[dayNames[getDayOfWeekFromDate(date)]],
          timeRange,
          minTime
        )
      );
    } else {
      handleTimeChange(
        time,
        calculateBookingCost(
          schedule[dayNames[getDayOfWeekFromDate(date)]],
          time,
          minTime
        )
      );
    }
  }, [startTime, endTime, date.day, date.month, date.year]);

  useEffect(() => {
    // Parse the schedule based on the provided date
    // Generate available time slots
    const slots = generateTimeSlots(date);
    setAvailableSlots(slots);
  }, [date]);

  useEffect(() => {
    const selectedStart = availableSlots.find(
      (slot) => slot.start === startTime
    );
    if (
      availableSlots[0] &&
      !availableSlots.map((item) => item.start).includes(startTime)
    ) {
      setStartTime(availableSlots[0].start);
      setEndTime("--:--");
    }
    if (selectedStart) {
      const startIndex = availableSlots.indexOf(selectedStart);
      setEndTimeOptions(availableSlots.slice(startIndex + 1)); // +1 to exclude the selected start time itself
      if (startTime >= endTime) {
        setEndTime("--:--");
      }
    }
  }, [startTime, availableSlots]);

  const generateTimeSlots = (date) => {
    const dayOfWeek = dayNames[getDayOfWeekFromDate(date)];
    const slots = schedule[dayOfWeek];
    const interval = schedule.interval;

    let timeSlots = [];

    slots.forEach((slot) => {
      const start = slot.item.start.split(":");
      const end = slot.item.end.split(":");
      let currentTime = new Date(getCurrentDateTime(date));
      currentTime.setHours(parseInt(start[0]), parseInt(start[1]), 0, 0);

      const endTime = new Date(getCurrentDateTime(date));
      endTime.setHours(parseInt(end[0]), parseInt(end[1]), 0, 0);
      const timeInHomeTimezone = now("Europe/Moscow");

      const isToday =
        formatTimeToDay(new Date(getCurrentDateTime(date))) ===
        formatTimeToDay(new Date(getCurrentDateTime(timeInHomeTimezone)));

      while (currentTime <= endTime) {
        const nextTime = new Date(currentTime.getTime() + interval * 60 * 1000);

        const endOfSession =
          currentTime.getHours() + currentTime.getMinutes() / 60;

        const formattedTimeInHomeTimezone =
          timeInHomeTimezone.hour + timeInHomeTimezone.minute / 60;

        // Ensure that the time slot is not less than the minimum time
        if (nextTime.getTime() - currentTime.getTime() >= 0) {
          if (
            !isToday ||
            (isToday && formattedTimeInHomeTimezone < endOfSession)
          ) {
            timeSlots.push({
              start: formatTime(currentTime),
              end: formatTime(nextTime),
              value: currentTime.getHours() + currentTime.getMinutes() / 60,
            });
          }
        }
        currentTime = nextTime;
      }
    });

    return timeSlots;
  };

  const handleStartTimeChange = (event) => {
    // Handle start time selection
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    // Handle end time selection
    setEndTime(event.target.value);
  };

  function timeToString(time) {
    const start = Math.floor(time);
    const end = (time % 1) * 60;
    return `${start}:${end || "00"}`;
  }
  return (
    <div className="flex items-center justify-between md:justify-start md:max-w-[18.5rem] pt-5 lg:py-0">
      <p className="text-sm font-medium md:pr-3">{data.calendar.timeFrom}</p>
      <select
        className="pl-[0.625rem]  tabular-nums w-24 lg:w-[4.5rem] md:text-sm lg:pl-1.5 h-8"
        value={timeToString(time[0])}
        onChange={handleStartTimeChange}
      >
        {availableSlots
          .slice(0, (minTime / schedule.interval) * -1)
          .map((slot, index) => (
            <option key={index} value={slot.start}>
              {slot.start}
            </option>
          ))}
      </select>
      <p className="text-sm font-medium md:px-3">{data.calendar.timeUntil}</p>
      <select
        className="pl-[0.625rem] tabular-nums w-24 lg:w-[4.5rem] md:text-sm lg:pl-1.5 h-8"
        value={timeToString(time[1])}
        onChange={handleEndTimeChange}
      >
        <option key={"--:--"} value={null}>
          {"--:--"}
        </option>

        {endTimeOptions
          .filter((item) => item.value >= calcMinStartTime())
          .map((slot, index) => (
            <option key={index} value={slot.start}>
              {slot.start}
            </option>
          ))}
      </select>
    </div>
  );
};

export default TimePicker;
