import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './page1.css'


function Page1() {

    const btn = useRef(null)
    const [data, setData] = useState({
        lastName: { myvalue: "", pattern: /^\w{2,}$/, required: true, valid: false, error: [] },
        firstName: { myvalue: "", pattern: /^\w{2,}$/, required: true, valid: false, error: [] },
        email: { myvalue: "", required: true, valid: false, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, error: [] },
        birthday: { valid: true, error: [] }
        // birthday: { valid: false, error: [], pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/ }
    })
    const [btnDisable, setBtnDisable] = useState(true)
    const [phase1, setPhase1] = useState({})

    useEffect(() => {
        if (localStorage.getItem("phase1")) {
            const temp = JSON.parse(localStorage.getItem("phase1"));
            setPhase1(temp)
            const newValues = {
                ...data,
                ["firstName"]: { ...data["firstName"], myvalue: temp.firstName, valid: true },
                ["lastName"]: { ...data["lastName"], myvalue: temp.lastName, valid: true },
                ["email"]: { ...data["email"], myvalue: temp.email, valid: true }
            }
            setData(newValues)

        } else {
            localStorage.setItem("phase1", JSON.stringify(phase1));
        }
    }, [])

    const updatePhase1 = () => {
        let newObj = JSON.parse(localStorage.getItem("phase1"));
        newObj = {
            lastName: data.lastName.myvalue,
            firstName: data.firstName.myvalue,
            email: data.email.myvalue,
            birthday: data.birthday.myvalue
        }
        localStorage.setItem("phase1", JSON.stringify(newObj));

    }



    function isValid(e) {
        e.preventDefault();
        updatePhase1();
    }

    function updateValue({ name, value }) {
        let newValid = false;
        let errorLst = [];
        // if (value === "") {
        //     errorLst.push(`please enter ${name}`)
        // } else if ((data[name].pattern).test(value)) {
        //     newValid = true;
        //     console.log(value);
        // }
        // else {
        //     errorLst.push(`${name} not valid`)
        // }

        if (value === "") {
            errorLst.push(`please enter ${name}`)
        } else if (name === "birthday") {
            newValid = true;
        } else if ((data[name].pattern).test(value)) {
            newValid = true;
            console.log(value);
        }
        else {
            errorLst.push(`${name} not valid`)
        }


        // if (value === "") {
        //     errorLst.push(`please enter ${name}`)
        // } else if (name === "birthday") {
        //     newValid = true;
        // } else if ((data[name].pattern).test(value)) {
        //     newValid = true;
        //     console.log(newValid);
        // }
        // else {
        //     errorLst.push(`${name} not valid`)
        // }

        const temp = { ...data, [name]: { ...data[name], myvalue: value, valid: newValid, error: errorLst } }
        setData(temp);

        //---------------------------------------------
        setBtnDisable(false);
        for (const prop in data) {
            if (Object.hasOwnProperty.call(data, prop)) {
                const detail = data[prop];
                // console.log(detail);
                if (detail.valid == false) {
                    setBtnDisable(true);
                    break;
                }
            }
        }
        console.log(name, value, data[name].valid);
    }

    return <Container>
        <Form onSubmit={(e) => isValid(e)} className="form">
            <Row className="phase-top">
                <Col className="active">1</Col>
                <Col>2</Col>
                <Col>3</Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="fname">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            onBlur={e => updateValue(e.target)}
                            name="firstName"
                            type="text"
                            placeholder="enter first name..."
                            onChange={e => updateValue(e.target)}
                            value={data.firstName.myvalue} />
                        {!!data.firstName.error.length && <small className="text-danger">{data.firstName.error}</small>}

                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="lname">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            onBlur={e => updateValue(e.target)}
                            name="lastName"
                            type="text"
                            placeholder="enter last name..."
                            onChange={e => updateValue(e.target)}
                            value={data.lastName.myvalue} />
                        {!!data.lastName.error.length && <small className="text-danger">{data.lastName.error}</small>}

                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                    onBlur={e => updateValue(e.target)}
                    defaultValue={data.email.myvalue}
                    name="email"
                    type="email"
                    placeholder="Enter email..."
                    onChange={e => updateValue(e.target)}
                    value={data.email.myvalue} />
                {!!data.email.error.length && <small className="text-danger">{data.email.error}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="birthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control required onBlur={e => updateValue(e.target)} name="birthday" type="date" placeholder="Enter birth date..." />
                {!!data.birthday.error.length && <small className="text-danger">{data.birthday.error}</small>}

            </Form.Group>
            <div className="text-right">
                <Link to={'/phase_2'} >
                    <Button variant="primary" type="submit" ref={btn} disabled={btnDisable}>
                        Click here to proceed to the next step
                </Button>
                </Link>
            </div>
        </Form>
    </Container>
}

export default Page1
