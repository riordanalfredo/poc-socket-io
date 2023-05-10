import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import mapIamge from "./components/ward-map.png";
import videoImage from "./components/ward-video-ss.png";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [displayType, setDisplayType] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Connected to " + socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Disconnected from " + socket.id);
    }

    function onControllerChange(value) {
      console.log("Received controller change to display: " + value);
      setDisplayType(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("to-monitor", onControllerChange);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("to-monitor", onControllerChange);
    };
  }, []);

  const hideConnectButton = true;

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      {!hideConnectButton && <ConnectionManager />}

      <Card
        style={{
          width: "40rem",
          height: "30rem",
          padding: "10px",
          margin: "20px",
        }}
      >
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Displaying: {displayType}
          </Card.Subtitle>
          {displayType === "youtube" && (
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/W1UWKLOSO5g"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {displayType === "map" && <Image src={mapIamge} fluid />}
          {displayType === "video" && <Image src={videoImage} fluid />}
        </Card.Body>
      </Card>
    </div>
  );
}
