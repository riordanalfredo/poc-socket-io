import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <>
      <p>Connection: {"" + isConnected}</p>
    </>
  );
}
