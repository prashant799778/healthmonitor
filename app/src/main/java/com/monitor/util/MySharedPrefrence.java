package com.monitor.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class MySharedPrefrence {
    static SharedPreferences sharedPreferences;
    static SharedPreferences.Editor prefEditor = null;

    private static Context mContext = null;
    public static MySharedPrefrence instance = null;

    public static MySharedPrefrence instanceOf(Context context) {
        mContext = context;
        if (instance == null) {
            instance = new MySharedPrefrence();
        }
        sharedPreferences = context.getSharedPreferences(Constant.PREFS_NAME, Context.MODE_PRIVATE);
        prefEditor = sharedPreferences.edit();
        return instance;
    }
    public void setId(String id) {
        prefEditor.putString("id", id);
        prefEditor.commit();
    }






    public String getId() {
        return sharedPreferences.getString("id", "");
    }
    public void setUserType(String id) {
        prefEditor.putString("usertype", id);
        prefEditor.commit();
    }



    public void setHospitalNurse(String id) {
        prefEditor.putString("N", id);
        prefEditor.commit();
    }






    public String getHospitalNurs() {
        return sharedPreferences.getString("N", "");
    }
//    public void setUserType(String id) {
//        prefEditor.putString("usertype", id);
//        prefEditor.commit();
//    }






    public String getUserType() {
        return sharedPreferences.getString("usertype", "");
    }
    public void setCount(String id) {
        prefEditor.putString("count", id);
        prefEditor.commit();
    }

    public String getCount() {
        return sharedPreferences.getString("count", "");
    }











    public void setPatientName(String id) {
        prefEditor.putString("p_name", id);
        prefEditor.commit();
    }

    public String getPatientName() {
        return sharedPreferences.getString("p_name", "");
    }






    public void setDoctorEmail(String id) {
        prefEditor.putString("email", id);
        prefEditor.commit();
    }

    public String getDoctorEmail() {
        return sharedPreferences.getString("email", "");
    }




    public void setPatientAge(String id) {
        prefEditor.putString("Age", id);
        prefEditor.commit();
    }

    public String getPatientAge() {
        return sharedPreferences.getString("Age", "");
    }
    public void setPatientBed(String id) {
        prefEditor.putString("bed", id);
        prefEditor.commit();
    }









    public String getPatientHospital() {
        return sharedPreferences.getString("h", "");
    }
    public void setPatientHospital(String id) {
        prefEditor.putString("h", id);
        prefEditor.commit();
    }








    public String getHospital() {
        return sharedPreferences.getString("NH", "");
    }
    public void setHospital(String id) {
        prefEditor.putString("NH", id);
        prefEditor.commit();
    }

    public String getPatientBed() {
        return sharedPreferences.getString("bed", "");
    }



    public void setMacAddress(String id) {
        prefEditor.putString("mac", id);
        prefEditor.commit();
    }

    public String getMakeAddress() {
        return sharedPreferences.getString("mac", "");
    }

    public void setPatientId(String id) {
        prefEditor.putString("p_id", id);
        prefEditor.commit();
    }

    public String getPatientId() {
        return sharedPreferences.getString("p_id", "");
    }




    public void setHubId(String id) {
        prefEditor.putString("hubid", id);
        prefEditor.commit();
    }

    public String getHubId() {
        return sharedPreferences.getString("hubid", "");
    }

    public void setDoctorId(String id) {
        prefEditor.putString("D", id);
        prefEditor.commit();
    }

    public String getDoctorId() {
        return sharedPreferences.getString("D", "");
    }


    public void setHospitalId(String id) {
        prefEditor.putString("HID", id);
        prefEditor.commit();
    }

    public String getHospitalId() {
        return sharedPreferences.getString("HID", "");
    }




    public void clearData() {
        prefEditor.clear();
        prefEditor.commit();
    }
}
