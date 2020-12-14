/** @format */

import { Button, Dialog } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import { popUp } from "./Utils/utils";

export default function FirstFunctionComponent() {
  const [value, setValue] = React.useState({ data: [] });
  const [full, setfull] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const options = {
    method: "GET",
    url:
      "http://api.aviationstack.com/v1/flights?access_key=8be4a1129dc5a6bd35c9bd3cbcdb7aa8",
  };

  const handleOnClick = (value) => {
    Axios.request(options)
      .then((response) => {
        setValue({ data: response.data.data });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
        popUp(error.message, "error", true);
      });
  };
  const handleFetchAllData = (values) => {
    let data = value.data;
    setfull(data[values]);
    setOpen(true);
  };
  useEffect((key) => {
    handleOnClick();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {value.data.map((item, index) => {
        return (
          <div>
            <Button onClick={handleFetchAllData.bind(this, index)}>
              {item.airline.name}{" "}
            </Button>
          </div>
        );
      })}
      {open ? (
        <div>
          <Dialog open={open} onClick={handleClose}>
            {full.arrival.airport}
          </Dialog>
          {console.log(full.arrival.airport)}
        </div>
      ) : null}
    </div>
  );
}
