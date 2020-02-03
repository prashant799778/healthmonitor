
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ECG {

    @SerializedName("Heart Rate")
    @Expose
    private String heartRate;
    @SerializedName("Resp Rate")
    @Expose
    private String respRate;

    public String getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(String heartRate) {
        this.heartRate = heartRate;
    }

    public String getRespRate() {
        return respRate;
    }

    public void setRespRate(String respRate) {
        this.respRate = respRate;
    }

}
