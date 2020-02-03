package com.monitor.http.Model;

public class All_Hospital {
    String patient_count;
    String HospitalId;

    public String getHospitalId() {
        return HospitalId;
    }

    public void setHospitalId(String hospitalId) {
        HospitalId = hospitalId;
    }

    public String getHubId() {
        return HubId;
    }

    public void setHubId(String hubId) {
        HubId = hubId;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getHospital_address() {
        return hospital_address;
    }

    public void setHospital_address(String hospital_address) {
        this.hospital_address = hospital_address;
    }

    String HubId;
    String ID;
    String hospital_address;

    public String getPatient_count() {
        return patient_count;
    }

    public void setPatient_count(String patient_count) {
        this.patient_count = patient_count;
    }

    public String getHospital_name() {
        return hospital_name;
    }

    public void setHospital_name(String hospital_name) {
        this.hospital_name = hospital_name;
    }

    String hospital_name;
}
