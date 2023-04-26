import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <>
      <p>
        This is visualisation monitor screen. <br />
        Connection state to socket server: {"" + isConnected}
      </p>
    </>
  );
}
