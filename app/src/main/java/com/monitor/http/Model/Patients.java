package com.monitor.http.Model;

public class Patients {
    String HubId;
    String HubName;
    String ID;
    String BloodGroup;
    String age;

    public String getBloodGroup() {
        return BloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        BloodGroup = bloodGroup;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getBed_Number() {
        return Bed_Number;
    }

    public void setBed_Number(String bed_Number) {
        Bed_Number = bed_Number;
    }

    public String getGender() {
        return Gender;
    }

    public void setGender(String gender) {
        Gender = gender;
    }

    String Bed_Number;
    String Gender;

    public String getHubId() {
        return HubId;
    }

    public void setHubId(String hubId) {
        HubId = hubId;
    }

    public String getHubName() {
        return HubName;
    }

    public void setHubName(String hubName) {
        HubName = hubName;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getPatientName() {
        return PatientName;
    }

    public void setPatientName(String patientName) {
        PatientName = patientName;
    }

    String PatientName;
}
