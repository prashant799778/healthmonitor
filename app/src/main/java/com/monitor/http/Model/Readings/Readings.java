
package com.monitor.http.Model.Readings;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.monitor.http.Model.Spo2;
import com.monitor.http.Model.Temperature;

public class Readings {

    @SerializedName("PatientId")
    @Expose
    private String patientId;
    @SerializedName("RESP")
    @Expose
    private String rESP;
    @SerializedName("ECG")
    @Expose
    private ECG eCG;
    @SerializedName("SPO2")
    @Expose
    private SPO2 sPO2;
    @SerializedName("NIBP")
    @Expose
    private NIBP nIBP;
    @SerializedName("TEMP")
    @Expose
    private String tEMP;
    @SerializedName("usercreate")
    @Expose
    private String usercreate;
    @SerializedName("heartRate")
    @Expose
    private HeartRate heartRate;
    @SerializedName("spo2")
    @Expose
    private Spo2 spo2;
    @SerializedName("pulseRate")
    @Expose
    private PulseRate pulseRate;
    @SerializedName("highPressure")
    @Expose
    private HighPressure highPressure;
    @SerializedName("lowPressure")
    @Expose
    private LowPressure lowPressure;
    @SerializedName("temperature")
    @Expose
    private Temperature temperature;
    @SerializedName("Pulse Rate1")
    @Expose
    private String pulseRate1;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getRESP() {
        return rESP;
    }

    public void setRESP(String rESP) {
        this.rESP = rESP;
    }

    public ECG getECG() {
        return eCG;
    }

    public void setECG(ECG eCG) {
        this.eCG = eCG;
    }

    public SPO2 getSPO2() {
        return sPO2;
    }

    public void setSPO2(SPO2 sPO2) {
        this.sPO2 = sPO2;
    }

    public NIBP getNIBP() {
        return nIBP;
    }

    public void setNIBP(NIBP nIBP) {
        this.nIBP = nIBP;
    }

    public String getTEMP() {
        return tEMP;
    }

    public void setTEMP(String tEMP) {
        this.tEMP = tEMP;
    }

    public String getUsercreate() {
        return usercreate;
    }

    public void setUsercreate(String usercreate) {
        this.usercreate = usercreate;
    }

    public HeartRate getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(HeartRate heartRate) {
        this.heartRate = heartRate;
    }

    public Spo2 getSpo2() {
        return spo2;
    }

    public void setSpo2(Spo2 spo2) {
        this.spo2 = spo2;
    }

    public PulseRate getPulseRate() {
        return pulseRate;
    }

    public void setPulseRate(PulseRate pulseRate) {
        this.pulseRate = pulseRate;
    }

    public HighPressure getHighPressure() {
        return highPressure;
    }

    public void setHighPressure(HighPressure highPressure) {
        this.highPressure = highPressure;
    }

    public LowPressure getLowPressure() {
        return lowPressure;
    }

    public void setLowPressure(LowPressure lowPressure) {
        this.lowPressure = lowPressure;
    }

    public Temperature getTemperature() {
        return temperature;
    }

    public void setTemperature(Temperature temperature) {
        this.temperature = temperature;
    }

    public String getPulseRate1() {
        return pulseRate1;
    }

    public void setPulseRate1(String pulseRate1) {
        this.pulseRate1 = pulseRate1;
    }

}
