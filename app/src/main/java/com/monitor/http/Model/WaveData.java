
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class WaveData {

    @SerializedName("Ecg")
    @Expose
    private String ecg;
    @SerializedName("Spo2")
    @Expose
    private String spo2;
    @SerializedName("Resp")
    @Expose
    private String resp;

    public String getEcg() {
        return ecg;
    }

    public void setEcg(String ecg) {
        this.ecg = ecg;
    }

    public String getSpo2() {
        return spo2;
    }

    public void setSpo2(String spo2) {
        this.spo2 = spo2;
    }

    public String getResp() {
        return resp;
    }

    public void setResp(String resp) {
        this.resp = resp;
    }

}
