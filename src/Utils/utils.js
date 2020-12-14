/** @format */

import React from "react";
import ReactDOM from "react-dom";
import SnackBar from "../Component/ModifiedSnackBar";

export function popUp(message, type, handleOpen) {
  ReactDOM.render(
    <SnackBar
      message={message}
      type={type}
      handleOpen={handleOpen}
      renderElement={document.getElementById("popUp")}
    />,
    document.getElementById("popUp")
  );
}
