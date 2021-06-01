import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./page3.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faImage,
  faDrum,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Page3() {
  const [btnDisabled, setbtnDisabled] = useState(true);

  const [inputsValidtion, setInputsValidtion] = useState({
    img: {
      value: "",
      errors: [],
      validtion: {
        isInVaild: false,
        required: true,
        regex: /^(https:\/\/)[a-zA-Z0-9/.-]+\.(png|jpeg|jpg)/,
        costumeError: "invalid image url",
      },
    },
    hobbis: {
      value: "",
      errors: [],
      validtion: {
        isInVaild: false,
        required: false,
      },
    },
  });

  useEffect(() => {
    if (localStorage.getItem("phase3Inputs")) {
      const inputsPhase3Local = JSON.parse(
        localStorage.getItem("phase3Inputs")
      );
      for (const key in inputsPhase3Local) {
        if (key in inputsValidtion) {
          inputsValidtion[key].value = inputsPhase3Local[key];
        }
        if (inputsPhase3Local[key].value) {
          validtion({ name: key, value: inputsPhase3Local[key].value });
        }
      }
      setbtnDisabled(inputsPhase3Local.submitDisabled);
      setInputsValidtion({
        ...inputsValidtion,
      });
    }
  }, []);

  function validtion({ value, name }) {
    const errors = [];

    let isInVaild = false;
    if (!value && inputsValidtion[name].validtion.required) {
      errors.push(`${name} field is required`);
    }

    if (
      inputsValidtion[name].validtion.regex &&
      !inputsValidtion[name].validtion.regex.test(value)
    ) {
      errors.push(inputsValidtion[name].validtion.costumeError);
    }
    if (errors.length > 0) {
      isInVaild = true;
    }

    inputsValidtion[name].validtion.isInVaild = isInVaild;
    setInputsValidtion({
      ...inputsValidtion,
      [name]: {
        ...inputsValidtion[name],
        errors,
      },
    });
    let submitDisabled = true;
    if (inputsValidtion.img.validtion.regex.test(inputsValidtion.img.value)) {
      submitDisabled = false;
    }
    const phase3Inputs = {};
    phase3Inputs["submitDisabled"] = submitDisabled;
    for (const key in inputsValidtion) {
      if (inputsValidtion[key].value) {
        phase3Inputs[key] = inputsValidtion[key].value;
      }
    }
    setbtnDisabled(submitDisabled);

    localStorage.setItem("phase3Inputs", JSON.stringify(phase3Inputs));
  }

  function inputsOnChange({ value, name }) {
    setInputsValidtion({
      ...inputsValidtion,
      [name]: {
        ...inputsValidtion[name],
        value,
      },
    });
  }

  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <Form
      className="form"
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <Row className="phase-top">
        <Col>1</Col>
        <Col>2</Col>
        <Col className="active">3</Col>
      </Row>
      <Form.Group controlId="image">
        <Form.Label>Image Url</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faImage} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            name="img"
            value={inputsValidtion.img.value}
            isInvalid={inputsValidtion.img.validtion.isInVaild}
            placeholder="Enter image url"
            onBlur={(e) => {
              validtion(e.target);
            }}
            onChange={(e) => {
              inputsOnChange(e.target);
            }}
          />
          {inputsValidtion.img.errors.map((error, index) => {
            return (
              <Form.Control.Feedback key={index} type="invalid">
                {error}
              </Form.Control.Feedback>
            );
          })}
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="hobbis">
        <Form.Label>Your Hobbis</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Prepend>
            <InputGroup.Text>
              {" "}
              <FontAwesomeIcon icon={faDrum} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="hobbis"
            as="textarea"
            value={inputsValidtion.hobbis.value}
            isInvalid={inputsValidtion.hobbis.validtion.isInVaild}
            placeholder="Chess, Movies, Sport, Cars, Dolls"
            onBlur={(e) => {
              validtion(e.target);
            }}
            onChange={(e) => {
              inputsOnChange(e.target);
            }}
          />

          {inputsValidtion.hobbis.errors.map((error, index) => {
            return (
              <Form.Control.Feedback key={index} type="invalid">
                {error}
              </Form.Control.Feedback>
            );
          })}
        </InputGroup>
      </Form.Group>
      <Row className="btn-container">
        <Link to="/phase_2">
          <FontAwesomeIcon className="arrow" icon={faArrowCircleLeft} />
        </Link>

        <Button variant="primary" type="submit" disabled={btnDisabled}>
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export default Page3;
