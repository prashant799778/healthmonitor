import React,{useState, useEffect} from "react";
// import 

import AppBar from "../AppBar/AppBar";
import SideBar from "../AppBar/Sidebar/SideBar";
import { DashStyled } from "./DashStyled";

import axios from "axios";
const  Home=(props)=> {

  const [deviceBar, setDeviceBar ]=useState(true)
  const [patientBar, setPatientBar ]=useState(false)
  const [patientList, setPatientList]=useState("")

  // constructor() {
  //   super();
  //   state = {
  //     deviceBar: true,
  //     patientBar: false,
  //     patientList: ""
  //   };
  // }

 const dash = () => {
    props.history.push("/home");
  };

  const report = () => {
    props.history.push("/report");
  };

  const selectType = e => {
    if (e.target.value === "Device") {
      setDeviceBar( true);
      setPatientBar(false);
    } else if (e.target.value === "Patient") {
      // setState({ deviceBar: false, patientBar: true });
      setDeviceBar( false);
      setPatientBar(true);
    }
  };

  // const componentDidMount = () => {
  //   patientApi();
  // };

  // Api Calliing
  const patientApi=()=> {
    axios
      .get("http://159.65.146.25:5053/Patient_Vital_master_select")
      .then(res => {
        console.log("res", res.data);
        if (res.data) {
          // setState({ patientList: res.data });
          setPatientList(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(()=>{
    patientApi();
    console.log(patientList)
  },[])
  //End of Api Calling

    // if(localStorage.getItem("login","no")==="yes" && localStorage.getItem("usertype","")!=="ADMIN"){
    //   props.history.push("/drfs")

    // }else if(localStorage.getItem("login","no")!=="yes"){

    //   props.history.push("/")
    // }
    // console.log(patientList);
    return (
      <DashStyled>
        <div>
          {/* Page Wrapper */}
          <div id="wrapper">
            {/* Sidebar */}
            {props.isOpen && <SideBar></SideBar>}
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* Main Content */}
              <div id="content">
                {/* Topbar */}
                <AppBar Open={props.Open}></AppBar>
                {/* End of Topbar */}
                {/* Begin Page Content */}

                {/* Page Heading */}
                <div className="container">
                  {/* Filter Box*/}
                  <div className="row filter">
                    <div className="col-auto my-1 filter-box">
                      <select
                        className="custom-select mr-sm-2 fil-select"
                        onChange={selectType}
                      >
                        <option>Device</option>
                        <option>Patient</option>
                      </select>
                    </div>
                  </div>
                  {/* Dashboard */}

                  {deviceBar && (
                    <div className="row">
                      {Array.isArray(patientList)
                        ? patientList.map((item, i) => {
                            console.log("item", item);
                            return (
                              <div className="col-sm-12 col-md-6">
                                <div className="card">
                                  <div className="card-body new-background-color">
                                    <div className="inner-container-body">
                                      <h2 className="upper-card-hading border-bt ">
                                        device id:{item["DeviceMac"]}
                                      </h2>
                                      <div className="inner-box-detail">
                                        <div className="device-box">
                                          <div className="device-info">
                                            <h2 className="color-gr">ECG</h2>
                                          </div>
                                          <div className="device-info">
                                            <h2 className="color-red">SPO2</h2>
                                          </div>
                                          <div className="device-info">
                                            <h2 className="color-yellow">
                                              RESP
                                            </h2>
                                          </div>
                                        </div>
                                        <div className="device-box text-left">
                                          <div className="side-device-info">
                                            <h2 className="color-gr">
                                              HR(bpm)
                                            </h2>
                                            <p className="color-gr">
                                              {item["ECG"] != " "
                                                ? item["ECG"]
                                                : "--"}
                                            </p>
                                          </div>
                                          <div className="side-device-info">
                                            <h2 className="color-white">
                                              NIBP(mmHg)
                                            </h2>
                                            <p className="color-white">
                                              {item["RESP"] != ""
                                                ? item["RESP"]
                                                : "---/--"}
                                            </p>
                                          </div>
                                          <div className="side-device-info wrap-both-box">
                                            <div className="two-info">
                                              <h2 className="color-red">
                                                SPO2
                                              </h2>
                                              <p className="color-red">--</p>
                                            </div>
                                            <div className="two-info">
                                              <h2 className="color-red">
                                                PR(bpm)
                                              </h2>
                                              <p className="color-red">--</p>
                                            </div>
                                          </div>
                                          <div className="side-device-info">
                                            <h2 className="color-white">
                                              Temp(℃)
                                            </h2>
                                            <p className="color-white">
                                              {item["TEMP"] != ""
                                                ? item["TEMP"]
                                                : "--"}
                                            </p>
                                          </div>
                                          <div className="side-device-info">
                                            <h2 className="color-yellow">
                                              RESP(brpm)
                                            </h2>
                                            <p className="color-yellow">
                                              {item["NIBP"] != ""
                                                ? item["NIBP"]
                                                : "--"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : null}
                      {/* new device */}
                      <div className="col-sm-12 col-md-6">
                        <div className="card">
                          <div className="card-body new-background-color">
                            <div className="inner-container-body">
                              <h2 className="upper-card-hading border-bt ">
                                device id
                              </h2>
                              <div className="inner-box-detail">
                                <div className="device-box">
                                  <div className="device-info">
                                    <h2 className="color-gr">ecg</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-red">spo2</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-yellow">resp</h2>
                                  </div>
                                </div>
                                <div className="device-box text-left">
                                  <div className="side-device-info">
                                    <h2 className="color-gr">HR(bpm)</h2>
                                    <p className="color-gr">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">NIBP(mmHg)</h2>
                                    <p className="color-white">---/--</p>
                                  </div>
                                  <div className="side-device-info wrap-both-box">
                                    <div className="two-info">
                                      <h2 className="color-red">SPO2</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                    <div className="two-info">
                                      <h2 className="color-red">PR(bpm)</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">Temp(℃)</h2>
                                    <p className="color-white">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-yellow">RESP(brpm)</h2>
                                    <p className="color-yellow">--</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end new device */}

                      {/* new device */}
                      <div className="col-sm-12 col-md-6">
                        <div className="card">
                          <div className="card-body new-background-color">
                            <div className="inner-container-body">
                              <h2 className="upper-card-hading border-bt ">
                                Patient Id
                              </h2>
                              <div className="inner-box-detail">
                                <div className="device-box">
                                  <div className="device-info">
                                    <h2 className="color-gr">ecg</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-red">spo2</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-yellow">resp</h2>
                                  </div>
                                </div>
                                <div className="device-box text-left">
                                  <div className="side-device-info">
                                    <h2 className="color-gr">HR(bpm)</h2>
                                    <p className="color-gr">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">NIBP(mmHg)</h2>
                                    <p className="color-white">---/--</p>
                                  </div>
                                  <div className="side-device-info wrap-both-box">
                                    <div className="two-info">
                                      <h2 className="color-red">SPO2</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                    <div className="two-info">
                                      <h2 className="color-red">PR(bpm)</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">Temp(℃)</h2>
                                    <p className="color-white">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-yellow">RESP(brpm)</h2>
                                    <p className="color-yellow">--</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end new device */}
                    </div>
                  )}

                  {patientBar && (
                    <div className="row">
                      {Array.isArray(patientList)
                        ? patientList.map((item, i) => {
                            console.log("item", item);
                            return (
                              <div className="col-sm-12 col-md-6">
                                <div className="card">
                                  <div className="card-body new-background-color">
                                    <div className="inner-container-body">
                                      <h2 className="upper-card-hading border-bt ">
                                        Patient Id:{item["PatientId"]}
                                      </h2>
                                      <div className="inner-box-detail">
                                        <div className="device-box">
                                          <div className="device-info">
                                            <h2 className="color-gr">ECG</h2>
                                          </div>
                                          <div className="device-info">
                                            <h2 className="color-red">SPO2</h2>
                                          </div>
                                          <div className="device-info">
                                            <h2 className="color-yellow">
                                              RESP
                                            </h2>
                                          </div>
                                        </div>
                                        <div className="device-box text-left">
                                          <div className="side-device-info">
                                            <h2 className="color-gr">
                                              HR(bpm)
                                            </h2>
                                            <p className="color-gr">
                                              {item["ECG"] != " "
                                                ? item["ECG"]
                                                : "--"}
                                            </p>
                                          </div>
                                          <div className="side-device-info">
                                            <h2 className="color-white">
                                              NIBP(mmHg)
                                            </h2>
                                            <p className="color-white">
                                              {item["RESP"] != ""
                                                ? item["RESP"]
                                                : "---/--"}
                                            </p>
                                          </div>
                                          <div className="side-device-info wrap-both-box">
                                            <div className="two-info">
                                              <h2 className="color-red">
                                                SPO2
                                              </h2>
                                              <p className="color-red">--</p>
                                            </div>
                                            <div className="two-info">
                                              <h2 className="color-red">
                                                PR(bpm)
                                              </h2>
                                              <p className="color-red">--</p>
                                            </div>
                                          </div>
                                          <div className="side-device-info">
                                            <h2 className="color-white">
                                              Temp(℃)
                                            </h2>
                                            <p className="color-white">
                                              {item["TEMP"] != ""
                                                ? item["TEMP"]
                                                : "--"}
                                            </p>
                                          </div>
                                          <div className="side-device-info">
                                            <h2 className="color-yellow">
                                              RESP(brpm)
                                            </h2>
                                            <p className="color-yellow">
                                              {item["NIBP"] != ""
                                                ? item["NIBP"]
                                                : "--"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : null}

                      {/* new device */}
                      <div className="col-sm-12 col-md-6">
                        <div className="card">
                          <div className="card-body new-background-color">
                            <div className="inner-container-body">
                              <h2 className="upper-card-hading border-bt ">
                                Patient Id
                              </h2>
                              <div className="inner-box-detail">
                                <div className="device-box">
                                  <div className="device-info">
                                    <h2 className="color-gr">ECG</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-red">SPO2</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-yellow">RESP</h2>
                                  </div>
                                </div>
                                <div className="device-box text-left">
                                  <div className="side-device-info">
                                    <h2 className="color-gr">HR(bpm)</h2>
                                    <p className="color-gr">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">NIBP(mmHg)</h2>
                                    <p className="color-white">---/--</p>
                                  </div>
                                  <div className="side-device-info wrap-both-box">
                                    <div className="two-info">
                                      <h2 className="color-red">SPO2</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                    <div className="two-info">
                                      <h2 className="color-red">PR(bpm)</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">Temp(℃)</h2>
                                    <p className="color-white">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-yellow">RESP(brpm)</h2>
                                    <p className="color-yellow">--</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end new device */}
                      {/* new device */}
                      <div className="col-sm-12 col-md-6">
                        <div className="card">
                          <div className="card-body new-background-color">
                            <div className="inner-container-body">
                              <h2 className="upper-card-hading border-bt ">
                                Patient Id
                              </h2>
                              <div className="inner-box-detail">
                                <div className="device-box">
                                  <div className="device-info">
                                    <h2 className="color-gr">ECG</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-red">SPO2</h2>
                                  </div>
                                  <div className="device-info">
                                    <h2 className="color-yellow">RESP</h2>
                                  </div>
                                </div>
                                <div className="device-box text-left">
                                  <div className="side-device-info">
                                    <h2 className="color-gr">HR(bpm)</h2>
                                    <p className="color-gr">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">NIBP(mmHg)</h2>
                                    <p className="color-white">---/--</p>
                                  </div>
                                  <div className="side-device-info wrap-both-box">
                                    <div className="two-info">
                                      <h2 className="color-red">SPO2</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                    <div className="two-info">
                                      <h2 className="color-red">PR(bpm)</h2>
                                      <p className="color-red">--</p>
                                    </div>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-white">Temp(℃)</h2>
                                    <p className="color-white">--</p>
                                  </div>
                                  <div className="side-device-info">
                                    <h2 className="color-yellow">RESP(brpm)</h2>
                                    <p className="color-yellow">--</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end new device */}
                      {/* new device */}
                      {/* <div className="col-sm-12 col-md-6">
      <div className="card">
        <div className="card-body new-background-color">
          <div className="inner-container-body">
              <h2 className="upper-card-hading border-bt ">device id</h2>
              <div className="inner-box-detail">
                <div className="device-box">
                  <div className="device-info">
                    <h2 className="color-gr">ecg</h2>
                  </div>
                  <div className="device-info">
                  < h2 className="color-red">spo2</h2>
                  </div>
                  <div className="device-info">
                    <h2 className="color-yellow">resp</h2>
                  </div>
                </div>
                <div className="device-box text-left">
                  <div className="side-device-info">
                    <h2 className="color-gr">HR(bpm)</h2>
                    <p className="color-gr">--</p>
                  </div>
                  <div className="side-device-info">
                    <h2 className="color-white">NIBP(mmHg)</h2>
                    <p className="color-white">---/--</p>
                  </div>
                  <div className="side-device-info wrap-both-box">
                    <div className="two-info">
                      <h2 className="color-red">SPO2</h2>
                      <p className="color-red">--</p>
                    </div>
                    <div className="two-info">
                      <h2 className="color-red">PR(bpm)</h2>
                      <p className="color-red">--</p>
                    </div>
                  </div>
                  <div className="side-device-info">
                    <h2 className="color-white">Temp(℃)</h2>
                    <p className="color-white">--</p>
                  </div>
                  <div className="side-device-info">
                    <h2 className="color-yellow">RESP(brpm)</h2>
                    <p className="color-yellow">--</p>
                  </div>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div> */}
                      {/* end new device */}
                    </div>
                  )}
                </div>
              </div>
              {/* End of Main Content */}
              {/* Footer */}
              <footer className="sticky-footer new-background-color">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright ©fourbrick 2019</span>
                  </div>
                </div>
              </footer>
              {/* End of Footer */}
            </div>
            {/* End of Content Wrapper */}
          </div>
          {/* End of Page Wrapper */}
          {/* Scroll to Top Button*/}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up" />
          </a>
          {/* Logout Modal*/}
          <div
            className="modal fade"
            id="logoutModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ready to Leave?
                  </h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Select "Logout" below if you are ready to end your current
                  session.
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <a
                    style={{ color: "#ffffff" }}
                    className="btn btn-primary"
                    onClick={() => {
                      localStorage.removeItem("login");
                      props.history.push("/");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* The Modal */}
          <div
            className="modal fade"
            id="myDevice"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">Device Id:</h4>
                  <button
                    id="closeId"
                    type="button"
                    className="close"
                    data-dismiss="modal"
                  >
                    ×
                  </button>
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <div
                    className="col-sm-14 cardbox"
                    style={{ marginBottom: "2%" }}
                    id="device"
                    data-toggle="modal"
                    data-target="#myDevice"
                  >
                    <div className="card" style={{ background: "black" }}>
                      {/* <div class="card-body" style={{display:"flex",borderBottom: "1px solid white",padding: "0.25rem"}}>
    <div style={{marginRight:"2%",color:"white",textAlign:"left"}}> 
          <span style={{fontSize:"14px",fontWeight:"700"}}>Device Id: </span>
          </div>
    </div> */}
                      <div
                        className="card-body"
                        style={{ display: "flex", padding: "0.25rem" }}
                      >
                        <div
                          className="main-part"
                          style={{
                            width: "70%",
                            borderRight: "1px solid white"
                          }}
                        >
                          <div
                            style={{
                              borderBottom: "1px solid white",
                              marginRight: "2%",
                              color: "white",
                              textAlign: "left"
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#13c313de",
                                fontWeight: "700"
                              }}
                            >
                              ECG
                            </span>
                          </div>
                          <div
                            style={{
                              borderBottom: "1px solid white",
                              marginRight: "2%",
                              color: "white",
                              textAlign: "left"
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "rgba(208, 36, 8, 0.87)"
                              }}
                            >
                              {" "}
                              SPO2
                            </span>
                          </div>
                          <div
                            style={{
                              marginRight: "2%",
                              color: "white",
                              height: "10vh",
                              textAlign: "left"
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#e4e649f2"
                              }}
                            >
                              RESP
                            </span>
                          </div>
                        </div>
                        <div className="side-part" style={{ width: "30%" }}>
                          <div
                            style={{
                              borderBottom: "1px solid white",
                              marginRight: "2%",
                              marginLeft: "2%",
                              color: "white",
                              textAlign: "left"
                            }}
                          >
                            <div style={{ display: "block" }}>
                              <div
                                style={{
                                  color: "#13c313de",
                                  fontSize: "14px",
                                  fontWeight: "700"
                                }}
                              >
                                HR(bpm)
                              </div>
                              <div
                                style={{
                                  color: "#13c313de",
                                  fontSize: "14px",
                                  fontWeight: "700"
                                }}
                              >
                                --
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              borderBottom: "1px solid white",
                              marginRight: "2%",
                              marginLeft: "2%",
                              color: "white",
                              textAlign: "left"
                            }}
                          >
                            <div>
                              {" "}
                              <div
                                style={{ fontSize: "14px", fontWeight: "700" }}
                              >
                                NIBP(mmHg)
                              </div>
                              <div
                                style={{ fontSize: "14px", fontWeight: "700" }}
                              >
                                ---/--
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              borderBottom: "1px solid white",
                              marginRight: "2%",
                              marginLeft: "2%",
                              color: "white",
                              textAlign: "left",
                              display: "flex"
                            }}
                          >
                            <div style={{ width: "50%" }}>
                              <div
                                style={{
                                  color: "rgba(208, 36, 8, 0.87)",
                                  fontWeight: "700"
                                }}
                              >
                                SPO2
                              </div>
                              <div
                                style={{
                                  color: "rgba(208, 36, 8, 0.87)",
                                  fontWeight: "700"
                                }}
                              >
                                --
                              </div>
                            </div>
                            <div style={{ width: "50%" }}>
                              <div
                                style={{
                                  color: "rgba(208, 36, 8, 0.87)",
                                  fontSize: "14px",
                                  fontWeight: "700"
                                }}
                              >
                                PR(bpm)
                              </div>
                              <div
                                style={{
                                  color: "rgba(208, 36, 8, 0.87)",
                                  fontWeight: "700"
                                }}
                              >
                                --
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              borderBottom: "1px solid white",
                              marginRight: "2%",
                              marginLeft: "2%",
                              color: "white",
                              textAlign: "left"
                            }}
                          >
                            <div>
                              <div>Temp(&#8451;)</div>
                              <div>--.-</div>
                            </div>
                          </div>
                          <div
                            style={{
                              marginRight: "2%",
                              marginLeft: "2%",
                              color: "white",
                              textAlign: "left"
                            }}
                          >
                            <div>
                              {" "}
                              <div
                                style={{
                                  color: "#e4e649f2",
                                  fontWeight: "700"
                                }}
                              >
                                RESP(brpm)
                              </div>
                              <div
                                style={{
                                  color: "#e4e649f2",
                                  fontWeight: "700"
                                }}
                              >
                                --
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashStyled>
    );
  }

export default Home;
