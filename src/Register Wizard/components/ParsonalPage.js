import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ParsonalPage() {
  let allDetails = {};
  const allInputs = ["phase2", "phase1", "phase3Inputs"];
  for (const key of allInputs) {
    const temp = localStorage.getItem(key);
    allDetails = { ...allDetails, ...JSON.parse(temp) };
  }

  return (
    <>
      <div className="text-center my-3 ">
        <Link to="/phase_3" className="mr-3">
          <Button> Edit your details</Button>
        </Link>
        <Link to="/">
          <Button> Start Again Register</Button>
        </Link>
      </div>
      <Card>
        <Card.Img variant="top" src={allDetails.img} />
        <Card.Body>
          <Card.Title>{`${allDetails.firstName} ${allDetails.lastName}`}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {Object.entries(allDetails).map(([key, value], index) => {
            return key !== "rhigt" &&
              key !== "isDisabled" &&
              key !== "submitDisabled" &&
              key !== "img" &&
              !!value ? (
              <ListGroupItem key={index}>
                {key}: {value}
              </ListGroupItem>
            ) : (
              ""
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
}
