
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PatientDetail {

    @SerializedName("PatientId")
    @Expose
    private Integer patientId;

    @SerializedName("PatientName")
    @Expose
    private String patientName;

    @SerializedName("heartRate")
    @Expose
    private String heartRate;

    @SerializedName("Resp Rate")
    @Expose
    private Integer respRate;

    public Integer getRespRate() {
        return respRate;
    }

    public void setRespRate(Integer respRate) {
        this.respRate = respRate;
    }

    public Integer getCuff() {
        return cuff;
    }

    public void setCuff(Integer cuff) {
        this.cuff = cuff;
    }

    public String getHigh() {
        return high;
    }

    public void setHigh(String high) {
        this.high = high;
    }

    public String getLow() {
        return low;
    }

    public void setLow(String low) {
        this.low = low;
    }

    public String getMean() {
        return mean;
    }

    public void setMean(String mean) {
        this.mean = mean;
    }

    public Integer getsPO2() {
        return sPO2;
    }

    public void setsPO2(Integer sPO2) {
        this.sPO2 = sPO2;
    }

    public Integer getPulseRate() {
        return pulseRate;
    }

    public void setPulseRate(Integer pulseRate) {
        this.pulseRate = pulseRate;
    }

    @SerializedName("Cuff")
    @Expose
    private Integer cuff;
    @SerializedName("High")
    @Expose
    private String high;
    @SerializedName("Low")
    @Expose
    private String low;
    @SerializedName("Mean")
    @Expose
    private String mean;

    @SerializedName("SPO2")
    @Expose
    private Integer sPO2;
    @SerializedName("Pulse Rate")
    @Expose
    private Integer pulseRate;





    public Integer getPatientId() {
        return patientId;
    }
    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }
    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(String heartRate) {
        this.heartRate = heartRate;
    }
}
