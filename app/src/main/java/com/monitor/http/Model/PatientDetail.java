
package com.monitor.http.Model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PatientDetail {

    @SerializedName("Bed_Number")
    @Expose
    private String bedNumber;
    @SerializedName("BloodGroup")
    @Expose
    private String bloodGroup;
    @SerializedName("DeviceMac")
    @Expose
    private String deviceMac;
    @SerializedName("Gender")
    @Expose
    private Integer gender;
    @SerializedName("PatientId")
    @Expose
    private Integer patientId;
    @SerializedName("PatientName")
    @Expose
    private String patientName;
    @SerializedName("age")
    @Expose
    private Integer age;
    @SerializedName("heartRate")
    @Expose
    private HeartRate heartRate;
    @SerializedName("highPressure")
    @Expose
    private HighPressure highPressure;
    @SerializedName("hospitalId")
    @Expose
    private Integer hospitalId;
    @SerializedName("lowPressure")
    @Expose
    private LowPressure lowPressure;
    @SerializedName("pulseRate")
    @Expose
    private PulseRate pulseRate;
    @SerializedName("roomNumber")
    @Expose
    private Integer roomNumber;
    @SerializedName("spo2")
    @Expose
    private Spo2 spo2;
    @SerializedName("temperature")
    @Expose
    private Temperature temperature;





    @SerializedName("HR")
    @Expose
    String HR;
    @SerializedName("PR")
    @Expose
    String PR;
    @SerializedName("Sp2")
    @Expose
    String Sp2;
    @SerializedName("RESP")
    @Expose
    String RESP;


    public String getSp2() {
        return Sp2;
    }

    public void setSp2(String sp2) {
        Sp2 = sp2;
    }

    public String getPR() {
        return PR;
    }

    public void setPR(String PR) {
        this.PR = PR;
    }

    public String getHR() {
        return HR;
    }

    public void setHR(String HR) {
        this.HR = HR;
    }

    public String getRESP() {
        return RESP;
    }

    public void setRESP(String RESP) {
        this.RESP = RESP;
    }

























    public String getBedNumber() {
        return bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getDeviceMac() {
        return deviceMac;
    }

    public void setDeviceMac(String deviceMac) {
        this.deviceMac = deviceMac;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public HeartRate getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(HeartRate heartRate) {
        this.heartRate = heartRate;
    }

    public HighPressure getHighPressure() {
        return highPressure;
    }

    public void setHighPressure(HighPressure highPressure) {
        this.highPressure = highPressure;
    }

    public Integer getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Integer hospitalId) {
        this.hospitalId = hospitalId;
    }

    public LowPressure getLowPressure() {
        return lowPressure;
    }

    public void setLowPressure(LowPressure lowPressure) {
        this.lowPressure = lowPressure;
    }

    public PulseRate getPulseRate() {
        return pulseRate;
    }

    public void setPulseRate(PulseRate pulseRate) {
        this.pulseRate = pulseRate;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Spo2 getSpo2() {
        return spo2;
    }

    public void setSpo2(Spo2 spo2) {
        this.spo2 = spo2;
    }

    public Temperature getTemperature() {
        return temperature;
    }

    public void setTemperature(Temperature temperature) {
        this.temperature = temperature;
    }

}
