
package com.monitor.http.Model;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Result {

    @SerializedName("HospitalId")
    @Expose
    private Integer hospitalId;
    @SerializedName("HubId")
    @Expose
    private Integer hubId;
    @SerializedName("HubName")
    @Expose
    private String hubName;
    @SerializedName("ID")
    @Expose
    private Integer iD;
    @SerializedName("hospital_name")
    @Expose
    private String hospitalName;
    @SerializedName("patient_Details")
    @Expose
    private List<PatientDetail> patientDetails = null;
    @SerializedName("total_patient")
    @Expose
    private Integer totalPatient;

    public Integer getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Integer hospitalId) {
        this.hospitalId = hospitalId;
    }

    public Integer getHubId() {
        return hubId;
    }

    public void setHubId(Integer hubId) {
        this.hubId = hubId;
    }

    public String getHubName() {
        return hubName;
    }

    public void setHubName(String hubName) {
        this.hubName = hubName;
    }

    public Integer getID() {
        return iD;
    }

    public void setID(Integer iD) {
        this.iD = iD;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public List<PatientDetail> getPatientDetails() {
        return patientDetails;
    }

    public void setPatientDetails(List<PatientDetail> patientDetails) {
        this.patientDetails = patientDetails;
    }

    public Integer getTotalPatient() {
        return totalPatient;
    }

    public void setTotalPatient(Integer totalPatient) {
        this.totalPatient = totalPatient;
    }

}
