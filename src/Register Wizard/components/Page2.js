import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./page2.css";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Page2() {
  const [errorCity, setErrorCity] = useState("");
  const [errorStreet, setErrorStreet] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [rhigt, setRhigt] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("phase2")) {
      const states = JSON.parse(localStorage.getItem("phase2"));
      setCity(states.city);
      setStreet(states.street);
      setNumber(states.number);
      setRhigt(states.rhigt);
    }
  }, []);

  function validtion({ name, value }) {
    switch (name) {
      case "city":
        if (value === "") {
          setErrorCity("City required");
        } else {
          setErrorCity("");
        }
        break;

      case "street":
        if (value === "") {
          setErrorStreet("Street required");
        } else {
          setErrorStreet("");
        }
        break;

      default:
        break;
    }

    let booleanRhigt = city && street ? true : false;
    setRhigt(booleanRhigt);
    const phase2 = {};

    phase2["city"] = city;
    phase2["street"] = street;
    phase2["number"] = number;
    phase2["rhigt"] = booleanRhigt;

    localStorage.setItem("phase2", JSON.stringify(phase2));
  }

  return (
    <>
      <Container className="form">
        <Row className="phase-top">
          <Col>1</Col>
          <Col className="active">2</Col>
          <Col>3</Col>
        </Row>

        <h1>Address</h1>
        <Form>
          <Row>
            <Col xs={7}>
              <Form.Label htmlFor="city">City</Form.Label>
              <Form.Control
                id="city"
                placeholder="City"
                value={city}
                name="city"
                onBlur={(e) => validtion(e.target)}
                onChange={(e) => setCity(e.target.value)}
              />
              <span>{errorCity}</span>
            </Col>
            <Col>
              <Form.Label htmlFor="street">Street</Form.Label>
              <Form.Control
                id="street"
                placeholder="Street"
                value={street}
                name="street"
                onBlur={(e) => validtion(e.target)}
                onChange={(e) => setStreet(e.target.value)}
              />
              <span>{errorStreet}</span>
            </Col>
            <Col>
              <Form.Label htmlFor="number">Number</Form.Label>
              <Form.Control
                id="number"
                type="number"
                min="1"
                value={number}
                placeholder="Number"
                name="number"
                onBlur={(e) => validtion(e.target)}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
        <Container className="d-flex justify-content-center">
          <Row>
            <Link to="/phase_1">
              <FontAwesomeIcon className="arrow" icon={faArrowCircleLeft} />
            </Link>
            {rhigt && (
              <Link to="/phase_3">
                <FontAwesomeIcon className="arrow" icon={faArrowCircleRight} />
              </Link>
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Page2;
