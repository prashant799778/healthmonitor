
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

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
    private Double tEMP;
    @SerializedName("usercreate")
    @Expose
    private String usercreate;

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

    public Double getTEMP() {
        return tEMP;
    }

    public void setTEMP(Double tEMP) {
        this.tEMP = tEMP;
    }

    public String getUsercreate() {
        return usercreate;
    }

    public void setUsercreate(String usercreate) {
        this.usercreate = usercreate;
    }

}
