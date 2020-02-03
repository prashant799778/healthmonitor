
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class HeartRate {

    @SerializedName("lower")
    @Expose
    private String lower;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("upper")
    @Expose
    private String upper;

    public String getLower() {
        return lower;
    }

    public void setLower(String lower) {
        this.lower = lower;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUpper() {
        return upper;
    }

    public void setUpper(String upper) {
        this.upper = upper;
    }

}
