import React from "react";

export function ConnectionState({ isConnected }) {
  return <p>Connection state to socket server: {"" + isConnected}</p>;
}
