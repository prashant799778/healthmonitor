
package com.monitor.http.Model.Readings;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SPO2 {

    @SerializedName("SPO2")
    @Expose
    private String sPO2;
    @SerializedName("Pulse Rate1")
    @Expose
    private String pulseRate1;

    public String getSPO2() {
        return sPO2;
    }

    public void setSPO2(String sPO2) {
        this.sPO2 = sPO2;
    }

    public String getPulseRate1() {
        return pulseRate1;
    }

    public void setPulseRate1(String pulseRate1) {
        this.pulseRate1 = pulseRate1;
    }

}
