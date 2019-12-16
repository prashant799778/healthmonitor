import React, { useState, useEffect } from "react";
// import { subscribeToTimer } from "./api";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3015');

// import logo from "./logo.svg";
// import "./App.css";
// import Dash from "./Dash/Dash";
// import User from "./User/User";
// import Drf from "./Drf/Drf";
// import Mom from "./Drf/Mom";
// import Drfs from "./Drfs/Drf";
// import Login from "./Login/Login";
// import Try from "./Login/Try";
// import Role from "./Role/roles";
// import Home from "./Report/home";
// import { Router, Route, Link } from "react-router-dom";
// import history from "./History";
// import Smart from "./Drf/Smart";
// import DealStatus from "./dealStatus/dealStatus";
// import spin from "../src/Drf/spinner.svg";
// import NewDetail from "./Add_new/NewDetail";
// import New2 from "./Add_new/new2";


// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isOpen: true,
//       loading: true
//     };
//   }

//   open = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };
//   componentDidMount() {
//     this.setState({ loading: false });
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <div>
//           <img src={spin} alt="" />
//         </div>
//       );
//     } else {
//       return (
//         <div className="App">
//           <Router history={history}>
//             <Route exact path="/" component={Login} />
//             <Route path="/home" component={Dash} />

//             <Route
//               path="/user"
//               render={props => (
//                 <User isOpen={this.state.isOpen} Open={this.open} />
//               )}
//             />
//             {/* <Route path='/status'
//               render={(props) => (
//                 <DealStatus  isOpen={this.state.isOpen}  Open={this.open} />
//               )} 
//               /> */}
//             <Route
//               path="/drf"
//               render={props => (
//                 <Drf isOpen={this.state.isOpen} Open={this.open} />
//               )}
//             />

//             <Route
//               path="/drfs"
//               render={props => (
//                 <Drfs isOpen={this.state.isOpen} Open={this.open} />
//               )}
//             />

//             <Route
//               path="/role"
//               render={props => (
//                 <Role isOpen={this.state.isOpen} Open={this.open} />
//               )}
//             />
//             <Route
//               path="/dash"
//               render={props => (
//                 <Home isOpen={this.state.isOpen} Open={this.open} />
//               )}
//             />
//             <Route
//               path="/smart"
//               render={props => (
//                 <Smart isOpen={this.state.isOpen} Open={this.open} />
//               )}
//             />
//             {/* <Route path='/add_new_fields'   render={(props) => (
//                 <NewDetail  isOpen={this.state.isOpen}  Open={this.open} />
//               )}  /> */}
//             <Route
//               path="/add2"
//               render={props => (
//                 <New2 isOpen={this.state.isOpen} Open={this.open} />
//               )}
//             />
//           </Router>
//         </div>
//       );
//     }
//   }
// }

const App=()=>{
//  const [timestamp, setTimestamp] = useState('no time stamp yet')
 const [data, setData]= useState('')
 const [connected, setConnected]= useState(false)

  // subscribeToTimer(1,(err, timestamp)=>setTimestamp(timestamp))
  
  // componentWillMount() {
  //   const socket = io(uri)
  
  //   socket.on('update', (data) => {
  //     // this.setState({ data, connected: true })
  //     setData(data)
  //     setConnected(true)
  //   });
  
  //   socket.on('disconnect', () => {
  //     // this.setState({ connected: false })
  //     setConnected(false)

  //   });
  
  //   socket.on('reconnect', () => {
  //     // this.setState({ connected: true })
  //     setConnected(true)
  //   });
  // }
  // const socket = io(uri)
  useEffect(()=>{
    socket.on('new message', (data) => {
      // this.setState({ data, connected: true })
      setData(data)
      setConnected(true)
    });
  
    socket.on('disconnect', () => {
      // this.setState({ connected: false })
      setConnected(false)

    });
  
    socket.on('reconnect', () => {
      // this.setState({ connected: true })
      setConnected(true)

    });
  })

  return (
    <div className="App">
      {/* <p className="App-intro"> */}
        <h1>{data}</h1>
      {/* This is the timer value: {timestamp} */}
      {/* </p> */}
    </div>
  );

}

export default App;
