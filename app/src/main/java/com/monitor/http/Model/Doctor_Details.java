package com.monitor.http.Model;

public class Doctor_Details {



    String doctorNmae;
//    String Gender;
    String HubName;
    String ID;

     public String getDoctorName() {
          return doctorNmae;
     }

     public void setDoctorName(String doctorName) {
         doctorNmae = doctorName;
     }

//     public String getGender() {
//          return Gender;
//     }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    String gender;

//     public void setGender(String gender) {
//          Gender = gender;
//     }

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

     public String getHospitalId() {
          return hospitalId;
     }

     public void setHospitalId(String hospitalId) {
          this.hospitalId = hospitalId;
     }

     public String getHospitalName() {
          return hospitalName;
     }

     public void setHospitalName(String hospitalName) {
          this.hospitalName = hospitalName;
     }

     public String getHubId() {
          return hubId;
     }

     public void setHubId(String hubId) {
          this.hubId = hubId;
     }

     String hospitalId;
    String hospitalName;
    String hubId;
   
}
