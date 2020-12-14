/** @format */

import {
  Avatar,
  Button,
  Card,
  Container,
  LinearProgress,
} from "@material-ui/core";
import Axios from "axios";
import fileDownload from "js-file-download";
import React, { Component } from "react";
import { storage } from "./FireBase";
import { popUp } from "./Utils/utils";

class ImageDownload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      downloadprogress: 0,
      loaded: "0",
      total: "0",
      bytes: "0",
      average: 0,
      totaltime: 0,
      averagespeed: 0,
    };
    this.button = React.createRef();
  }

  handleOpen = () => {
    const file = storage.ref().child("Screenshot (7).png");
    file
      .getDownloadURL()
      .then((url1) => {
        this.setState({ url: url1 }, () => {
          popUp("Suceess", "success", true);
        });
      })
      .catch((error) => {
        popUp("error", "error", true);
      });
  };
  handleDownload = () => {
    const file = storage.ref().child("Screenshot (7).png");
    file
      .getDownloadURL()
      .then((url1) => {
        let start = new Date().getTime();
        let progress1 = 0;
        Axios({
          method: "get",
          url: url1,
          header: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Content-type": "text/javascript",
          },
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            progress1 = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            let loded = Math.floor(progressEvent.loaded / 1024);
            let total = Math.floor(progressEvent.total / 1024);
            let end = new Date().getTime();
            let duration = (end - start) / 1000;
            let bps = progressEvent.loaded / duration;
            let kbps = bps / 1024;
            let bytes = Math.floor(kbps);
            let time = (progressEvent.total - progressEvent.loaded) / bps;
            let second = Math.floor(time % 60);
            let minutes = Math.floor(time / 60);
            this.downloadPdf(
              progress1,
              loded,
              total,
              bytes,
              second,
              minutes,
              start
            );
          },
        })
          .then((response) => {
            fileDownload(response.data, "Screenshot (7).png");
            popUp("File Downloaded", "success", true);
          })
          .catch((error) => {
            popUp("error", "error", true);
          });
      })
      .catch((error) => {
        popUp("Time Out Retry", "error", true);
      });
  };

  downloadPdf = (progress1, loaded, total, bytes, second, minutes, start) => {
    this.setState({
      downloadprogress: progress1,
      loaded: loaded,
      total: total,
      bytes: bytes,
      second: second,
      minutes: minutes,
    });
    if (progress1) {
      this.setState({ average: this.state.average + 1 }, () => {
        this.setState({
          averagespeed: total / this.state.average,
        });
      });
    }
    if (progress1 === 100) {
      let end = new Date().getTime();
      let duration = (end - start) / 1000;
      this.setState({
        totaltime: duration,
      });
    }
  };

  render() {
    const {
      downloadprogress,
      loaded,
      total,
      bytes,
      minutes,
      second,
      averagespeed,
      url,
      totaltime,
      time,
    } = this.state;
    return (
      <div>
        <div>{time}</div>
        <Avatar src={url.photoURL} />
        <Button onClick={this.signOut}>Signout</Button>
        <br />
        <h2>DownLoad/View</h2>
        <Button color="primary" onClick={this.handleDownload}>
          Click Here to Download
        </Button>
        <Button color="primary" onClick={this.handleOpen}>
          Click Here to open
        </Button>
        <br />
        {downloadprogress !== 0 ? (
          <Container>
            <LinearProgress value={downloadprogress} variant="buffer" />
            <span>{downloadprogress}%</span>
            <div>
              <b>
                <div>
                  {loaded < 1024 ? (
                    <small> {loaded}&nbsp;kb</small>
                  ) : (
                    <small>{(loaded / 1024).toFixed(2)}&nbsp;Mb</small>
                  )}
                  &nbsp;/&nbsp;
                  {total < 1024 ? (
                    <small> {total}&nbsp;kb</small>
                  ) : (
                    <small>{(total / 1024).toFixed(2)}&nbsp;Mb</small>
                  )}
                  <div>
                    {bytes < 1024 ? (
                      <small> {bytes}&nbsp;kbps</small>
                    ) : (
                      <small> {(bytes / 1024).toFixed(2)}&nbsp;Mbps</small>
                    )}
                  </div>
                  {totaltime !== 0 ? (
                    <h5>Downloaded Time&nbsp;{totaltime} </h5>
                  ) : (
                    <h5>
                      Time remaining Minutes&nbsp;{minutes}&nbsp;Seconds&nbsp;
                      {second}{" "}
                    </h5>
                  )}
                  <div>
                    <small>Average Speed</small>
                    {averagespeed < 1024 ? (
                      <div>{averagespeed.toFixed(2)}kbps</div>
                    ) : (
                      <div>{(averagespeed / 1024).toFixed(2)}&nbsp;Mbps</div>
                    )}
                  </div>
                </div>
              </b>
            </div>
          </Container>
        ) : null}
        <br />
        {url ? (
          <Container maxWidth="sm">
            <Card className="shadow">
              <img
                src={url.photoURL}
                alt="Avenger"
                style={{ width: "100%", maxWidth: "600px" }}
              />
            </Card>
          </Container>
        ) : null}
      </div>
    );
  }
}
export default ImageDownload;
