
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class HighPressure {

    @SerializedName("lower")
    @Expose
    private Integer lower;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("upper")
    @Expose
    private Integer upper;

    public Integer getLower() {
        return lower;
    }

    public void setLower(Integer lower) {
        this.lower = lower;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getUpper() {
        return upper;
    }

    public void setUpper(Integer upper) {
        this.upper = upper;
    }

}
