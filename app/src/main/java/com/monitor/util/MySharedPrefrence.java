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





    public void setHighHeartLimit(String id) {
        prefEditor.putString("setHighHeartLimit", id);
        prefEditor.commit();
    }

    public String getHighHeartLimit() {
        return sharedPreferences.getString("setHighHeartLimit", "100");
    }

    public void setLowHeartLimit(String id) {
        prefEditor.putString("setLowHeartLimit", id);
        prefEditor.commit();
    }

    public String getLowHeartLimit() {
        return sharedPreferences.getString("setLowHeartLimit", "60");
    }





    public void setHighSpo2(String id) {
        prefEditor.putString("setHighSpo2", id);
        prefEditor.commit();
    }

    public String getHighSpo2() {
        return sharedPreferences.getString("setHighSpo2", "99");
    }
    public void setLowSpo2(String id) {
        prefEditor.putString("setLowSpo2", id);
        prefEditor.commit();
    }

    public String getLowSpo2() {
        return sharedPreferences.getString("setLowSpo2", "66");
    }



    public void setHighPulseRate(String id) {
        prefEditor.putString("setHighPulse", id);
        prefEditor.commit();
    }

    public String getHighPulseRate() {
        return sharedPreferences.getString("setHighPulse", "100");
    }


    public void setLowPulseRate(String id) {
        prefEditor.putString("setLowPulseRate", id);
        prefEditor.commit();
    }

    public String getLowPulseRate() {
        return sharedPreferences.getString("setLowPulseRate", "70");
    }








    public void setHighPressureUpper(String id) {
        prefEditor.putString("setHighPressure", id);
        prefEditor.commit();
    }

    public String getHighPressureUpper() {
        return sharedPreferences.getString("setHighPressure", "139");
    }



    public void setHighPressureLower(String id) {
        prefEditor.putString("getHighPressureLoewer", id);
        prefEditor.commit();
    }

    public String getHighPressureLower() {
        return sharedPreferences.getString("getHighPressureLoewer", "120");
    }








    public void setLowPressureUpper(String id) {
        prefEditor.putString("setLowPressure", id);
        prefEditor.commit();
    }

    public String getLowPressureUpper() {
        return sharedPreferences.getString("setLowPressure", "89");
    }


    public void setLowPressureLower(String id) {
        prefEditor.putString("setLowPressureLower", id);
        prefEditor.commit();
    }

    public String getLowPressureLower() {
        return sharedPreferences.getString("setLowPressureLower", "80");
    }



    public void setTempLower(String id) {
        prefEditor.putString("setTempLower", id);
        prefEditor.commit();
    }

    public String getTempLower() {
        return sharedPreferences.getString("setTempLower", "36");
    }

    public void setTempUpper(String id) {
        prefEditor.putString("setTempUpper", id);
        prefEditor.commit();
    }

    public String getTempUpper() {
        return sharedPreferences.getString("setTempUpper", "37");
    }


    public void setAlarmValue(String id) {
        prefEditor.putString("setAlarmValue", id);
        prefEditor.commit();
    }

    public String getAlarmValue() {
        return sharedPreferences.getString("setAlarmValue", "0");
    }

    public void setPulseValue(String id) {
        prefEditor.putString("setpulseValue", id);
        prefEditor.commit();
    }

    public String getPulseValue() {
        return sharedPreferences.getString("setpulseValue", "0");
    }
    public void setBrightValue(String id) {
        prefEditor.putString("getBrightValue", id);
        prefEditor.commit();
    }

    public String getBrightValue() {
        return sharedPreferences.getString("getBrightValue", "0");
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



    public void setSUerSessionId(String sessionId) {
        prefEditor.putString("sessionId", sessionId);
        prefEditor.commit();
    }

    public String getUserSessionId() {
        return sharedPreferences.getString("sessionId", "");
    }


    public void setDoctorLicenceNo(String licence) {
        prefEditor.putString("licence", licence);
        prefEditor.commit();
    }

    public String getDoctorLicenceNo() {
        return sharedPreferences.getString("licence", "");
    }





    public void setTotalPatients(String id) {
        prefEditor.putString("pp", id);
        prefEditor.commit();
    }

    public String getTotalPatients() {
        return sharedPreferences.getString("pp", "");
    }
    public void setTotalHospital(String id) {
        prefEditor.putString("ppp", id);
        prefEditor.commit();
    }

    public String getTotalHospital() {
        return sharedPreferences.getString("ppp", "");
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


    public void setNurseId(String id) {
        prefEditor.putString("N_ID", id);
        prefEditor.commit();
    }

    public String getNurseId() {
        return sharedPreferences.getString("N_ID", "");
    }




    public void setDoctorId1(String id) {
        prefEditor.putString("D1", id);
        prefEditor.commit();
    }

    public String getDoctorId1() {
        return sharedPreferences.getString("D1", "");
    }








    public void setDoctorName(String id) {
        prefEditor.putString("Dname", id);
        prefEditor.commit();
    }

    public String getDoctorName() {
        return sharedPreferences.getString("Dname", "");
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
