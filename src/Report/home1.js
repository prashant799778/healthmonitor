import React, { useState, useEffect } from "react";
import axios from "axios";

// import {  } from "";
import AppBar from "../AppBar/AppBar";
import SideBar from "../AppBar/Sidebar/SideBar";
import { DashStyled } from "./DashStyled";
import Device1 from "./device1";
import Device2 from "./device2";



import PatientId1 from "./patientId1";
import PatientId2 from "./patientId2";
import PatientId3 from "./patientId3";

const Home = props => {
  const [deviceBar, setDeviceBar] = useState(true);
  const [patientBar, setPatientBar] = useState(false);
  const [patientList, setPatientList] = useState("");

  const [isHospitalSelected, setIsHospitalSelected] = useState(false);
  const [deviceId, setDeviceId] = useState([]);
  const [selectedHospitals, setMySelectedHospitals] = useState();

  // const [deviceId, setDeviceId] = useState([]);
  // const [patientId, setPatientId] = useState([]);
  // const [patientName, setPatientName] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  // const [ECG, setECG] = useState({ heartRate: "", respRate: "", restRate: "" });
  // const [RESP, setRESP] = useState("");
  // const [SPO2, setSPO2] = useState({ pulseRate: "", SPO2: "" });
  // constructor() {
  //   super();
  //   state = {
  //     deviceBar: true,
  //     patientBar: false,f
  //     patientList: ""
  //   };
  // }

  const dash = () => {
    props.history.push("/home");
  };

  const report = () => {
    props.history.push("/report");
  };

  //******************************************** fetching device list ***********************************************
  useEffect(() => {
    axios
      .get(
        `https://smarticuapi.fourbrick.in/Device_master_select?hospital_Name=${hospitals}`
      )
      .then(res => {
        if (res.data) {
          setDeviceId(res.data.result);
        }
      })
      .catch(e => console.log(e));
  }, [selectedHospitals]);

  useEffect(()=>{
console.log(deviceId)
  })

  // const selectType = e => {
  //   axios
  //     .get(
  //       `https://smarticuapi.fourbrick.in/Device_master_select?hospital_Name=${e.target.value}`
  //     )
  //     .then(res => {
  //       if (res.data) {
  //         console.log(res.data.result);
  //         const deviceIdData = res.data.result;
  //         deviceIdData.map(
  //           deviceData => (
  //             console.log(deviceData.DeviceMac),
  //             setDeviceId([...deviceId, deviceData.DeviceMac])
  //           )
  //         );
  //         setIsHospitalSelected(true);
  //       }
  //     });

  // if (e.target.value === "fortis") {
  //   setDeviceBar(true);
  //   setPatientBar(false);
  // } else if (e.target.value === "max") {
  //   // setState({ deviceBar: false, patientBar: true });
  //   setDeviceBar(false);
  //   setPatientBar(true);
  // }
  // };

  useEffect(() => {
    console.log(deviceId);
  }, [deviceId]);

  // const componentDidMount = () => {
  //   patientApi();
  // };

  // Api Calling
  // const patientApi = () => {
  //   axios
  //     .get("https://smarticuapi.fourbrick.in/Patient_master_select")
  //     .then(res => {
  //       const allData = res.data.result;
  //       allData.map(
  //         hospitalData => (
  //           setDeviceId(deviceId.push(hospitalData.DeviceMac)),
  //           setPatientId(patientId.push(hospitalData.PatientId)),
  //           setPatientName(patientName.push(hospitalData.PatientName)),
  //           setHospitals(hospitals.push(hospitalData.hospital_Name))
  //         )
  //       );
  //       if (res.data) {
  //         console.log(deviceId);
  //         console.log(patientId);
  //         console.log(patientName);
  //         console.log(hospitals);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const handleHospitalSelect = e => {
    const selectedHospitals = e.target.value;
    setMySelectedHospitals(selectedHospitals);
  };

  useEffect(() => {
    console.log(hospitals);
  });

  //! *****************************************fetching hospital list********************
  useEffect(() => {
    axios
      .get("https://smarticuapi.fourbrick.in/hospital_master_list1")
      .then(res => {
        console.log(res.data.result);
        const hospitalData = res.data.result;
        setHospitals(hospitalData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const hospitalsName =
    hospitals.length > 0 &&
    hospitals.map(hospitalName => (
      <option key={hospitalName}>{hospitalName}</option>
    ));

  const HospitalDeviceId =
    deviceId.length > 0 &&
    deviceId.map(hospitalData => {
      return(
        console.log(hospitalData),<option>{hospitalData.DeviceMac}</option>
      )
    })

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
        {/* Header */}
        <div id="wrapper">
          {props.isOpen && <SideBar></SideBar>}
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <AppBar Open={props.Open}></AppBar>
              {/* Header */}
              <div className="container">
                <div className="row filter">
                  <div className="col-auto my-1 filter-box">
                    <select
                      className="custom-select mr-sm-2 fil-select"
                      onChange={handleHospitalSelect}
                    >
                      <option>Hospital</option>
                      {hospitalsName}
                      {/* <option>Patient</option> */}
                    </select>
                    <select
                      className="custom-select mr-sm-2 fil-select"
                      // onChange={selectTypeDevice1}
                    >
                      <option>Device ID</option>
                      {isHospitalSelected && { HospitalDeviceId }}
                      {/* <option>Patient</option> */}
                    </select>
                    )}
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
                                          <h2 className="color-gr">ECGs</h2>
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
                                            <h2 className="color-red">SPO2</h2>
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
                                            {item["TEMP"] !== ""
                                              ? item["TEMP"]
                                              : "--"}
                                          </p>
                                        </div>
                                        <div className="side-device-info">
                                          <h2 className="color-yellow">
                                            RESP(brpm)
                                          </h2>
                                          <p className="color-yellow">
                                            {item["NIBP"] !== ""
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
                    <Device1 />
                    {/* end new device */}
                    <Device2 />

                    {/* new device */}

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
                                          <h2 className="color-yellow">RESP</h2>
                                        </div>
                                      </div>
                                      <div className="device-box text-left">
                                        <div className="side-device-info">
                                          <h2 className="color-gr">HR(bpm)</h2>
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
                                            <h2 className="color-red">SPO2</h2>
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
                    <PatientId1 />
                    {/* end new device */}

                    {/* new device */}
                    <PatientId2 />
                    {/* end new device */}

                    {/* new device */}
                    <PatientId3 />
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
                  <span>Copyright ©Digitology Healthtech Pvt. Ltd. 2020</span>
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
      </div>
    </DashStyled>
  );
};

export default Home;
