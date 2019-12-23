package com.monitor.http.Model;

public class All_Patients {
    String Address;
    String Bed_Number;
    String DeviceMac;
          String DoctorID;
          String Email;
            String ID;

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getBed_Number() {
        return Bed_Number;
    }

    public void setBed_Number(String bed_Number) {
        Bed_Number = bed_Number;
    }

    public String getDeviceMac() {
        return DeviceMac;
    }

    public void setDeviceMac(String deviceMac) {
        DeviceMac = deviceMac;
    }

    public String getDoctorID() {
        return DoctorID;
    }

    public void setDoctorID(String doctorID) {
        DoctorID = doctorID;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
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

    public String getUsertype_Id() {
        return Usertype_Id;
    }

    public void setUsertype_Id(String usertype_Id) {
        Usertype_Id = usertype_Id;
    }

    public String getHospital_Name() {
        return hospital_Name;
    }

    public void setHospital_Name(String hospital_Name) {
        this.hospital_Name = hospital_Name;
    }

    String PatientName;
            String Usertype_Id;
            String hospital_Name;
}
