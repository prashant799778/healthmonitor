package com.monitor.http;

public class URLS {
    public static final String BASE_URL="http://159.65.146.25:5053/";

    ///////////////////////////////GET API START //////////////////////////////////////
    public static final String LOGIN=BASE_URL+"login";
    public static final String SIGNUP_LIST=BASE_URL+"Signuplist";
    public static final String USER_TYPE_LIST=BASE_URL+"Usertypelist";
    public static final String HOSPITAL_MASTER_LIST=BASE_URL+"hospital_master_list";
    public static final String DEVICE_MASTER_SELECT=BASE_URL+"Device_master_select";
    public static final String PATIENT_MASTER_SELECT=BASE_URL+"Patient_master_select";
    public static final String PATIENT_VITAL_MASTER_SELECT=BASE_URL+"Patient_Vital_master_select";
    public static final String GET_CURRENT_PATIENT=BASE_URL+"getCurrentpatient";
    public static final String GETPATIENTSLIST=BASE_URL+"doctorPatientDetails";
//            "?Usertype_Id=2&Email=rakesh@gmail.com"
    ///////////////////////////////GET API END ///////////////////////////////////////////



    ///////////////////////////////POST API START/////////////////////////////////////////
    public static final String DROP=BASE_URL+"doctorDropdown";
    public static final String DASHBOARD=BASE_URL+"doctorLoginDashboard";
    public static final String GETALLHOSPITAL=BASE_URL+"doctorLoginHospital";
    public static final String SIGNUP=BASE_URL+"signup";
    public static final String UPDATE_SIGNUP=BASE_URL+"update_Signup";
    public static final String USET_TYPE_MASTER=BASE_URL+"Usertype_master";
    public static final String UPDATE_USET_TYPE=BASE_URL+"usertype_Usertype";
    public static final String HOSPITAL_MASTER=BASE_URL+"Hospital_master";
    public static final String PATIENT_MASTER=BASE_URL+"Patient_master";
    public static final String DISCHARGE=BASE_URL+"Discharge";
    ///////////////////////////////POST API END/////////////////////////////////////////

}
