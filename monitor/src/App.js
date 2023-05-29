import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import DisplayViz from "./components/DisplayViz";

//image references:
import behaviourVis from "./images/behaviour-vis.png";
import communicationVis from "./images/social-network.png";
import keywordVis from "./images/keyword-vis.png";
import mapVis from "./images/ward-map.png";
import videoVis from "./images/video-vis.png";
import circleENA from "./images/circle-ena.png";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [dispList, setDispList] = useState([]);

  const imageReferences = {
    commBehaviour: { size: "small", imageUrl: behaviourVis },
    commGraph: { size: "small", imageUrl: communicationVis },
    keywordVis: { size: "small", imageUrl: keywordVis },
    mapVis: { size: "medium", imageUrl: mapVis },
    videoVis: { size: "large", imageUrl: videoVis },
    circleENA: {
      size: "small",
      imageUrl: circleENA,
    },
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Connected to " + socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Disconnected from " + socket.id);
    }

    function onUpdateList(list) {
      console.log("Received controller change to display: " + list);
      const parsedList = JSON.parse(list);
      setDispList(parsedList); // WARNING: abrupt mutation
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive-disp-list", onUpdateList);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-disp-list", onUpdateList);
    };
  }, []);

  const decideSize = (d) => {
    if (dispList.length === 1 && d.id !== "videoVis") {
      return "single";
    }
    return imageReferences[d.id].size;
  };

  const hideConnectButton = true;

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      {!hideConnectButton && <ConnectionManager />}

      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: "100vw",
          height: "90vh",
          maxHeight: "90vh",
          flexWrap: "wrap",
        }}
      >
        {dispList.length !== 0 ? (
          dispList.map((d) => (
            <DisplayViz
              size={decideSize(d)}
              image={imageReferences[d.id].imageUrl}
            />
          ))
        ) : (
          <div align="center">
            <h1>🔍No visualisations</h1>
            <p>Please select up to three visualisations</p>
          </div>
        )}
      </div>
    </div>
  );
}
