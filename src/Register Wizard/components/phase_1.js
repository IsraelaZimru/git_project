import 'bootstrap/dist/css/bootstrap.min.css'
import { useRef, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'


function Page1() {

    const btn = useRef(null)
    const [data, setData] = useState({
        lastName: { myvalue: "", length: 2, required: true, valid: false },
        firstName: { myvalue: "", length: 2, required: true, valid: false },
        email: { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, myvalue: "", required: true, valid: false },
        birthday: { valid: true }
    })
    // const [btnDisable, setBtnDisable] = useState(true)

    function isValid(e) {
        e.preventDefault();
    }

    function updateValue({ name, value }) {
        let isDisable = false
        let newValid = false;
        if (name === "email") {
            if ((data[name].pattern).test(data[name].myvalue)) {
                return newValid = true;
            }
        } else if (name !== "birthday") {
            if (data[name].length < value.length) {
                return newValid = true;
            }
            else { newValid = true; }
        }

        setData({ ...data, [name]: { ...data[name], myvalue: value, valid: newValid } })

        for (const prop in data) {
            if (Object.hasOwnProperty.call(data, prop)) {
                const detail = data[prop];
                if (detail.valid == false)
                    isDisable = true
            }
        }
        btn.current.disabled = isDisable;
        console.log(name, value, data[name].valid);
    }


    return <Container>
        <Form onSubmit={(e) => isValid(e)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="fname">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control onBlur={e => updateValue(e.target)} name="firstName" type="text" placeholder="enter first name..." />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="lname">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control onBlur={e => updateValue(e.target)} name="lastName" type="text" placeholder="enter last name..." />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address:</Form.Label>
                <Form.Control onBlur={e => updateValue(e.target)} name="email" type="email" placeholder="Enter email..." />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
  </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="birthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control onBlur={e => updateValue(e.target)} name="birthday" type="date" placeholder="Enter birth date..." />
            </Form.Group>
            <div className="text-right">
                <Button variant="primary" type="submit" ref={btn} disabled>
                    Click here to proceed to the next step
                </Button>
            </div>
        </Form>
    </Container>
}

export default Page1
