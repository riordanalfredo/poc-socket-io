import React, { useState } from "react";
import { socket } from "../socket";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import communicationVis from "../images/communication-vis.png";
import mapVis from "../images/map-vis.png";
import videoVis from "../images/video-vis.png";
import timelineVis from "../images/timeline-vis.png";
import behaviourVis from "../images/behaviour-vis.png";
import keywordVis from "../images/keyword-vis.png";
import samplePreview from "../images/sample-preview.png";
import { FaBackward, FaForward, FaPlay, FaPause, FaRedo } from "react-icons/fa";

const visualisations = [
  // Fill with your real data
  { id: "1", imageUrl: videoVis },
  { id: "2", imageUrl: mapVis },
  { id: "3", imageUrl: communicationVis },
  { id: "4", imageUrl: timelineVis },
  { id: "5", imageUrl: behaviourVis },
  { id: "6", imageUrl: keywordVis },
];

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

  const [selectedVis, setSelectedVis] = useState([]);

  const selectVisualization = (vis) => {
    if (selectedVis.length < 3 && !selectedVis.includes(vis.id)) {
      setSelectedVis([...selectedVis, vis.id]);
    } else {
      alert(
        "You can't select more than 3 visualizations. Please unselect a visualization before continuing."
      );
    }
  };

  const deselectVisualization = (vis) => {
    setSelectedVis(selectedVis.filter((id) => id !== vis.id));
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const play = () => {
    setIsPlaying(true);
    // Add code to play media
  };

  const pause = () => {
    setIsPlaying(false);
    // Add code to pause media
  };

  const skipBack = () => {
    // Add code to skip back 5 seconds
  };

  const skipForward = () => {
    // Add code to skip forward 5 seconds
  };

  const startFromBeginning = () => {
    // Add code to start from beginning
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    // Add code to change playback rate
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const showPreviewModalPressed = (visSelected) => {
    console.log(visSelected);
    setShowPreviewModal(true);
  };

  const hidePreviewModal = () => {
    setShowPreviewModal(false);
  };

  const hideOtherComponent = true;

  return (
    <>
      <div
        style={{
          marginTop: "-10px",
          marginBottom: "-20px",
          marginLeft: "20px",
        }}
      >
        Select visualisations to be projected:
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          border: "1px solid lightgray",
          borderRadius: "5px",
          padding: "10px",
          maxWidth: "100vw",
          maxHeight: "35vh",
          margin: "20px",
        }}
      >
        {visualisations.map((vis) => (
          <div
            key={vis.id}
            style={{
              display: "inline-block",
              margin: "3px",
              position: "relative",
            }}
          >
            <Button
              disabled={
                selectedVis.length >= 3 && !selectedVis.includes(vis.id)
              }
              onClick={() => {
                if (!selectedVis.includes(vis.id)) {
                  selectVisualization(vis);
                } else {
                  deselectVisualization(vis);
                }
              }}
              variant="light"
              style={{
                border: selectedVis.includes(vis.id)
                  ? "5px solid limegreen"
                  : undefined,
                opacity:
                  selectedVis.length >= 3 && !selectedVis.includes(vis.id)
                    ? 0.5
                    : 1,
                padding: "2px",
              }}
            >
              <Image src={vis.imageUrl} style={{ width: "175px" }} />
            </Button>
            {selectedVis.length >= 3 && !selectedVis.includes(vis.id) && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Cannot display more than 3 visualisations. Please unselect a
                visualisation before continuing.
              </div>
            )}
            <Button
              variant="link"
              onClick={() => {
                showPreviewModalPressed(vis);
              }}
            >
              Preview if selected
            </Button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "-10px",
          marginBottom: "-20px",
          marginLeft: "20px",
        }}
      >
        Playback controller:
      </div>

      <div
        style={{
          border: "1px solid lightgray",
          borderRadius: "5px",
          padding: "10px",
          maxWidth: "18vw",
          maxHeight: "50vh",
          margin: "20px",
        }}
      >
        <ButtonGroup vertical>
          <Button
            variant="outline-dark"
            onClick={startFromBeginning}
            style={{ borderRadius: "5px", height: "62px" }}
          >
            <FaRedo />
            <br />
            Restart
          </Button>
          <Button
            variant="outline-dark"
            onClick={skipBack}
            style={{ borderRadius: "5px", height: "62px" }}
          >
            <FaBackward />
            <br />
            Back 5s
          </Button>
          <Button
            variant="outline-dark"
            onClick={isPlaying ? pause : play}
            style={{ borderRadius: "5px", height: "62px" }}
          >
            {isPlaying ? (
              <>
                <FaPause />
                <br />
                Pause
              </>
            ) : (
              <>
                <FaPlay />
                <br />
                Play
              </>
            )}
          </Button>
          <Button
            variant="outline-dark"
            onClick={skipForward}
            style={{ borderRadius: "5px", height: "62px" }}
          >
            <FaForward />
            <br />
            Forward 5s
          </Button>
          <Dropdown
            onSelect={(eventKey) =>
              changePlaybackRate(parseFloat(eventKey || "1"))
            }
          >
            <Dropdown.Toggle
              variant="outline-dark"
              style={{ borderRadius: "5px", height: "62px" }}
            >
              Speed: {playbackRate}x
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="0.5">0.5x</Dropdown.Item>
              <Dropdown.Item eventKey="1">1x</Dropdown.Item>
              <Dropdown.Item eventKey="1.5">1.5x</Dropdown.Item>
              <Dropdown.Item eventKey="2">2x</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      </div>

      <Modal show={showPreviewModal} onHide={hidePreviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Preview if you selected the visualisation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={samplePreview} fluid />
        </Modal.Body>
      </Modal>

      {!hideOtherComponent && (
        <Card style={{ width: "18rem", margin: "20px" }}>
          <Card.Header>This component connected to socket io</Card.Header>
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
                  label="Intro video display"
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
      )}
    </>
  );
}
