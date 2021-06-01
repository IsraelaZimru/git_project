import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="text-center my-lg-5">
      <h1 className="display-3">
        Click below <br></br> to Start registration
      </h1>
      <hr style={{ width: "700px", border: "3px solid black" }}></hr>
      <Link to={"/phase_1"}>
        {" "}
        <Button
          style={{ width: "200px", heigth: "300px" }}
          className="btn btn-primary"
        >
          {" "}
          start{" "}
        </Button>
      </Link>
    </div>
  );
}
