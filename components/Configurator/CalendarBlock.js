import DateAndTimePicker from "@components/DateTime/DateAndTimePicker";
import React from "react";

export default function CalendarBlock({ data }) {
  return (
    <div className="">
      <DateAndTimePicker dateId={data.dateOneId} data={data} />
    </div>
  );
}
