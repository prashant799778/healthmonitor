package com.monitor.http;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.error.VolleyError;
import com.android.volley.request.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.jaredrummler.materialspinner.MaterialSpinner;
import com.monitor.Adapter.DashboardAdapter;
import com.monitor.Adapter.Fragment_Adapter;
import com.monitor.Adapter.Hospital_Adapter;
import com.monitor.Adapter.ListViewAdapter;
import com.monitor.Adapter.Patients_Adapter;
import com.monitor.Adapter.Patients_AdapterNew;
import com.monitor.Adapter.SpinnerHandler;
import com.monitor.R;
import com.monitor.activities.AlarmActivity;
import com.monitor.activities.ConfigActivity;
import com.monitor.activities.EditProfileActivity;
import com.monitor.activities.FaceDetectActivity;
import com.monitor.activities.LoginActivity;
import com.monitor.activities.MainActivity;
import com.monitor.activities.SplashActivity;
import com.monitor.activities.UserDashboard;
import com.monitor.bluetooth.BTController;
import com.monitor.bluetooth.Const;
import com.monitor.database.DataBase;
import com.monitor.fragments.DashBoard_Fragment;
import com.monitor.fragments.Profile_Fragment;
import com.monitor.http.Model.All_Hospital;
import com.monitor.http.Model.All_Patients;
import com.monitor.http.Model.Doctor_Details;
import com.monitor.http.Model.Hospital;
import com.monitor.http.Model.Live;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.PatientDetail;
import com.monitor.http.Model.Patients;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.ResultListener;
import com.monitor.widget.Lato_Regular_Font;
import com.ogaclejapan.smarttablayout.SmartTabLayout;


