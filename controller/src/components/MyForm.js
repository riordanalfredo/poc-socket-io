import React, { useState } from "react";
import { socket } from "../socket";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export function MyForm() {
  const [displayType, setDisplayType] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!displayType) {
      alert("Please select a display type.");
      return;
    }

    console.log("Selected display type:", displayType);
    socket.emit("from-controller", displayType, () => {
      console.log("Socket sent display type to server");
    });
  }

  return (
    <>
      <Card style={{ width: "18rem", margin: "20px" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="displayType">
              <Form.Label>Choose display type</Form.Label>
              <Form.Check
                type="radio"
                name="displayType"
                id="videoDisplay"
                label="Video display"
                value="video"
                checked={displayType === "video"}
                onChange={(e) => setDisplayType(e.target.value)}
              />
              <Form.Check
                type="radio"
                name="displayType"
                id="mapDisplay"
                label="Map display"
                value="map"
                checked={displayType === "map"}
                onChange={(e) => setDisplayType(e.target.value)}
              />
              <Form.Check
                type="radio"
                name="displayType"
                id="youtubeDisplay"
                label="Youtube video display"
                value="youtube"
                checked={displayType === "youtube"}
                onChange={(e) => setDisplayType(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
