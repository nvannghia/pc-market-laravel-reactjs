import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import apiRouteConfig from "../../apiRouteConfig";
import numeral from "numeral";

const Statistical = () => {
  const [day, setDay] = useState(31);
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(20);
  const [revenue, setRevenue] = useState("");
  const [statiscBy, setStatiscBy] = useState("byDay");

  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  // tính năm nhuận để biết tháng 2 có 28 hay 29 ngày
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const hanleChangeMonth = (evt) => {
    const month = evt.target.value;
    switch (month) {
      case "1":
      case "3":
      case "5":
      case "7":
      case "8":
      case "10":
      case "12":
        setDay(31);
        break;
      case "4":
      case "6":
      case "9":
      case "11":
        setDay(30);
        break;
      case "2":
        const year = yearRef.current.value;
        if (isLeapYear(year)) {
          setDay(29);
          break;
        }
        setDay(28);
        break;
      default:
        setDay(31);
        break;
    }
  };

  const handleStatiscBy = (evt) => {
    const statiscBy = evt.target.value;
    const dayElement = document.getElementById("day");
    const monthElement = document.getElementById("month");
    switch (statiscBy) {
      case "byDay":
        if (dayElement.getAttribute("disabled") === "true")
          dayElement.removeAttribute("disabled");
        if (monthElement.getAttribute("disabled") === "true")
          monthElement.removeAttribute("disabled");

        setStatiscBy("byDay");
        break;
      case "byMonth":
        dayElement.setAttribute("disabled", true);
        dayElement.value = 1;
        if (monthElement.getAttribute("disabled") === "true")
          monthElement.removeAttribute("disabled");

        setStatiscBy("byMonth");
        break;
      case "byYear":
        monthElement.value = 1;
        dayElement.value = 1;
        dayElement.setAttribute("disabled", true);
        monthElement.setAttribute("disabled", true);

        setStatiscBy("byYear");
        break;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const day = dayRef.current.value;
    const month = monthRef.current.value;
    const year = yearRef.current.value;

    const token = localStorage.getItem("token") || null;
    const infoToSend = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    switch (statiscBy) {
      case "byDay":
        fetch(`${apiRouteConfig.domain}/statistical`, {
          ...infoToSend,
          body: JSON.stringify({
            statisticsBy: statiscBy,
            date: `${day}/${month}/${year}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setRevenue(data.info[0]?.revenue);
          });
        break;
      case "byMonth":
        fetch(`${apiRouteConfig.domain}/statistical`, {
          ...infoToSend,
          body: JSON.stringify({
            statisticsBy: statiscBy,
            date: `${month}/${year}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setRevenue(data.info[0]?.revenue);
          });
        break;
      case "byYear":
        fetch(`${apiRouteConfig.domain}/statistical`, {
          ...infoToSend,
          body: JSON.stringify({
            statisticsBy: statiscBy,
            date: `${year}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setRevenue(data.info[0]?.revenue);
          });
        break;
      default:
        alert("No vailid filter!");
        break;
    }
    // display element show revenue
    document.getElementById("displayRevenue").style.display = "block";
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "50%" }}
        >
          <Form.Label className="mt-3 mb-3 h3">
            Thống kê doanh thu theo:
          </Form.Label>
          <Form.Select
            onChange={handleStatiscBy}
            style={{ width: "20%", marginLeft: "2%" }}
          >
            <option value="byDay">Ngày</option>
            <option value="byMonth">Tháng</option>
            <option value="byYear">Năm</option>
          </Form.Select>
        </div>

        <Form.Label className="mt-3">Ngày</Form.Label>
        <Form.Select ref={dayRef} id="day" name="day" style={{ width: "15%" }}>
          {Array.from({ length: day }, (_, index) => index + 1).map(
            (number) => (
              <option key={number}>{number}</option>
            )
          )}
        </Form.Select>

        <Form.Label className="mt-3">Tháng</Form.Label>
        <Form.Select
          ref={monthRef}
          onChange={hanleChangeMonth}
          id="month"
          name="month"
          style={{ width: "15%" }}
        >
          {Array.from({ length: month }, (_, index) => index + 1).map(
            (number) => (
              <option key={number}>{number}</option>
            )
          )}
        </Form.Select>

        <Form.Label className="mt-3">Năm</Form.Label>
        <Form.Select
          ref={yearRef}
          id="year"
          name="year"
          style={{ width: "15%" }}
        >
          {Array.from({ length: year }, (_, index) => index + 2015).map(
            (number) => (
              <option key={number}>{number}</option>
            )
          )}
        </Form.Select>

        <Button className="mt-3 mb-3" type="submit">
          Xem doanh thu
        </Button>
      </Form>
      <h4 id="displayRevenue" style={{ textAlign: "center", display: "none" }}>
        Doanh thu:{" "}
        <i style={{ color: "coral" }}>{numeral(revenue).format("0,0")}₫</i>
      </h4>
    </Container>
  );
};

export default Statistical;
