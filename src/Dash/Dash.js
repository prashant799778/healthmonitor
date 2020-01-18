import React from "react";

class Dash extends React.Component {
  dash = () => {
    this.props.history.push("/home");
  };
  user = () => {
    this.props.history.push("/user");
  };
  drf = () => {
    this.props.history.push("/drf");
  };
  role = () => {
    this.props.history.push("/role");
  };
  report = () => {
    this.props.history.push("/report");
  };
  render() {
    if (
      localStorage.getItem("login", "no") === "yes" &&
      localStorage.getItem("usertype", "") !== "ADMIN"
    ) {
      this.props.history.push("/drfs");
    } else if (localStorage.getItem("login", "no") !== "yes") {
      this.props.history.push("/");
    }
    return (
      <div>
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            {/* Sidebar - Brand */}
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
            >
              <div className="sidebar-brand-icon">
                <img src="img/oyo-rooms.svg" />
              </div>
              <div className="sidebar-brand-text mx-3">
                <img src="img/oyo-text.svg" />
              </div>
            </a>
            {/* Divider */}
            {/* Nav Item - Dashboard */}
            {/* <li className="nav-item active" onClick={()=>{this.dash()}}>
                <span className="nav-link" >
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span className="left-menu">Dashboard</span></span>
              </li> */}
            <li
              className="nav-item active"
              onClick={() => {
                this.user();
              }}
            >
              <span className="nav-link">
                <i className="far fa-user" />
                <span className="left-menu">User</span>
              </span>
            </li>
            <li
              className="nav-item active"
              onClick={() => {
                this.drf();
              }}
            >
              <span className="nav-link">
                <i className="far fa-user" />
                <span className="left-menu">DRF</span>
              </span>
            </li>
            <li
              className="nav-item active"
              onClick={() => {
                this.role();
              }}
            >
              <span className="nav-link">
                <i className="far fa-user" />
                <span className="left-menu">Role Master</span>
              </span>
            </li>
            <li
              className="nav-item active"
              onClick={() => {
                this.report();
              }}
            >
              <span className="nav-link">
                <i className="far fa-user" />
                <span className="left-menu">Report</span>
              </span>
            </li>
            <template />
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline dwn-btn">
              <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
          </ul>
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top ">
                {/* Sidebar Toggle (Topbar) */}
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3 up-btn"
                >
                  <i className="fa fa-bars" />
                </button>
                {/* Topbar Search */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  {/*  <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div> */}
                </form>
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - Search Dropdown (Visible Only XS) */}
                  <li>
                    {" "}
                    <div className="search-box">
                      <span>
                        <i className="fa fa-search" aria-hidden="true" />
                      </span>
                      <input
                        className="innr-inpt"
                        type="text"
                        name
                        placeholder="search"
                      />
                    </div>
                  </li>
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw" />
                    </a>
                    {/* Dropdown - Messages */}
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  {/* Nav Item - Alerts */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="alertsDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-bell fa-fw" />
                      {/* Counter - Alerts *
                      <span className="badge badge-danger badge-counter">3+</span> */}
                    </a>
                    {/* Dropdown - Alerts */}
                    {/* <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">
                          Alerts Center
                        </h6>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                          <div className="mr-3">
                            <div className="icon-circle bg-primary">
                              <i className="fas fa-file-alt text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="small text-gray-500">December 12, 2019</div>
                            <span className="font-weight-bold">A new monthly report is ready to download!</span>
                          </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                          <div className="mr-3">
                            <div className="icon-circle bg-success">
                              <i className="fas fa-donate text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="small text-gray-500">December 7, 2019</div>
                            $290.29 has been deposited into your account!
                          </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                          <div className="mr-3">
                            <div className="icon-circle bg-warning">
                              <i className="fas fa-exclamation-triangle text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="small text-gray-500">December 2, 2019</div>
                            Spending Alert: We've noticed unusually high spending for your account.
                          </div>
                        </a>
                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                      </div>
                    */}
                  </li>
                  {/* Nav Item - Messages */}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="messagesDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-envelope fa-fw" />
                      {/* Counter - Messages */}
                      <span className="badge badge-danger badge-counter">
                        7
                      </span>
                    </a>
                    {/* Dropdown - Messages */}
                    <div
                      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="messagesDropdown"
                    >
                      <h6 className="dropdown-header">Message Center</h6>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
                            alt=""
                          />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">
                            Hi there! I am wondering if you can help me with a
                            problem I've been having.
                          </div>
                          <div className="small text-gray-500">
                            Emily Fowler · 58m
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/AU4VPcFN4LE/60x60"
                            alt=""
                          />
                          <div className="status-indicator" />
                        </div>
                        <div>
                          <div className="text-truncate">
                            I have the photos that you ordered last month, how
                            would you like them sent to you?
                          </div>
                          <div className="small text-gray-500">
                            Jae Chun · 1d
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/CS2uCrpNzJY/60x60"
                            alt=""
                          />
                          <div className="status-indicator bg-warning" />
                        </div>
                        <div>
                          <div className="text-truncate">
                            Last month's report looks great, I am very happy
                            with the progress so far, keep up the good work!
                          </div>
                          <div className="small text-gray-500">
                            Morgan Alvarez · 2d
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="dropdown-list-image mr-3">
                          <img
                            className="rounded-circle"
                            src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                            alt=""
                          />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div>
                          <div className="text-truncate">
                            Am I a good boy? The reason I ask is because someone
                            told me that people say this to all dogs, even if
                            they aren't good...
                          </div>
                          <div className="small text-gray-500">
                            Chicken the Dog · 2w
                          </div>
                        </div>
                      </a>
                      <a
                        className="dropdown-item text-center small text-gray-500"
                        href="#"
                      >
                        Read More Messages
                      </a>
                    </div>
                  </li>
                  <div className="topbar-divider d-none d-sm-block" />
                  {/* Nav Item - User Information */}
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <span className="mr-2 d-none d-lg-inline text-gray-600 small sp-c">Admin</span> */}
                      <img
                        className="img-profile rounded-circle"
                        src="img/logo.PNG"
                      />
                    </a>
                    {/* Dropdown - User Information */}
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      {/* <a className="dropdown-item" href="#">
                          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                          Profile
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                          Settings
                        </a>
                        <a className="dropdown-item" href="#">
                          <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                          Activity Log
                        </a> */}
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
                  </div> */}
                {/* Content Row */}
                <div className="row">
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-black text-uppercase mb-1">
                              Upcomming Exam
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-black">
                              14
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="far fa-edit text-red fa-2x" />
                          </div>
                        </div>
                      </div>
                      {/*  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="mb-0 text-red"> <i class="far fa-edit"></i></div>
                        <div class="text-xs font-weight-bold text-red text-uppercase mb-1">Upcomming Exam</div>
                        
                      </div>
                      <div class="h5 col-auto font-weight-bold text-red">
                       40
                      </div>
                    </div>
                  </div> */}
                    </div>
                  </div>
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3  col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-black text-uppercase mb-1">
                              Due Fees
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-black">
                              $14,00
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="far fa-money-bill-alt text-red1 fa-2x" />
                          </div>
                        </div>
                      </div>
                      {/* <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="mb-0  text-red"><i class="far fa-money-bill-alt"></i></div>
                        <div class="text-xs font-weight-bold text-red text-uppercase mb-1">Due Fees</div>
                      </div>
                      <div class="h5 col-auto font-weight-bold text-red">
                        $215,000
                      </div>
                    </div>
                  </div> */}
                    </div>
                  </div>
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-black text-uppercase mb-1">
                              Event
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-black">
                              14
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="far fa-flag text-red2 fa-2x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Pending Requests Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-black text-uppercase mb-1">
                              Pending Requests
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-black">
                              14
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="far fa-folder text-red3 fa-2x" />
                          </div>
                        </div>
                      </div>
                      {/*   <div class="card-body">
  
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="mb-0 text-red"><i class="far fa-folder"></i></div>
                        <div class="text-xs font-weight-bold text-red text-uppercase mb-1">Pending Requests</div>  
                      </div>
                      <div class="h5 col-auto font-weight-bold text-red">
                        10
                      </div>
                    </div>
                  </div> */}
                    </div>
                  </div>
                </div>
                {/* Content Row */}
                <template />
                <template />
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex justify-content-between">
                        <h6 className="m-0 text-black">User Data</h6>
                        <div className="icon-bx">
                          <ul>
                            <li>
                              <a href="#">view all</a>
                            </li>
                            <li>
                              <i className="fas fa-chevron-down" />
                            </li>
                            <li>
                              <i className="fas fa-sync" />
                            </li>
                            <li>
                              <i className="fas fa-times" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive sort">
                          <table
                            className="table table-bordered innr-table"
                            id="dataTable"
                            width="100%"
                            cellSpacing={0}
                          >
                            <thead>
                              <tr>
                                <th className="dlc">
                                  <input type="checkbox" name />
                                </th>
                                <th>owners Name</th>
                                <th>contract period</th>
                                <th>srns</th>
                                <th>location</th>
                                <th>assumed repar</th>
                                <th>approving authority</th>
                                <th>status</th>
                                <th className="dlt">action</th>
                              </tr>
                            </thead>
                            <tfoot>
                              <tr>
                                <th className="dlc">
                                  <input type="checkbox" name />
                                </th>
                                <th>owners Name</th>
                                <th>contract period</th>
                                <th>srns</th>
                                <th>location</th>
                                <th>assumed repar</th>
                                <th>approving authority</th>
                                <th>status</th>
                                <th className="dlt">action</th>
                              </tr>
                            </tfoot>
                            <tbody>
                              <tr>
                                <td>
                                  <input type="checkbox" name />
                                </td>
                                <td>Vivian</td>
                                <td>Financial</td>
                                <td>San </td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>
                                  <div className="action-bx">
                                    <ul>
                                      <li>
                                        <i className="far fa-eye" />
                                      </li>
                                      <li>
                                        <i className="far fa-edit" />
                                      </li>
                                      <li>
                                        <i className="far fa-trash-alt" />
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="checkbox" name />
                                </td>
                                <td>Vivian</td>
                                <td>Financial</td>
                                <td>San </td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>
                                  <div className="action-bx">
                                    <ul>
                                      <li>
                                        <i className="far fa-eye" />
                                      </li>
                                      <li>
                                        <i className="far fa-edit" />
                                      </li>
                                      <li>
                                        <i className="far fa-trash-alt" />
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="checkbox" name />
                                </td>
                                <td>Vivian</td>
                                <td>Financial</td>
                                <td>San </td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>
                                  <div className="action-bx">
                                    <ul>
                                      <li>
                                        <i className="far fa-eye" />
                                      </li>
                                      <li>
                                        <i className="far fa-edit" />
                                      </li>
                                      <li>
                                        <i className="far fa-trash-alt" />
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="checkbox" name />
                                </td>
                                <td>Timoth</td>
                                <td>Office Ma</td>
                                <td>London</td>
                                <td>37</td>
                                <td>2008/12/11</td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>
                                  <div className="action-bx">
                                    <ul>
                                      <li>
                                        <i className="far fa-eye" />
                                      </li>
                                      <li>
                                        <i className="far fa-edit" />
                                      </li>
                                      <li>
                                        <i className="far fa-trash-alt" />
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="checkbox" name />
                                </td>
                                <td>Jackson </td>
                                <td>Director</td>
                                <td>New York</td>
                                <td>65</td>
                                <td>2008/09/26</td>
                                <td>62</td>
                                <td>2009/02/14</td>
                                <td>
                                  <div className="action-bx">
                                    <ul>
                                      <li>
                                        <i className="far fa-eye" />
                                      </li>
                                      <li>
                                        <i className="far fa-edit" />
                                      </li>
                                      <li>
                                        <i className="far fa-trash-alt" />
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="sticky-footer bg-white">
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
                    this.props.history.push("/");
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
    );
  }
}

export default Dash;