import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class Api_calling {
    public static ArrayList<String>arrayhospital=new ArrayList<>();
    public static ArrayList<String>arrayhubId=new ArrayList<>();
    public static HashMap<String,String >macHash=new HashMap<>();

    public static void login(final Context context, final RelativeLayout view, String name, String password,String ip,String browserId)
    {
     if(!Comman.isNetworkConnected(context)){
         Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
     }else {
         final SweetAlertDialog dialog=Comman.sweetDialogProgress(context);
         JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.GET, URLS.LOGIN + "?name=" +name+ "&&password="+password+"&&DeviceMac="+ip+"&&browserId="+browserId, null, new Response.Listener<JSONObject>() {
             @Override
             public void onResponse(JSONObject response) {
                 Comman.log("LOGIN_RESPONSE", ":" + response);
                 try {
                     MySharedPrefrence mySharedPrefrence;
                     if (Boolean.parseBoolean(response.getString("status"))){
                         mySharedPrefrence = MySharedPrefrence.instanceOf(context);
                         if(response.getJSONObject("result").getString("Usertype").equalsIgnoreCase("Doctor")){
                             Comman.log("Inside","Doctor");
                             JSONObject jp = response.getJSONObject("result");
                              String user_type=jp.getString("Usertype");
                             mySharedPrefrence.setId(jp.getString("Usertype_Id"));
                            // mySharedPrefrence.setUserType(jp.getString("Usertype"));
                             mySharedPrefrence.setDoctorEmail(jp.getString("Email"));
                             mySharedPrefrence.setDoctorName(jp.getString("name"));
                             mySharedPrefrence.setDoctorId(jp.getString("ID"));
                             mySharedPrefrence.setDoctorId(response.getJSONArray("Nurse Details").getJSONObject(0).getString("DoctorID"));
                             Comman.log("AAAAAAAAA",""+jp.getString("Email"));
                             Intent i = new Intent(context, FaceDetectActivity.class);
                             i.putExtra("type",user_type);
                             i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                             context.startActivity(i);
                             dialog.dismissWithAnimation();
                             try {
                                 ( (LoginActivity)context).finish();
                             }catch (Exception e)
                             {

                             }
                         }else {
                             DataBase db = new DataBase(context, Constant.DB_NAME, null, Constant.DB_VERSION);
                             db.deleteDatabase();
                             if (response.getString("Count").equalsIgnoreCase("1")) {
                                 JSONObject jsonObject = response.getJSONObject("Patient Details");
                                 Comman.log("Inside","With Patients");
                                 String p_id = jsonObject.getString("PatientId");
                                 String mac_id = jsonObject.getString("DeviceMac");
                                 mySharedPrefrence.setPatientId(jsonObject.getString("PatientId"));
                                 mySharedPrefrence.setMacAddress(jsonObject.getString("DeviceMac"));
                                 mySharedPrefrence.setPatientAge(jsonObject.getString("age"));
                                 mySharedPrefrence.setPatientBed(jsonObject.getString("Bed_Number"));
                                 mySharedPrefrence.setDoctorId1(jsonObject.getString("DoctorID"));
                                 mySharedPrefrence.setHospitalId(jsonObject.getString("Hospital_Id"));
                                 mySharedPrefrence.setDoctorName(jsonObject.getString("Doctorname"));
                                 mySharedPrefrence.setPatientHospital(jsonObject.getString("hospital_Name"));
                                 mySharedPrefrence.setPatientName(jsonObject.getString("PatientName"));
                                 mySharedPrefrence.setHubId(jsonObject.getString("HubId"));
                                 mySharedPrefrence.setTempUpper(jsonObject.getJSONObject("temperature").getString("upper"));
                                 mySharedPrefrence.setTempLower(jsonObject.getJSONObject("temperature").getString("lower"));
                                 mySharedPrefrence.setHighHeartLimit(jsonObject.getJSONObject("heartRate").getString("upper"));
                                 mySharedPrefrence.setLowHeartLimit(jsonObject.getJSONObject("heartRate").getString("lower"));
                                 mySharedPrefrence.setHighSpo2(jsonObject.getJSONObject("spo2").getString("upper"));
                                 mySharedPrefrence.setLowSpo2(jsonObject.getJSONObject("spo2").getString("lower"));
                                 mySharedPrefrence.setHighPulseRate(jsonObject.getJSONObject("pulseRate").getString("upper"));
                                 mySharedPrefrence.setLowPulseRate(jsonObject.getJSONObject("pulseRate").getString("lower"));
                                 mySharedPrefrence.setHighPressureUpper(jsonObject.getJSONObject("highPressure").getString("upper"));
                                 mySharedPrefrence.setHighPressureLower(jsonObject.getJSONObject("highPressure").getString("lower"));
                                 mySharedPrefrence.setLowPressureUpper(jsonObject.getJSONObject("lowPressure").getString("upper"));
                                 mySharedPrefrence.setLowPressureLower(jsonObject.getJSONObject("lowPressure").getString("lower"));
//                                 mySharedPrefrence.setDoctorId(jsonObject.getString("DoctorID"));
                                 db.insertData(p_id, mac_id);
                                 JSONObject jp = response.getJSONObject("result");
                                 mySharedPrefrence.setId(jp.getString("Usertype_Id"));
                                 mySharedPrefrence.setUserType(jp.getString("Usertype"));
                                 mySharedPrefrence.setNurseId(jp.getString("ID"));
//                                 mySharedPrefrence.setDoctorId(jp.getString("UserID"));
//                                 mySharedPrefrence.setDoctorId(jp.getString("DoctorID"));

                                 JSONArray jsonArray=new JSONArray();
                                 jsonArray=response.getJSONArray("Nurse Details");
                                 Api_calling.arrayhospital.clear();
                                 Api_calling.macHash.clear();
                                 Api_calling.arrayhubId.clear();
                                 for(int i=0;i<jsonArray.length();i++)
                                 {
                                     JSONObject jsonObject1=jsonArray.getJSONObject(i);
                                     mySharedPrefrence.setHospital(jsonObject1.getString("hospital_name"));
                                     Api_calling.arrayhospital.add(jsonObject1.getString("DoctorName"));
//                                     mySharedPrefrence.setHospitalId(jsonObject.getString("Hospital_Id"));
                                     Api_calling.macHash.put(jsonObject1.getString("DoctorName"),jsonObject.getString("DoctorID"));
                                     Api_calling.arrayhubId.add(jsonObject1.getString("HubId"));
                                 }
                                 Intent i = new Intent(context, MainActivity.class);
                                 i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                 i.putExtra("name",mySharedPrefrence.getPatientName());
                                 i.putExtra("age",mySharedPrefrence.getPatientAge());
                                 i.putExtra("hospital",mySharedPrefrence.getPatientHospital());
                                 i.putExtra("bed",mySharedPrefrence.getPatientBed());
                                 context.startActivity(i);
                                 dialog.dismissWithAnimation();
                             } else {
                                 Comman.log("Inside","With Out Patients");
                                 JSONArray jsonArray=new JSONArray();
                                 jsonArray=response.getJSONArray("Nurse Details");
                                 Api_calling.arrayhospital.clear();
                                 Api_calling.macHash.clear();
                                 Api_calling.arrayhubId.clear();
                                 for(int i=0;i<jsonArray.length();i++)
                                 {
                                     JSONObject jsonObject=jsonArray.getJSONObject(i);
                                     mySharedPrefrence.setHubId(jsonObject.getString("HubId"));
                                     mySharedPrefrence.setHospital(jsonObject.getString("hospital_name"));
                                     mySharedPrefrence.setDoctorId1(jsonObject.getString("DoctorID"));
                                     Api_calling.arrayhospital.add(jsonObject.getString("DoctorName"));
                                     mySharedPrefrence.setHospitalId(jsonObject.getString("Hospital_Id"));
                                     Api_calling.macHash.put(jsonObject.getString("DoctorName"),jsonObject.getString("DoctorID"));
                                     Api_calling.arrayhubId.add(jsonObject.getString("HubId"));
                                 }
                                 JSONObject jp = response.getJSONObject("result");
                                 mySharedPrefrence.setId(jp.getString("Usertype_Id"));
//                                 mySharedPrefrence.setDoctorId(jp.getString("DoctorID"));
                                 mySharedPrefrence.setNurseId(jp.getString("ID"));
                                 mySharedPrefrence.setUserType(jp.getString("Usertype"));
                                 Intent i = new Intent(context, ConfigActivity.class);
                                 i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                 context.startActivity(i);
                                 dialog.dismissWithAnimation();
                                 try {
                                     ( (LoginActivity)context).finish();
                                     Comman.log("Finish","Finish");
                                 }catch (Exception e)
                                 {

                                 }
                             }
                         }
                     }else {
                         String msg="";
                         msg=response.getString("result");
                         Comman.show_Real_Message(context,view, msg);
                         dialog.dismissWithAnimation();
                     }
                 }catch (Exception e)
                 {
                     Comman.log("ERROR",e.getMessage());
                   dialog.dismissWithAnimation();
                 }
             }
         }, new Response.ErrorListener() {
             @Override
             public void onErrorResponse(VolleyError error) {
                 Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
           //  Comman.log("LOGIN_ERROR",error);
             dialog.dismissWithAnimation();
             }
         });
         final RequestQueue requestQueue= Volley.newRequestQueue(context);
         requestQueue.add(jsonObjectRequest);
         requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
             @Override
             public void onRequestFinished(Request<Object> request) {
                 requestQueue.getCache().clear();
             }
         });
     }
    }
    public static void getHospitalList(final ConfigActivity context, final LinearLayout view, final MaterialSpinner hospital)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.GETALLHOSPITAL, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("HOSPITAL_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            Gson gson= new GsonBuilder().create();
                            Comman.log("HOSPITAL_LIST_RESPONSE", ":" + response);
                            ArrayList<String>list=new ArrayList<>();
                            for (int i=0;i<response.getJSONArray("result").length();i++)
                            {
                                JSONObject jsonObject=response.getJSONArray("result").getJSONObject(i);
                                list.add(jsonObject.getString("hospital_name"));
                            }
//
//                            list.add(0,"Select Hospital");
                            SpinnerHandler.SpinnerHandler(context,hospital,list,"H");
                        }

                    }catch (Exception e)
                    {

                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("LOGIN_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }
    public static void addPatient(final Context context, final LinearLayout view, JSONObject jsonObject)
    {
        final SweetAlertDialog dialog=Comman.sweetDialogProgress(context);
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.PATIENT_MASTER, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Add_Patient_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            JSONObject jo=response.getJSONObject("Patient Details");
                            MySharedPrefrence mySharedPrefrence=MySharedPrefrence.instanceOf(context);
                            DataBase db=new DataBase(context,Constant.DB_NAME,null, Constant.DB_VERSION);
                            mySharedPrefrence.setMacAddress(jo.getString("DeviceMac"));
                            mySharedPrefrence.setPatientId(jo.getString("PatientId"));
                            mySharedPrefrence.setPatientName(jo.getString("PatientName"));
//                            mySharedPrefrence.setPatientHospital(jo.getString("hospital_Name"));
                            String p_id=jo.getString("PatientId");
                            String mac_id=jo.getString("DeviceMac");
                            db.deleteDatabase();
                            db.insertData(p_id,mac_id);
//                            Api_calling.getCurrentPatient(context,view,mySharedPrefrence);
                            Intent intent=new Intent(context, MainActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                            intent.putExtra("name",mySharedPrefrence.getPatientName());
                            intent.putExtra("age",mySharedPrefrence.getPatientAge());
                            intent.putExtra("hospital",mySharedPrefrence.getPatientHospital());
                            intent.putExtra("bed",mySharedPrefrence.getPatientBed());
                            try {
                                ((ConfigActivity) context).finish();
                                Comman.log("Finish","CHAL GYA");
                            }catch (Exception e)
                            {
                            }
                            context.startActivity(intent);
                            dialog.dismissWithAnimation();

                        }else {
                            Comman.show_Real_Message(context,view, Constant.SOMETHING_WENT_WRONG);
                            dialog.dismissWithAnimation();
                        }
                    }catch (Exception e)
                    {
                        Comman.log("Add_Patient_ERROR",e.getMessage());
                        dialog.dismissWithAnimation();
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("Add_Patient_ERROR",error.getMessage());
                    dialog.dismissWithAnimation();
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }
    public static void getDeviceList(final SplashActivity context, final LinearLayout view)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.GET, URLS.DEVICE_MASTER_SELECT, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Device_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            Gson gson= new GsonBuilder().create();
                            Comman.log("Device_LIST_RESPONSE", ":" + response);
                            JSONArray jsonArray=response.getJSONArray("result");
//                            arraybed.clear();
                            arrayhospital.clear();
                            macHash.clear();
                            for (int i=0;i<jsonArray.length();i++)
                            {
                                JSONObject jsonObject=jsonArray.getJSONObject(i);
//                                arrayhospital.add(jsonObject.getString("hospital_Name"));
                            }
//                            arrayhospital.add(0,"Select");
                            for (int i=0;i<response.getJSONArray("result").length();i++)
                            {
                                JSONObject jsonObject=jsonArray.getJSONObject(i);
//                                arraybed.add(jsonObject.getString("Bed_Number"));
                            }
//                            arraybed.add(0,"Select");
                            for (int i=0;i<response.getJSONArray("result").length();i++)
                            {
                                JSONObject jsonObject=response.getJSONArray("result").getJSONObject(i);
                               macHash.put(jsonArray.getJSONObject(i).getString("Bed_Number"),jsonObject.getString("DeviceMac"));
                            }
//                            Comman.log("FGFGF",arraybed.toString());
                            Comman.log("FGFGF",arrayhospital.toString());
                        }

                    }catch (Exception e)
                    {
                       Comman.log("ERRRRR",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("LOGIN_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }


    public static void getCurrentPatient(final Context context, final LinearLayout view, final MySharedPrefrence mySharedPrefrence)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            Comman.log("Usertype_Id",mySharedPrefrence.getId());
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.GET, URLS.GET_CURRENT_PATIENT+"?Usertype_Id="+mySharedPrefrence.getId(), null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Patient_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            DataBase db=new DataBase(context,Constant.DB_NAME,null, Constant.DB_VERSION);
                            mySharedPrefrence.setMacAddress(response.getJSONObject("result").getString("DeviceMac"));
                            mySharedPrefrence.setPatientId(response.getJSONObject("result").getString("PatientId"));
                            String p_id=response.getJSONObject("result").getString("PatientId");
                            String mac_id=response.getJSONObject("result").getString("DeviceMac");
                            db.deleteDatabase();
                            db.insertData(p_id,mac_id);
                        }

                    }catch (Exception e)
                    {
                        Comman.log("ERRRRR",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("Get_Patient_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }


    public static void dischargePatient(final MainActivity context, final LinearLayout view, JSONObject jsonObject, final MqttAsyncClient json, final MqttAsyncClient ecg, final BTController btController)
    {
        final SweetAlertDialog dialog=Comman.sweetDialogProgress(context);
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context,Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.DISCHARGE, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Discharge_Patient_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            DataBase db=new DataBase(context,Constant.DB_NAME,null,Constant.DB_VERSION);
                            db.deleteDatabase();
                            dialog.dismiss();
                            restartApp(context);
//                            Intent i=new Intent(context, ConfigActivity.class);
//                            i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//                            dialog.dismiss();
//                            i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
////                            if(btController!=null)
////                            {
////                                btController.unregisterBroadcastReceiver(context);
////                                btController.disconnect();
////                                Comman.log("Finsish","CodeRun111");
////                            }
//
//                            context.startActivity(i);
//                            context.finishAffinity();

                            Comman.log("Finsish","CodeRun");

                        }else {
                            Comman.show_Real_Message(context,view, Constant.SOMETHING_WENT_WRONG);
                            dialog.dismissWithAnimation();
                        }

                    }catch (Exception e)
                    {
                        Comman.log("tttt",""+e.getMessage());
                        dialog.dismissWithAnimation();
                    }
                }
            }, new  Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("DisCharge_ERROR",error.getMessage());
                    dialog.dismissWithAnimation();
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }






    public static void getAllHospital(final Context context, final LinearLayout view, final MySharedPrefrence mySharedPrefrence, final Hospital_Adapter hospital_adapter, final ArrayList<All_Hospital>list, final ProgressBar progressBar)
    {
        if(!Comman.isNetworkConnected(context)){
            progressBar.setVisibility(View.GONE);
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JSONObject jo=new JSONObject();
            try {
                jo.put("Email",mySharedPrefrence.getDoctorEmail());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            Comman.log("Usertype_Id",mySharedPrefrence.getId());
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.GETALLHOSPITAL, jo, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Hospital_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            progressBar.setVisibility(View.GONE);
                            Gson gson=new GsonBuilder().create();
                            ArrayList<All_Hospital> rm = gson.fromJson(response.getString("result"), new TypeToken<ArrayList<All_Hospital>>() {
                            }.getType());
                            list.clear();
                            list.addAll(rm);
                            hospital_adapter.notifyDataSetChanged();
                        }else {
                            progressBar.setVisibility(View.GONE);
                        }

                    }catch (Exception e)
                    {
                        progressBar.setVisibility(View.GONE);
                        Comman.log("ALL_Hospital_ERRRRR_)))",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    progressBar.setVisibility(View.GONE);
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("Get_All hospital_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }
    public static void getAllPatients(final Context context, final LinearLayout view, final MySharedPrefrence mySharedPrefrence, final Patients_Adapter adapter, final ArrayList<All_Patients>list, final ProgressBar progressBar)
    {
        if(!Comman.isNetworkConnected(context)){
            progressBar.setVisibility(View.GONE);
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JSONObject jsonObject=new JSONObject();
            try {
                jsonObject.put("Email",mySharedPrefrence.getDoctorEmail());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            Comman.log("Usertype_Id",jsonObject.toString());
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.GETPATIENTSLIST, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Pateints_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            progressBar.setVisibility(View.GONE);
                            Comman.log("INSIDE","JJJJJJJJJJJJJJJJJJJJ");
                            Gson gson=new GsonBuilder().create();
                            ArrayList<All_Patients> rm = gson.fromJson(response.getString("Patient Details"), new TypeToken<ArrayList<All_Patients>>() {
                            }.getType());
                            list.clear();
                            list.addAll(rm);
                            adapter.notifyDataSetChanged();
//                            DataBase db=new DataBase(context,Constant.DB_NAME,null, Constant.DB_VERSION);
//                            mySharedPrefrence.setMacAddress(response.getJSONObject("result").getString("DeviceMac"));
//                            mySharedPrefrence.setPatientId(response.getJSONObject("result").getString("PatientId"));
//                            String p_id=response.getJSONObject("result").getString("PatientId");
//                            String mac_id=response.getJSONObject("result").getString("DeviceMac");
//                            db.deleteDatabase();
//                            db.insertData(p_id,mac_id);
                        }else {
                            progressBar.setVisibility(View.GONE);
                        }

                    }catch (Exception e)
                    {
                        progressBar.setVisibility(View.GONE);
                        Comman.log("ALL_Hospital_ERRRRR_P",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    progressBar.setVisibility(View.GONE);
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("Get_All hospital_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }

    public static LiveModel getDashBoardDetails(final ResultListener resultListener, final Context context, final LinearLayout view, final MySharedPrefrence mySharedPrefrence, final Lato_Regular_Font t1, final Lato_Regular_Font t2, final ProgressBar progressBar, final RecyclerView recyclerView, final String  doctorId, final Activity activity, final DashBoard_Fragment dashBoard_fragment, final SmartTabLayout smartTabLayout, final ViewPager viewPager)
    {
        LiveModel parentResult = null;
        if(!Comman.isNetworkConnected(context)){
            progressBar.setVisibility(View.GONE);
            if (view!=null)
                Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            final JSONObject jo=new JSONObject();
            try {
                jo.put("Email",mySharedPrefrence.getDoctorEmail());
                Comman.log("AAAEMAIL",""+jo);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.DASHBOARD, jo, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Dashboard_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            Gson gson=new GsonBuilder().create();
                            ArrayList<PatientDetail>list=new ArrayList<>();
                            progressBar.setVisibility(View.GONE);
                            LiveModel parentResult = gson.fromJson(response.toString(), LiveModel.class);
                            t1.setText(""+parentResult.getTotalHospital());
                            t2.setText(""+parentResult.getTotalPatient());
                            mySharedPrefrence.setTotalHospital(""+parentResult.getTotalHospital());
                            mySharedPrefrence.setTotalPatients(""+parentResult.getTotalPatient());
                            mySharedPrefrence.setHospital(String.valueOf(parentResult.getResult().get(0).getHospitalName()));
//                            list.addAll(parentResult.getResult().get(0).getPatientDetails());
////                            DashboardAdapter dashboardAdapter=new DashboardAdapter(context,list,String.valueOf(parentResult.getResult().get(0).getHospitalId()),String.valueOf(parentResult.getResult().get(0).getHubId()),doctorId,activity);
//                            recyclerView.setAdapter(dashboardAdapter);
//                            dashboardAdapter.notifyDataSetChanged();
                            Comman.log("DATA", "DATA RESULT"+parentResult.getResult().size());
                            final Fragment_Adapter adapter = new Fragment_Adapter(
                                    dashBoard_fragment.getChildFragmentManager(),parentResult.getResult().size(),parentResult);
                            viewPager.setAdapter(adapter);
                            smartTabLayout.setViewPager(viewPager);
                            TextView view = (TextView) smartTabLayout.getTabAt(0);
                            view.setTextColor(Color.parseColor("#E96729"));
        smartTabLayout.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            }
            @Override
            public void onPageSelected(int position) {
                int count = adapter.getCount();
                for (int i = 0; i < count; i++) {
                    TextView view = (TextView) smartTabLayout.getTabAt(i);
                    view.setTextColor(Color.BLACK);
                }
                TextView view = (TextView) smartTabLayout.getTabAt(position);
                view.setTextColor(Color.parseColor("#E96729"));
            }
            @Override
            public void onPageScrollStateChanged(int state) {
            }
        });
                        }else {
                            progressBar.setVisibility(View.GONE);
                        }

                    }catch (Exception e)
                    {
                        progressBar.setVisibility(View.GONE);
                        Comman.log("ALL_Hospital_ERRRRRfdsh",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    progressBar.setVisibility(View.GONE);
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    if(error.getMessage()!=null)
                    Comman.log("Get_All hospital_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
        return parentResult;
    }


    public static void getDoctorList(final ConfigActivity context, final LinearLayout view,MySharedPrefrence m)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();        }else {
            JSONObject jsonObject=new JSONObject();
            try {
                jsonObject.put("hospitalId",m.getHospitalId());
                Comman.log("DROPDATRA",":"+m.getHospitalId());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.DROP, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Drop_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            Gson gson= new GsonBuilder().create();
                            Comman.log("HOSPITAL_LIST_RESPONSE", ":" + response);
                            ArrayList<String>list=new ArrayList<>();
                            Api_calling.arrayhospital.clear();
                            Api_calling.macHash.clear();
                            for (int i=0;i<response.getJSONArray("result").length();i++)
                            {
                                JSONObject jsonObject=response.getJSONArray("result").getJSONObject(i);
                                Api_calling.arrayhospital.add(jsonObject.getString("DoctorName"));
                                Api_calling.macHash.put(jsonObject.getString("DoctorName"),jsonObject.getString("ID"));
                            }
//
//
                        }

                    }catch (Exception e)
                    {

                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("LOGIN_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }





    public static void getAllPetaintsPerHospital(final Context context, final LinearLayout view, final Patients_AdapterNew hospital_adapter, final ArrayList<Patients>list, final ProgressBar progressBar, JSONObject jsonObject)
    {
        if(!Comman.isNetworkConnected(context)){
            progressBar.setVisibility(View.GONE);
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.HOSPITAL_PATIENTS_DETAILS, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Patients_Per_Hospital_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            progressBar.setVisibility(View.GONE);
                            Gson gson=new GsonBuilder().create();
                            ArrayList<Patients> rm = gson.fromJson(response.getString("result"), new TypeToken<ArrayList<Patients>>() {
                            }.getType());
                            list.clear();
                            list.addAll(rm);
                            hospital_adapter.notifyDataSetChanged();
//                            DataBase db=new DataBase(context,Constant.DB_NAME,null, Constant.DB_VERSION);
//                            mySharedPrefrence.setMacAddress(response.getJSONObject("result").getString("DeviceMac"));
//                            mySharedPrefrence.setPatientId(response.getJSONObject("result").getString("PatientId"));
//                            String p_id=response.getJSONObject("result").getString("PatientId");
//                            String mac_id=response.getJSONObject("result").getString("DeviceMac");
//                            db.deleteDatabase();
//                            db.insertData(p_id,mac_id);
                        }else {
                            progressBar.setVisibility(View.GONE);
                        }

                    }catch (Exception e)
                    {
                        progressBar.setVisibility(View.GONE);
                        Comman.log("ALL_Hospital_ERRRRR_)))",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    progressBar.setVisibility(View.GONE);
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
//                    Comman.log("Get_All hospital_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }




    public static void getDoctorProfile(final Lato_Regular_Font name, final Lato_Regular_Font email, final Lato_Regular_Font gender, final Lato_Regular_Font age, final Context context, final Profile_Fragment fragment, final MySharedPrefrence mySharedPrefrence, final LinearLayout view, final ProgressBar progressBar, final Lato_Regular_Font h1, final Lato_Regular_Font h2, final Lato_Regular_Font h3)
    {
        if(!Comman.isNetworkConnected(context)){
            progressBar.setVisibility(View.GONE);
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            JSONObject jsonObject=new JSONObject();
            try {
                jsonObject.put("Email",mySharedPrefrence.getDoctorEmail());
            } catch (JSONException e) {
                e.printStackTrace();
                Comman.log("JSJSJSJSJS",""+jsonObject);
            }
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.DECTOR_PROFILE, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Doctor_Profile", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            progressBar.setVisibility(View.GONE);
//                            Gson gson=new GsonBuilder().create();
//                            ArrayList<Doctor_Details>arrayList = new ArrayList<>();
//                            ArrayList<Doctor_Details> rm = gson.fromJson(response.getString("result"), new TypeToken<ArrayList<Doctor_Details>>() {
//                            }.getType());
//                            arrayList.addAll(rm);
//                            h1.setText(""+mySharedPrefrence.getTotalPatients());
//                            h2.setText(""+mySharedPrefrence.getTotalHospital());
//                            h3.setText(""+mySharedPrefrence.getTotalHospital());
                            h2.setText(""+response.getString("hospital_count"));
                            h1.setText(""+response.getString("patient_count"));
                            h3.setText(""+response.getString("hub_count"));
                            name.setText(""+response.getJSONArray("result").getJSONObject(0).getString("doctorName"));
//                            age.setText(""+response.getJSONObject("result").getString("age"));
                            setGender(""+response.getJSONArray("result").getJSONObject(0).getString("gender"),gender);
                            email.setText(""+mySharedPrefrence.getDoctorEmail());
                            if(response.getJSONArray("result").getJSONObject(0).getString("licenseNo")!=null)
                                mySharedPrefrence.setDoctorLicenceNo(response.getJSONArray("result").getJSONObject(0).getString("licenseNo"));


//                            if(arrayList.size()>0) {
//                                Doctor_Details p = arrayList.get(0);
//                                if(p.getGender()!=null) {
//                                    setGender(p.getGender().toString(), gender);
//                                    if (p.getDoctorName() != null) {
//                                        setGender(p.getGender().toString(), gender);
//                                        name.setText("" + p.getDoctorName());
//                                    }
//                                }
//
//                            }

//                            list.clear();
//                            list.addAll(rm);
//                            hospital_adapter.notifyDataSetChanged();
//                            fragment.setData(arrayList,layoutInflater);


//                                Comman.log("IIIIIIIIIIIIIIIIIIIIIIIIIIII","FFFFFFFFFFFFFFFFFFFFFFFFFFF");
//                                for(int i=0;i<arrayList.size();i++) {
//                                    View ed=layoutInflater.inflate(R.layout.new_font,null);
//                                    Lato_Regular_Font f;
//                                    f = ed.findViewById(R.id.dynamicFont);
//                                    Doctor_Details p = arrayList.get(i);
//                                    f.setText(p.getHospitalName());
//                                    if(i==0)
//                                    {
//                                        if(p.getGender()!=null) {
//                                            setGender(p.getGender().toString(), gender);
//                                        }
//                                        if(p.getDoctorName()!=null) {
////                                            setGender(p.getGender().toString(), gender);
//                                            name.setText(""+p.getDoctorName());
////                                        }
////                                    }
////                                    f.setTag(i);
////                                    add.addView(ed);
////                                }
////                            for(int i=0;i<arrayList.size();i++) {
////                                View ed=layoutInflater.inflate(R.layout.item_font,null);
////                                Lato_Regular_Font f;
////                                f = ed.findViewById(R.id.dynamicFont);
////                                Doctor_Details p = arrayList.get(i);
////                                f.setText(p.getHubName());
////                                f.setTag(i);
////                                add1.addView(ed);
//                            }


//                                setGender();


//                            DataBase db=new DataBase(context,Constant.DB_NAME,null, Constant.DB_VERSION);
//                            mySharedPrefrence.setMacAddress(response.getJSONObject("result").getString("DeviceMac"));
//                            mySharedPrefrence.setPatientId(response.getJSONObject("result").getString("PatientId"));
//                            String p_id=response.getJSONObject("result").getString("PatientId");
//                            String mac_id=response.getJSONObject("result").getString("DeviceMac");
//                            db.deleteDatabase();
//                            db.insertData(p_id,mac_id);
                        }else {
                            progressBar.setVisibility(View.GONE);
                        }

                    }catch (Exception e)
                    {
                        progressBar.setVisibility(View.GONE);
                        Comman.log("Doctor_Profile_ERROR",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    progressBar.setVisibility(View.GONE);
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("Doctor_Profile_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }

    public static void setGender(String id,Lato_Regular_Font gender)
    {
        switch (id)
        {
            case "1" :
                gender.setText(",  "+"Male");
                break;
            case "0" :
                gender.setText(",  "+"Female");
                break;
        }
    }


    public static void updatePatient(final AlarmActivity context,JSONObject jsonObject)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, ""+Constant.NO_INTERNET, Toast.LENGTH_LONG).show();
        }else {
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.UPDATE_PATIENT, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Update_Patients_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            context.onBackPressed();
                        }
                    }catch (Exception e)
                    {
                        Comman.log("Update_ERROR",e.getMessage());
//                        Toast.makeText(context, ""+Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_LONG).show();
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, ""+Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_LONG).show();
                    Comman.log("Update_ERROR",error.getMessage());
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }




    public static void checkUserSession(final Activity activity, final Context context)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, ""+Constant.NO_INTERNET, Toast.LENGTH_LONG).show();
        }else {
             MySharedPrefrence m=MySharedPrefrence.instanceOf(context);
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.GET, URLS.USER_SESSION+"?name="+m.getDoctorEmail()+"&&browserId="+m.getUserSessionId(), null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Session_Respnse",""+response);
                    try {

                        if(!Boolean.parseBoolean(response.getString("status"))){
                        Comman.userSessionOut(activity,context);
                        Toast.makeText(context, ""+response.getString("result"), Toast.LENGTH_LONG).show();
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {

                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }

    }



    public  static void updateDeoctorProfile(final EditProfileActivity editProfileActivity, final Context context, JSONObject jsonObject)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, ""+Constant.NO_INTERNET, Toast.LENGTH_LONG).show();
        }else {
            final ProgressDialog progDailog;
            progDailog = ProgressDialog.show(context, "Loading","Please wait...", true);
            progDailog.setCancelable(false);
            progDailog.show();
            JsonObjectRequest jsonObjectReques=new JsonObjectRequest(Request.Method.POST, URLS.EDIT_DOCTOR_PROFILE, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                     Comman.log("EDIT_Response",""+response);
                    try {
                        if(Boolean.parseBoolean(response.getString("status"))){
                        progDailog.dismiss();
                        editProfileActivity.onBackPressed();
                        }
                    } catch (JSONException e) {
                        progDailog.dismiss();
                        e.printStackTrace();
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    progDailog.dismiss();
                }
            });
            RequestQueue requestQueue=Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectReques);
        }

    }






    public static void getMessageList(final Context context, final ListView listView, final ProgressBar progressBar, final AlertDialog a, String  id, String P_id, final TextView textView)
    {
        if(!Comman.isNetworkConnected(context)){
            Toast.makeText(context, Constant.NO_INTERNET, Toast.LENGTH_SHORT).show();
        }else {
            Comman.log("iiiiiiiiiiiiiiiiiiiiiiiDocotorId"+id, ":PatientsId"+P_id);
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.GET, URLS.preiscribeMedicine + "?PatientId="+P_id, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("ListResponse", ":" + response);
                    try {
                        if(Boolean.parseBoolean(response.getString("status")))
                        {
                            JSONArray jsonArray=new JSONArray();
                            jsonArray=response.getJSONArray("result");
                            ListAdapter listAdapter=new ListViewAdapter(context,jsonArray);
                            listView.setAdapter(listAdapter);
                            progressBar.setVisibility(View.GONE);
                            textView.setVisibility(View.GONE);
                        }else {
                            progressBar.setVisibility(View.GONE);
                            Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                        }
                    }catch (Exception e)
                    {
                        Comman.log("ERROR",e.getMessage());
                        progressBar.setVisibility(View.GONE);

                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(context, Constant.SOMETHING_WENT_WRONG, Toast.LENGTH_SHORT).show();
                    Comman.log("LOGIN_ERROR",error.getMessage());
                    progressBar.setVisibility(View.GONE);
                }
            });
            final RequestQueue requestQueue= Volley.newRequestQueue(context);
            requestQueue.add(jsonObjectRequest);
            requestQueue.addRequestFinishedListener(new RequestQueue.RequestFinishedListener<Object>() {
                @Override
                public void onRequestFinished(Request<Object> request) {
                    requestQueue.getCache().clear();
                }
            });
        }
    }



    public static  void restartApp(Context context) {


//        Intent intent = context.getPackageManager().getLaunchIntentForPackage(
//                context.getPackageName() );
//         intent.setAction(Intent.ACTION_SCREEN_ON);
//        intent.addCategory(Intent.CATEGORY_ALTERNATIVE);
//        intent .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
//        context.startActivity(intent);


        Intent i=new Intent(context, ConfigActivity.class);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(i);
        int mPendingIntentId = 31;
        PendingIntent mPendingIntent = PendingIntent.getActivity(context, mPendingIntentId, i, PendingIntent.FLAG_CANCEL_CURRENT);
        AlarmManager mgr = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 5, mPendingIntent);
        System.exit(1);
    }


}
