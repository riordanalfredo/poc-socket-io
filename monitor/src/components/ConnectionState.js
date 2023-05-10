import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <>
      <p style={{ fontSize: "8px" }}>Connection: {"" + isConnected}</p>
    </>
  );
}
