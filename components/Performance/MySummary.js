import { Button, Col, Row, Collapse, Image, Checkbox } from "antd";
import React, { useEffect } from "react";
import {
  ScheduleFilled,
  DownOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
// import BlueBackground from "../../public/Assests/Overview/blue-background-image.png";
// import WhiteBackground from "../../public/Assests/Overview/WhiteBackground.jpg";

const MySummary = ({ currentUser }) => {
  const [reviews, setReviews] = React.useState([]);
  const options = [
    {
      label: "Question 1",
      value: "Question_1",
    },
    {
      label: "Question 2",
      value: "Question_2",
    },
    {
      label: "Question 3",
      value: "Question_3",
    },
  ];
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  // const CheckboxGroup = (year) => {
  //   let currentDate = new Date();
  //   let currentYear = currentDate.getFullYear();
  //   return (
  //     <div>
  //       <Checkbox.Group
  //         options={options}
  //         defaultValue={["Pear"]}
  //         onChange={onChange}
  //         className="feedback-dropdown"
  //         disabled={currentYear == year ? false : true}
  //       />

  //       <Row justify={"end"}>
  //         <Button type="primary" disabled={currentYear == year ? false : true}>
  //           Submit
  //         </Button>
  //       </Row>
  //     </div>
  //   );
  // };
  const getItems = [
    {
      key: "5",
      label: (
        <div>
          <h3>Mohit's (2024) feedback is pending for completion</h3>
          <p>a day ago | Additional Feedback</p>
        </div>
      ),
      // children: <div>{CheckboxGroup(2024)}</div>,
    }
  ];

  useEffect(() => {
    const getReviews = async () => {
      const response = await fetch(`http://localhost:3000/api/performance?id=${currentUser?.employee_id}&status=inactive`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setReviews(json);
    };
    getReviews();
  }, []);
  return (
    <div>
      <Row justify={"center"}>
        <Col span={23}>
          <div className="my-summary-body">
            <Row justify={"space-between"}>
              <Col span={24} className="left-card">
                <Row justify={"space-between"} align={"middle"}>
                  <Col span={5} className="open-tasks">
                    <ScheduleFilled className="tick-icon" />
                    <h2> {reviews?.length ===0 ? "No Apraisals found" : "All Apraisals"}</h2>
                  </Col>
                </Row>

                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={
                    reviews?.map(review => {
                      return {
                        key: review?._id,
                        label: (
                          <div className="reiew_label_wrapper">
                            <h3>{review?.employee_name} ({review?.review_year}) feedback</h3>
                            <div>{review?.isActive ? "PENDING" : "COMPLETED"}</div>
                          </div>
                        ),
                        children: <>
                          <h1 className='review-heading'>Self Review</h1>
                          <hr />
                          <h3>What did you do well</h3>
                          <p>{review?.employeeReview?.what_did_you_do_well}</p>
                          <h3>What could you have done better</h3>
                          <p>{review?.employeeReview?.what_colud_have_done_better}</p>
                          <h3>How your leads/company could have helped you better</h3>
                          <p>{review?.employeeReview?.how_they_helped_you}</p>
                          <h3>Anything specific you'd like to do over the next year</h3>
                          <p>{review?.employeeReview?.anything_specific_for_next_year}</p>

                          <hr />
                          <h1 className='review-heading'>Manager Review</h1>
                          <hr />
                          <>
                            <h3>What he did well</h3>
                            <p>{review?.managerReview?.what_hen_did_well}</p>
                            <h3>What he needs to improve</h3>
                            <p>{review?.managerReview?.what_need_to_improve}</p>
                            <h3>Rating of the employee</h3>
                            <p>{review?.rating}</p>
                          </>
                        </>,
                      }

                    })
                  }
                />
              </Col>
              {/* <Col span={8} align={"end"}>
                <Image
                  src={BlueBackground.src}
                  preview={false}
                  width={600}
                  height={600}
                />
                <br />
                <br />

                <Image
                  src={WhiteBackground.src}
                  preview={false}
                  width={600}
                  height={600}
                />
              </Col> */}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MySummary;
