import React, { useState, useEffect } from "react";
import { socket } from "../socket";

import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import communicationVis from "../images/communication-vis.png";
import mapVis from "../images/map-vis.png";
import videoVis from "../images/video-vis.png";
import behaviourVis from "../images/behaviour-vis.png";
import keywordVis from "../images/keyword-vis.png";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Col";

const visualisations = [
  // Fill with your real data
  { id: "videoVis", label: "Wide Video", description: "", imageUrl: videoVis },
  {
    id: "mapVis",
    label: "Floor map",
    description: "floor map with audio projection",
    imageUrl: mapVis,
  },
  {
    id: "commGraph",
    label: "Communication interaction",
    description: "",
    imageUrl: communicationVis,
  },
  // { id: "timeline", imageUrl: timelineVis },
  {
    id: "commBehaviour",
    label: "Teamwork communication behaviours",
    description: "",
    imageUrl: behaviourVis,
  },
  {
    id: "keywordVis",
    label: "Keywords",
    description: "",
    imageUrl: keywordVis,
  },
];
const VisualisationsPicker = () => {
  const [displayType, setDisplayType] = useState("");
  const [preview, setPreview] = useState({});
  const [selectedVis, setSelectedVis] = useState([]);

  //   function handleSubmit(event) {
  //     event.preventDefault();

  //     if (!displayType) {
  //       alert("Please select a display type.");
  //       return;
  //     }

  //     console.log("Selected display type:", displayType);
  //     socket.emit("from-controller", displayType, () => {
  //       console.log("Socket sent display type to server");
  //     });
  //   }

  //   function checkConstraint(id) {
  //     return (
  //       selectedVis.length < 3 && !selectedVis.some((item) => item.id === id)
  //     );
  //   }

  const selectVisualization = (vis) => {
    if (
      selectedVis.length < 3 &&
      !selectedVis.some((item) => item.id === vis.id)
    ) {
      setSelectedVis([...selectedVis, { id: vis.id }]);
      // socket.emit("from-controller", displayType, () => {
      //   console.log("Socket sent display type to server");
      // });
    } else {
      alert(
        "You can't select more than 3 visualizations. Please unselect a visualization before continuing."
      );
    }
  };

  useEffect(() => {
    console.log(selectedVis);
    const sentJson = JSON.stringify(selectedVis);
    socket.emit("send-disp-list", sentJson, () => {
      console.log(
        "Socket sent selected displays to server in a form of a list."
      );
    });
  });

  const deselectVisualization = (vis) => {
    setSelectedVis(selectedVis.filter((item) => item.id !== vis.id));
  };

  return (
    <div>
      <div
        style={{
          marginTop: "-10px",
          marginBottom: "-20px",
          marginLeft: "20px",
        }}
      >
        Select visualisations to be projected:
      </div>
      <div>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            overflowY: "auto",
            justifyContent: "center",
            border: "1px solid lightgray",
            borderRadius: "5px",
            padding: "10px",
            maxWidth: "100vw",
            maxHeight: "35vh",
            margin: "20px",
          }}
        >
          <Col>
            {visualisations.map((vis) => (
              <div
                key={vis.id}
                style={{
                  display: "inline-block",
                  margin: "3px",
                  position: "relative",
                  width: "40vw",
                }}
              >
                <Button
                  disabled={
                    selectedVis.length >= 3 &&
                    !selectedVis.some((item) => item.id === vis.id)
                  }
                  onClick={() => {
                    if (!selectedVis.some((item) => item.id === vis.id)) {
                      selectVisualization(vis);
                    } else {
                      deselectVisualization(vis);
                    }
                  }}
                  variant="light"
                  style={{
                    border: selectedVis.some((item) => item.id === vis.id)
                      ? "5px solid limegreen"
                      : undefined,
                    opacity:
                      selectedVis.length >= 3 &&
                      !selectedVis.some((item) => item.id === vis.id)
                        ? 0.5
                        : 1,
                    padding: "2px",
                    width: 300,
                  }}
                >
                  {vis.label}
                </Button>

                {selectedVis.length >= 3 &&
                  !selectedVis.some((item) => item.id === vis.id) && (
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
                      Cannot display more than 3 visualisations. Please unselect
                      a visualisation before continuing.
                    </div>
                  )}
                <Button
                  variant="link"
                  onClick={() => {
                    setPreview(vis);
                  }}
                >
                  Preview
                </Button>
              </div>
            ))}
          </Col>
          <Col>
            <div>
              {preview !== null && (
                <div>
                  <p>{preview.label}</p>
                  <Image src={preview.imageUrl} style={{ height: "25vh" }} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VisualisationsPicker;
