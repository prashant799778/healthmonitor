import React from "react";
import {DashStyled} from "./DashStyled";
import AppBar from "../AppBar/AppBar";
import SideBar from "../AppBar/Sidebar/SideBar";

const PatientList=(props)=>{

    return(
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
                      {/* <select
                        className="custom-select mr-sm-2 fil-select"
                        onChange={selectType}
                      >
                        <option>Device</option>
                        <option>Patient</option>
                      </select> */}
                    </div>
                  </div>
                  {/* Dashboard */}

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
      </DashStyled>
    )
}
export default PatientList
