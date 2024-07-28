import React, { useState } from "react";
import MyCalendar from "../components/Calender/MyCalender";
import { Col, Row } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const events = [
  {
    id: 1,
    title: "Event 1",
    start: new Date(2023, 0, 1, 10, 0),
    end: new Date(2023, 0, 1, 12, 0),
  },
  // Add more events as needed
];

const CalendarPage = () => {
  const router = useRouter();
  const [updatedEvents, setUpdatedEvents] = useState(events);

  const handleEventDrop = (events) => {
    console.log("Updated events:", events);
    setUpdatedEvents(events);
  };

  return (
    <div className="calender-container">
      <div className="calender-header">
        <Row className="header-row">
          <Col span={12} className="left-col">
            <p>
              <LeftOutlined
                onClick={() => router.back()}
                className="cursor-pointer"
              />
              Calendar
            </p>
          </Col>
        </Row>
      </div>
      <Row justify={"center"} className="w-100 calender">
        <Col span={23}>
          <div>
            <MyCalendar events={updatedEvents} onEventDrop={handleEventDrop} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CalendarPage;
