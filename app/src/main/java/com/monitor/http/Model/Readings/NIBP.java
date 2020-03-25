
package com.monitor.http.Model.Readings;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class NIBP {

    @SerializedName("Cuff")
    @Expose
    private String cuff;
    @SerializedName("High")
    @Expose
    private String high;
    @SerializedName("Low")
    @Expose
    private String low;
    @SerializedName("Mean")
    @Expose
    private String mean;

    public String getCuff() {
        return cuff;
    }

    public void setCuff(String cuff) {
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

}