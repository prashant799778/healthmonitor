import React from "react";
import axios from "axios";
import { LoginStyled } from "./LoginStyled";
import backImg from "./image/backimg.png"

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      name: "",
      otp: "",
      newOtp: "",
      pass: "",
      err: "",
      loginuser: true,
      newuser: false,
      resetuser: false,
      entercode: false,
      codefound: false,
      emailF: "",
      emailF1: "",
      error1: "",
      newpass: "",
      newcnfpass: ""
    };
  }

  loginHandler = e => {
    e.preventDefault();
    // this.callapi();
    let api = `http://159.65.146.25:5053/login?name=${this.state.name}&password=${this.state.pass}`;
    axios
      .get(api)
      .then(response => {
        if (response) {
          if (response && response.data && response.data.status   && response.data.status === "true") {
            let res = response.data.result;

            localStorage.setItem("login", "yes");
            localStorage.setItem("user_type", res.Usertype);
            localStorage.setItem("user_id", res.UserID);
            localStorage.setItem("user_type_id", res.Usertype_Id);
            localStorage.setItem("user", res.name);
            localStorage.setItem("user", res.name);
            localStorage.setItem("email", res.Email);
            console.log("login",response)
            this.setState({ isLogin: true, err: "" }, () => {
              if (res.Usertype === "admin") {
                this.props.history.push("/dash");
              } else {
                this.props.history.push("/home");
              }
            });
          } else {
            this.setState({
              isLogin: false,
              err: "username or password is wrong!"
            });
          }
        }
      })
      .catch(error => {
        // handle error
        this.setState({ isLogin: false, err: "connection error!" });
      });
  };

  handleChange = e => {};

  resetPassword = e => {
    e.preventDefault();
    this.setState({
      loginuser: false,
      newuser: false,
      resetuser: true,
      err: "",
      name: "",
      pass: ""
    });
  };
  newUser = () => {
    this.setState({
      loginuser: false,
      newuser: true,
      resetuser: false,
      err: ""
    });
  };
  oldUser = () => {
    this.setState({
      loginuser: true,
      newuser: false,
      resetuser: false,
      entercode: false,
      codefound: false,
      err: ""
    });
  };
  codeRequest = e => {
    e.preventDefault();

    this.setState({ loginuser: false });
    if (this.state.emailF !== "") {
      var secret = this.state.emailF.split("@");
      let secret1 = secret[0].length;
      var secret2 = secret[1];
      var a = secret[0][0];
      let asd = "*" * 5;
      for (var i = 0; i < secret[0].length - 2; i++) {
        a = a + "*";
      }
      a = a + secret[0][secret1 - 1];

      let newE = [a, secret2];
      let newE1 = newE.join("@");
      this.setState({ emailF1: newE1 });
    }

    // var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    axios
      .get("http://134.209.153.34:5004/generateOTP?email=" + this.state.emailF)
      .then(response => {
        if (
          response.data.status === "true" &&
          response.data.result !== "Invalid email"
        ) {
          this.setState({
            otp: response.data.result["OTP"],
            entercode: true,
            resetuser: false,
            err: ""
          });
        } else if (
          response.data.status !== "true" &&
          response.data.result === "Invalid email"
        ) {
          this.setState({ err: "Email is not found,Please check" });
        }
      })
      .catch(err => {
        this.setState({ err: "Email is not found,Please check" });
      });
  };
  codeVerify = e => {
    e.preventDefault();

    if (this.state.otp === this.state.newOtp) {
      axios
        .get("http://134.209.153.34:5004/VerifyOTP?OTP=" + this.state.newOtp)
        .then(res => {
          if (res.data.result["status"] === "True") {
            this.setState({ codefound: true, entercode: false, err: "" });
          } else if (res.data["status"] === "false") {
            this.setState({ err: "Please, enter correct otp" });
          }
        });
    } else if (this.state.otp !== this.state.newOtp) {
      this.setState({ err: "Please, enter correct otp" });
    }
  };
  newPass = e => {
    e.preventDefault();

    if (this.state.newpass === this.state.newcnfpass) {
      let json = {};
      json["email"] = this.state.emailF;

      json["password"] = this.state.newpass;
      axios
        .post("http://134.209.153.34:5004/Updatepassword", json)
        .then(res => {
          if (
            res.data.status === "true" &&
            res.data.result === "Record Updated"
          ) {
            alert("Password updated successfully");
            this.setState({ loginuser: true, codefound: false, err: "" });
          } else {
            // alert("Something went wrong")
            this.setState({ err: "Something went wrong" });
          }
        })
        .catch(err => {});
    } else if (this.state.newpass !== this.state.newcnfpass) {
      this.setState({ err: "Password and confirm password did not match." });
    }
  };
  inputPass = e => {
    this.setState({ newpass: e.target.value });
  };
  inputCnfpass = e => {
    this.setState({ newcnfpass: e.target.value }, () => {
      if (this.state.newpass !== this.state.newcnfpass) {
        this.setState({ err: "Password Did not match" });
      } else if (this.state.newpass === this.state.newcnfpass) {
        this.setState({ err: "" });
      }
    });
  };
  // ''' http://159.65.146.25:5053/Login?name=Prashant&password=11233''
  // http://159.65.146.25:5053/Login?name=Prashant&password=11233
  callapi = () => {
    //  let api=" http://159.65.146.25:5053/Login?name="+this.state.name+"&password="+this.state.pass
    // let api = `http://159.65.146.25:5053/Login?name=${this.state.name}&password=${this.state.pass}`;
    // axios
    //   .get(api)
    //   .then(response => {
    //     if (response) {
    //       if (response && response.data && response.data.status === "True") {
    //         let res = response.data.result;
    //         localStorage.setItem("login", "yes");
    //         localStorage.setItem("usertype", res.usertype);
    //         localStorage.setItem("user", this.state.name);
    //         this.setState({ isLogin: true, err: "" }, () => {
    //           if (res.usertype === "ADMIN") {
    //             this.props.history.push("/user");
    //           } else {
    //             this.props.history.push("/drfs");
    //           }
    //         });
    //       } else {
    //         this.setState({
    //           isLogin: false,
    //           err: "username or password is wrong!"
    //         });
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     // handle error
    //     this.setState({ isLogin: false, err: "connection error!" });
    //   });
  };

  render() {
    if (
      localStorage.getItem("login", "no") === "yes" &&
      localStorage.getItem("usertype", "") === "admin"
    ) {
      this.props.history.push("/dash");
    } else if (localStorage.getItem("login", "no") === "yes") {
      this.props.history.push("/home");
    }
    return (
      <LoginStyled>
        <template>
        <div className="container">
          {/* Outer Row */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* Nested Row within Card Body */}
                  <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-login-image" />
                    <div className="col-lg-7">
                      {this.state.loginuser && (
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">
                              Welcome Back!
                            </h1>
                          </div>
                          <form
                            className="user forget aslog"
                            onSubmit={this.loginHandler}
                          >
                            <div className="form-group">
                              <input
                                required
                                onChange={e => {
                                  this.setState({ name: e.target.value });
                                }}
                                value={this.state.name}
                                type="text"
                                className="form-control form-control-user"
                                id="exampleInputEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter your email..."
                              />
                            </div>
                            <div className="form-group">
                              <input
                                onChange={e => {
                                  this.setState({ pass: e.target.value });
                                }}
                                value={this.state.pass}
                                type="password"
                                className="form-control form-control-user"
                                id="exampleInputPassword"
                                placeholder="Password"
                              />
                            </div>
                            <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <label
                                  style={{ color: "red" }}
                                  className=""
                                  htmlFor="customCheck"
                                >
                                  {this.state.err}
                                </label>
                              </div>
                            </div>
                            <button
                              // type="submit"
                              id="mySubmit"
                              className="btn btn-primary btn-user btn-block sbmtbtn"
                            >
                              Login
                            </button>
                          </form>
                          <hr />
                          <div className="text-center">
                            <button
                              className="small"
                              onClick={this.resetPassword}
                            >
                              Forgot Password?
                            </button>
                          </div>
                        </div>
                      )}
                      {/* New User */}
                      {/* {this.state.newuser && <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome </h1>
                      </div>
                      <form onSubmit={this.signupHandler} className="user forget">
                        <div className="form-group">
                          <input  required onChange={(e)=>{this.setState({name: e.target.value})}} type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter UserId..." />
                        </div>
                        <div className="form-group">
                          <input   required onChange={(e)=>{this.setState({pass: e.target.value})}} type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                        </div>
                        <div className="form-group">
                        
                      
                        </div>
                        <button type="submit" className="btn btn-primary btn-user btn-block" >
                          Signup
                        </button>
                      
                       
                      </form>
                      <hr />
                      <div className="text-center">
                        <button className="small" onClick={this.resetPassword} >Forgot Password?</button>
                      </div>
                      <div className="text-center">
                        <button className="small"onClick={this.oldUser} >Login here</button>
                      </div>
                    </div>} */}

                      {/* Forgot Password*/}
                      {this.state.resetuser && (
                        <div className="p-5">
                          <div className="forget-hd">
                            <h1 className="h4 text-gray-900 mb-4">
                              Forgot Password
                            </h1>
                            <p>
                              Need a new password? <br />
                              Enter your email below to continue.
                            </p>
                          </div>
                          <form className="user forget">
                            <div className="form-group">
                              <input
                                required
                                onChange={e => {
                                  this.setState(
                                    { emailF: e.target.value },
                                    () => {}
                                  );
                                }}
                                type="email"
                                className="form-control form-control-user"
                                id="exampleInputEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter your registered email"
                              />
                            </div>
                            <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <label
                                  style={{ color: "red" }}
                                  className=""
                                  htmlFor="customCheck"
                                >
                                  {this.state.err}
                                </label>
                              </div>
                            </div>

                            <div className="ext-spce"></div>
                            <div className="btn-forget-c">
                              <button
                                className="btn btn-primary btn-user next-cl"
                                onClick={this.oldUser}
                              >
                                Back To Sign In
                              </button>
                              <button
                                className="btn btn-primary btn-user next-cl"
                                onClick={this.codeRequest}
                              >
                                Next
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Code Verification*/}
                      {this.state.entercode && (
                        <div className="p-5">
                          <div className="forget-hd">
                            <h1 className="h4 text-gray-900 mb-4">
                              Code Verification
                            </h1>
                            <p>
                              A one-time code has been sent to{" "}
                              {this.state.emailF1}. Enter your code below to
                              continue.
                            </p>
                          </div>
                          <form
                            className="user forget"
                            onSubmit={this.codeVerify}
                          >
                            <div className="form-group">
                              <input
                                required
                                onChange={e => {
                                  this.setState(
                                    { newOtp: e.target.value },
                                    () => {}
                                  );
                                }}
                                className="form-control form-control-user"
                                id="exampleInputEmail"
                                aria-describedby="emailHelp"
                                placeholder="Please enter 6 digit one time password"
                              />
                            </div>
                            {/* <div className="form-group">
                          <input   onChange={(e)=>{this.setState({pass: e.target.value})}} type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                        </div> */}
                            <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <label
                                  style={{ color: "red" }}
                                  className=""
                                  htmlFor="customCheck"
                                >
                                  {this.state.err}
                                </label>
                              </div>
                            </div>
                            <div className="ext-spce"></div>
                            <div className="btn-forget-c">
                              <button
                                className="btn btn-primary btn-user next-cl"
                                onClick={this.oldUser}
                              >
                                Back To Sign In
                              </button>
                              <button  className="btn btn-primary btn-user next-cl">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* New Password*/}
                      {this.state.codefound && (
                        <div className="p-5">
                          <div className="forget-hd">
                            <h1 className="h4 text-gray-900 mb-4">
                              Enter your new password
                            </h1>
                            <p>
                              Enter your new password. We recommend one that you
                              haven’t previously used with this account.
                            </p>
                          </div>
                          <form className="user forget" onSubmit={this.newPass}>
                            <div className="form-group">
                              <input
                                required
                                onChange={this.inputPass}
                                type="password"
                                value={this.state.newpass}
                                className="form-control form-control-user"
                                id="exampleInputEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter your new password"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required
                                onChange={this.inputCnfpass}
                                type="password"
                                className="form-control form-control-user"
                                id="exampleInputPassword"
                                placeholder="Confirm your new password"
                              />
                            </div>
                            <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <label
                                  style={{ color: "red" }}
                                  className=""
                                  htmlFor="customCheck"
                                >
                                  {this.state.err}
                                </label>
                              </div>
                            </div>
                            <div className="ext-spce"></div>
                            <div className="btn-forget-c">
                              <button
                                className="btn btn-primary btn-user next-cl"
                                onClick={this.oldUser}
                              >
                                Back To Sign In
                              </button>
                              <button className="btn btn-primary btn-user next-cl">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </template>
        <div className="sign-container" style={{backgroundImage: 'url('+backImg+')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      
      }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="innr-container-sign">
                <div className="rwap-box">
                  <div className="in-box">
                    <h3 className="logo-title"><img src={require("./image/web_icon.png")}></img></h3>
                    <h2 className="upper-title">sign in</h2>
                    <div className="form-container">
                      <div className="form-group">
                        <input  onChange={e => {
                                  this.setState({ name: e.target.value });
                                }}
                                value={this.state.name} type="text" className="form-control" placeholder="username" />
                      </div>
                      <div className="form-group">
                        <input onChange={e => {
                                  this.setState({ pass: e.target.value });
                                }}
                                value={this.state.pass} type="password" className="form-control" placeholder="password" />
                      </div>

                              <font color="red">{this.state.err}</font>
                      <div className="check-info">
                        <div className="chiller_cb">
                          <input id="myCheckbox1" type="checkbox" />
                          <label htmlFor="myCheckbox1">Remember me</label>
                          <span />
                        </div>

                      </div>
                      <button   onClick={this.loginHandler} type="button" className="btn btn-cust btn-lg btn-block">log In</button>
                      <div className="forget-pass">
                      <img src={require("./image/padlock.svg")}/><span>forget your password ?</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </LoginStyled>
    );
  }
}

export default Login;
