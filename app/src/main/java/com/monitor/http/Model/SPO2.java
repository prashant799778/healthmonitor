
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SPO2 {

    @SerializedName("SPO2")
    @Expose
    private Integer sPO2;
    @SerializedName("Pulse Rate")
    @Expose
    private Integer pulseRate;

    public Integer getSPO2() {
        return sPO2;
    }

    public void setSPO2(Integer sPO2) {
        this.sPO2 = sPO2;
    }

    public Integer getPulseRate() {
        return pulseRate;
    }

    public void setPulseRate(Integer pulseRate) {
        this.pulseRate = pulseRate;
    }

}
