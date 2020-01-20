import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import Dash from "./Dash/Dash";
import User from "./User/User";
import HAdminUser   from "./HubAdmin/User"
import Nurse  from "./User/Nurse";
import HAdminNurse    from "./HubAdmin/Nurse"
import Operation  from "./User/Operation";
import HAdminOperation   from "./HubAdmin/Operation"
import HubAdmin  from "./User/HubAdmin";
import Drf from "./Drf/Drf";
import Mom from "./Drf/Mom";
import Drfs from "./Drfs/Drf";
import Login from "./Login/Login";
import Try from "./Login/Try";
import Role from "./Role/roles";
import Home from "./Report/home";
import HubAdminDash from "./Report/HubAdminDash";
import { Router, Route, Link } from "react-router-dom";
import history from "./History";
import Smart from "./Drf/Smart";
import DealStatus from "./dealStatus/dealStatus";
import spin from "../src/Drf/spinner.svg";
import NewDetail from "./Add_new/NewDetail";
import New2 from "./Add_new/new2";
import Hospital from './User/Hospital'
import HAdminHospital  from "./HubAdmin/Hospital"
import HospitalList from "./Report/hospitalList";
import PatientList from "./Report/patientList";
import Hub  from "./User/hub"
import Doctor  from "./User/doctor"
import HAdminDoctor  from "./HubAdmin/doctor"
import  UserDash  from "./Report/UserDashnew";
import   Operationdash  from "./Report/Operationdash";
import   Hubdash  from "./Report/HUbdash";
import  Uhospital from "./User/DHospital"
import  Upatient from "./User/DPatient"
import  Profile from "./User/Profile"
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      loading: true
    };
  }

  open = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <img src={spin} alt="" />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Router history={history}>
            <Route exact path="/" component={Login} />
           
           


 <Route
            path="/hubs"
              render={props => (
                <Hub isOpen={this.state.isOpen} Open={this.open} />
              )}    />
         

            <Route
              path="/user"
              render={props => (
                <User isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
            {/* <Route path='/status'
              render={(props) => (
                <DealStatus  isOpen={this.state.isOpen}  Open={this.open} />
              )}
              /> */}
<Route
            path="/hubadmin"
              render={props => (
                <HubAdmin isOpen={this.state.isOpen} Open={this.open} />
              )}    />

<Route
            path="/doctor"
              render={props => (
                <Doctor isOpen={this.state.isOpen} Open={this.open} />
              )}    />
              <Route
            path="/hdoctor"
              render={props => (
                <HAdminDoctor isOpen={this.state.isOpen} Open={this.open} />
              )}    />

<Route
            path="/profile"
              render={props => (
                <Profile isOpen={this.state.isOpen} Open={this.open} />
              )}    />

<Route
            path="/nurse"
              render={props => (
                <Nurse isOpen={this.state.isOpen} Open={this.open} />
              )}    />
              <Route
            path="/operation"
              render={props => (
                <Operation isOpen={this.state.isOpen} Open={this.open} />
              )}    />

<Route
            path="/hnurse"
              render={props => (
                <HAdminNurse isOpen={this.state.isOpen} Open={this.open} />
              )}    />
              <Route
            path="/hoperation"
              render={props => (
                <HAdminOperation isOpen={this.state.isOpen} Open={this.open} />
              )}    />
            <Route
              path="/drf"
              render={props => (
                <Drf isOpen={this.state.isOpen} Open={this.open} />
              )}
            />

            <Route
              path="/drfs"
              render={props => (
                <Drfs isOpen={this.state.isOpen} Open={this.open} />
              )}
            />

            <Route
              path="/role"
              render={props => (
                <Role isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
            <Route
              path="/dash"
              render={props => (
                <Home isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
            <Route
              path="/home"
              render={props => (
                <UserDash isOpen={this.state.isOpen} Open={this.open} />
              )}
            />

<Route
              path="/hubadmindash"
              render={props => (
                <HubAdminDash isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
             <Route
              path="/Odash"
              render={props => (
                <Operationdash isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
             <Route
              path="/hubdash"
              render={props => (
                <Hubdash isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
<Route
              path="/uhospital"
              render={props => (
                <Uhospital isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
            <Route
              path="/upatient"
              render={props => (
                <Upatient isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
            <Route
              path="/hospital"
              render={props => (
                <Hospital isOpen={this.state.isOpen} Open={this.open} />
              )}
            />

            <Route
              path="/patient"
              render={props => (
                <User isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
              <Route
              path="/hhospital"
              render={props => (
                <HAdminHospital isOpen={this.state.isOpen} Open={this.open} />
              )}
            />

            <Route
              path="/hpatient"
              render={props => (
                <HAdminUser isOpen={this.state.isOpen} Open={this.open} />
              )}
            />

            <Route
              path="/smart"
              render={props => (
                <Smart isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
            {/* <Route path='/add_new_fields'   render={(props) => (
                <NewDetail  isOpen={this.state.isOpen}  Open={this.open} />
              )}  /> */}
            <Route
              path="/add2"
              render={props => (
                <New2 isOpen={this.state.isOpen} Open={this.open} />
              )}
            />
          </Router>
        </div>
      );
    }
  }
}

// const App = () => {
//    const [timestamp, setTimestamp] = useState('no time stamp yet')
//   const [data, setData] = useState("");
//   const [connected, setConnected] = useState(false);

//   subscribeToTimer(1, (err, timestamp) => setTimestamp(timestamp));

//   useEffect(() => {
//     socket.on("new message", data => {
//       // this.setState({ data, connected: true })
//       setData(data);
//       setConnected(true);
//     });

//     socket.on("disconnect", () => {
//       // this.setState({ connected: false })
//       setConnected(false);
//     });

//     socket.on("reconnect", () => {
//       // this.setState({ connected: true })
//       setConnected(true);
//     });
//   });

//   return (
//     <div className="App">
//       {/* <p className="App-intro"> */}
//       <h1>{data}</h1>
//       <p>This is the timer value: {timestamp}</p>
//       {/* </p> */}
//     </div>
//   );
// };

export default App;
