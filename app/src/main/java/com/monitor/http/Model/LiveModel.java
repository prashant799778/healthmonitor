
package com.monitor.http.Model;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LiveModel {

    @SerializedName("Total_hospital")
    @Expose
    private Integer totalHospital;
    @SerializedName("result")
    @Expose
    private List<Result> result = null;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("total_patient")
    @Expose
    private Integer totalPatient;

    public Integer getTotalHospital() {
        return totalHospital;
    }

    public void setTotalHospital(Integer totalHospital) {
        this.totalHospital = totalHospital;
    }

    public List<Result> getResult() {
        return result;
    }

    public void setResult(List<Result> result) {
        this.result = result;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getTotalPatient() {
        return totalPatient;
    }

    public void setTotalPatient(Integer totalPatient) {
        this.totalPatient = totalPatient;
    }

}
