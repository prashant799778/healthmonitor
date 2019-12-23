
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ECG {

    @SerializedName("Heart Rate")
    @Expose
    private Integer heartRate;
    @SerializedName("Resp Rate")
    @Expose
    private Integer respRate;

    public Integer getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public Integer getRespRate() {
        return respRate;
    }

    public void setRespRate(Integer respRate) {
        this.respRate = respRate;
    }

}
