import React, { useState, useEffect } from "react";
import axios from "axios";
import { Connector } from 'mqtt-react';
import { subscribe } from 'mqtt-react';
// import {  } from "";
import AppBar from "../AppBar/AppBar";
import SideBar from "../AppBar/Sidebar/USidebar";
import { DashStyled } from "./DashStyled";
import Device1 from "./device1";
import Device2 from "./device2";



import PatientId1 from "./patientId1";
import PatientId2 from "./patientId2";
import PatientId3 from "./patientId3";

const Home = props => {

  const [deviceBar, setDeviceBar] = useState(true);
  const [patientBar, setPatientBar] = useState(false);
  const [totalHospitalCount, setTotalHospitalCount] = useState("");
  const [totalPatientCount, setTotalPatientCount] = useState("");
  const [patientList, setPatientList] = useState("");
  const [hospitalList, setHospitalList] = useState("");
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
  const MessageList = (props) => (
    <ul>
{props.data.map( message =>{ 
 console.log("message", message)
return <li>{message}</li> })}
    </ul>
  );
 subscribe({
    topic: '/h1/h1/d1/d1'
  })(MessageList);
  const dash = () => {
    props.history.push("/home");
  };

  const report = () => {
    props.history.push("/report");
  };

  useEffect(() => {
    let jsons={
      "Email":localStorage.getItem("email","")
    }
    axios
      .post(
        `http://159.65.146.25:5053/doctorLoginDashboard`, jsons
      )
      .then(res => {

        console.log("dashboard",res)
        if (res && res.data && res.data.status=="true") {
          setTotalHospitalCount(res.data.Total_hospital)
          setTotalPatientCount(res.data.total_patient)
          setHospitalList(res.data.result)


        }
      })
      .catch(e => console.log(e));
  });

  useEffect(()=>{
console.log(deviceId)
  })


  //******************************************** fetching device list ***********************************************
  useEffect(() => {
    axios
      .get(
        `http://159.65.146.25:5053/Device_master_select?hospital_Name=${hospitals}`
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
  //       `http://159.65.146.25:5053/Device_master_select?hospital_Name=${e.target.value}`
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
  //     .get("http://159.65.146.25:5053/Patient_master_select")
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
      .get("http://159.65.146.25:5053/hospital_master_list1")
      .then(res => {
        console.log(res.data.result);
        const hospitalData = res.data.result;
        // setHospitals(hospitalData);
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
  console.log("list111",hospitalList);
  console.log("list111",totalHospitalCount);
  console.log("list111",totalPatientCount);
  return (
    <DashStyled>
       <Connector mqttProps="ws://159.65.146.25:9001">
         
      <div>
      <subscribe></subscribe>
        {/* Header */}
        <div id="wrapper">
          {props.isOpen && <SideBar></SideBar>}
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <AppBar Open={props.Open}></AppBar>
              {/* Header */}
              <div className="container">
              
              <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="page-hadding">
            <h2>Dashboard</h2>
            <h3>Monitoring </h3>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-12">
          <div class="info-card box-bg-color">
            <div class="box-1 line-spc">
              <img src={require("./img/lifeline.svg")}/>
                <h2 class="box-title">Hospitals</h2>
            </div>
            <div class="box-1">
  <h3 class="number-title">{totalHospitalCount}</h3>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-12">
          <div class="info-card box-bg-color">
            <div class="box-1 line-spc">
              <img src={require("./img/dropper.svg")}/>
                <h2 class="box-title">Patients</h2>
            </div>
            <div class="box-1">
  <h3 class="number-title">{totalPatientCount}</h3>
            </div>
          </div>
        </div>
      {/* <div class="col-sm-6 col-md-3 col-12">
          <div class="info-card box-bg-color">
            <div class="box-1 line-spc">
              <img src={require("./img/doctor_new.svg")}/>
                <h2 class="box-title">Doctors</h2>
            </div>
            <div class="box-1">
              <h3 class="number-title">50,000</h3>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-12">
          <div class="info-card box-bg-color">
            <div class="box-1 line-spc">
              <img src={require("./img/hospital_new.svg")}/>
                <h2 class="box-title">Hospitals</h2>
            </div>
            <div class="box-1">
              <h3 class="number-title">50,000</h3>
            </div>
          </div> 
        </div> 
       */}
      
      
      
      
      </div> 
               

      <div class="new-container">
  <div class="container">
    <div class="row">

      { Array.isArray(hospitalList) && hospitalList.map((item,i)=>{

    return(
      <div class="col-12 col-sm-12 col-md-6">
      <div class="new-box box-bg-color">
        <div class="up-side-box">
    <h2 class="text-hd">{item.hospital_name}</h2>
          <h2 class="text-hd">{'Pateints :'+item.patient_count}</h2>
        </div>
        <div class="new-box-add">


        {Array.isArray(item.patient_Details) && item.patient_Details.map((innerItem,j)=>{


return(

<div class="new-box-card innr-card-bg-color border-card">

<div class="card-hading-box border-bottomm">
  <h2 class="text-hading">Patient 1</h2>
  <img src={require("./img/eye.svg")}/>
</div>

<div class="innr-new-card-wrap">
  <div class="innr-new-box-card">
    <h2 class="innr-text-hd">03</h2>
    <h3 class="innr-info-text-hd">HR (bpm)</h3>
  </div>
   <div class="innr-new-box-card">
    <h2 class="innr-text-hd">03</h2>
    <h3 class="innr-info-text-hd">HR (bpm)</h3>
  </div>
   <div class="innr-new-box-card">
    <h2 class="innr-text-hd">03</h2>
    <h3 class="innr-info-text-hd">HR (bpm)</h3>
  </div>

</div>
</div>



);
        })}
          







        </div>
      </div>
    </div>





    );

      })}
     
            {/* <div class="col-12 col-sm-12 col-md-6">
        <div class="new-box box-bg-color">
          <div class="up-side-box">
            <h2 class="text-hd">Hospital 1</h2>
            <h2 class="text-hd">Pateints : 08</h2>
          </div>
          <div class="new-box-add">



            <div class="new-box-card innr-card-bg-color border-card">

              <div class="card-hading-box border-bottomm">
                <h2 class="text-hading">Patient 1</h2>
                <img src={require("./img/eye.svg")}/>
              </div>

              <div class="innr-new-card-wrap">
                <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>

            </div>
            </div>



            <div class="new-box-card innr-card-bg-color border-card">

              <div class="card-hading-box border-bottomm">
                <h2 class="text-hading">Patient 1</h2>
                <img src={require("./img/eye.svg")}/>
              </div>

              <div class="innr-new-card-wrap">
                <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>

            </div>
            </div>





            <div class="new-box-card innr-card-bg-color border-card">

              <div class="card-hading-box border-bottomm">
                <h2 class="text-hading">Patient 1</h2>
                <img src={require("./img/eye.svg")}/>
              </div>

              <div class="innr-new-card-wrap">
                <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>

            </div>
            </div>





            <div class="new-box-card innr-card-bg-color border-card">

              <div class="card-hading-box border-bottomm">
                <h2 class="text-hading">Patient 1</h2>
                <img src={require("./img/eye.svg")}/>
              </div>

              <div class="innr-new-card-wrap">
                <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>

            </div>
            </div>



            <div class="new-box-card innr-card-bg-color border-card">

              <div class="card-hading-box border-bottomm">
                <h2 class="text-hading">Patient 1</h2>
                <img src={require("./img/eye.svg")}/>
              </div>

              <div class="innr-new-card-wrap">
                <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>

            </div>
            </div>

            <div class="new-box-card innr-card-bg-color border-card">

              <div class="card-hading-box border-bottomm">
                <h2 class="text-hading">Patient 1</h2>
                <img src={require("./img/eye.svg")}/>
              </div>

              <div class="innr-new-card-wrap">
                <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>
                 <div class="innr-new-box-card">
                  <h2 class="innr-text-hd">03</h2>
                  <h3 class="innr-info-text-hd">HR (bpm)</h3>
                </div>

            </div>
            </div>




          </div>
        </div>
      </div>
 */}

      
    </div>
  </div>



</div>
               
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
      </div>
      </Connector>
    </DashStyled>
  );
};

export default Home;
