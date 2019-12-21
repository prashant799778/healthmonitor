import React from "react";

const PatientId3 =()=>{
    return(
        <div className="col-sm-12 col-md-6">
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
        </div>
    )
}
export default PatientId3