import React from 'react';
import axios from 'axios';
export default class Login extends React.Component{
    render() {
      return (
        <div>
          <div className="main-container">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
                    <a className="navbar-brand" href="#">E-learning</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse e-navbar" id="navbarResponsive">
                      <div className="main">
                        <div className="form-group has-search">
                          <span className="fa fa-search form-control-feedback" />
                          <input type="text" className="form-control" placeholder="Search" />
                        </div>
                      </div>
                      {/* <div class="e-tool">
                              <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>
                              <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>
                          </div> */}
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <a className="nav-link" href="#"><i className="fas fa-shopping-cart" /></a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">login</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">sign up</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-container">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="banner-hadding">
                    <h2>Learn on your schedule</h2>
                    <p>
                      Anywhere, anytime. Enjoy risk-free with our 30-day, money-back guarantee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-container">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="body-headding">
                    <h2>Students are viewing</h2>
                  </div>
                </div>
                <section id="tabs">
                  <div className="col-xs-12 ">
                    <nav>
                      <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">development</a>
                        <span className="active line-bt" />
                        {/* <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"></a>
                          <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"></a>
                          <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false"></a> */}
                      </div>
                    </nav>
                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-sm-3 col-md-3">
                              <div className="card">
                                <img className="card-img-top" src={require("./image/course.jpg")} alt="Card image cap" />
                                <div className="card-body">
                                  <h5 className="card-title">Fundamentals of Analyzing Real Estate Investments</h5>
                                  <p className="card-text">Jose Portilla</p>
                                  <div className="card-footerr">
                                    <h2><i className="fas fa-rupee-sign" /> 468</h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3 col-md-3">
                              <div className="card">
                                <img className="card-img-top" src={require("./image/course.jpg")}  alt="Card image cap" />
                                <div className="card-body">
                                  <h5 className="card-title">Fundamentals of Analyzing Real Estate Investments</h5>
                                  <p className="card-text">Jose Portilla</p>
                                  <div className="card-footerr">
                                    <h2><i className="fas fa-rupee-sign" /> 468</h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3 col-md-3">
                              <div className="card">
                                <img className="card-img-top" src={require("./image/course.jpg")} alt="Card image cap" />
                                <div className="card-body">
                                  <h5 className="card-title">Fundamentals of Analyzing Real Estate Investments</h5>
                                  <p className="card-text">Jose Portilla</p>
                                  <div className="card-footerr">
                                    <h2><i className="fas fa-rupee-sign" /> 468</h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3 col-md-3">
                              <div className="card">
                                <img className="card-img-top" src={require("./image/course.jpg")} alt="Card image cap" />
                                <div className="card-body">
                                  <h5 className="card-title">Fundamentals of Analyzing Real Estate Investments</h5>
                                  <p className="card-text">Jose Portilla</p>
                                  <div className="card-footerr">
                                    <h2><i className="fas fa-rupee-sign" /> 468</h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
                      </div>
                      <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
                      </div>
                      <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                        Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="footer-container">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <div className="wrp-box">
                    <h2>e-learning</h2>
                    <h3> Copyright © 2019 e-learning</h3>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6">
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };