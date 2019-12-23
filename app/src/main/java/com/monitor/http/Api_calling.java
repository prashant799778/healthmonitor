package com.monitor.http;

import android.content.Context;
import android.content.Intent;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

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
import com.monitor.Adapter.Hospital_Adapter;
import com.monitor.Adapter.Patients_Adapter;
import com.monitor.Adapter.SpinnerHandler;
import com.monitor.activities.ConfigActivity;
import com.monitor.activities.MainActivity;
import com.monitor.activities.SplashActivity;
import com.monitor.activities.UserDashboard;
import com.monitor.bluetooth.BTController;
import com.monitor.bluetooth.Const;
import com.monitor.database.DataBase;
import com.monitor.http.Model.All_Hospital;
import com.monitor.http.Model.All_Patients;
import com.monitor.http.Model.Hospital;
import com.monitor.http.Model.Live;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.PatientDetail;
import com.monitor.http.Model.Patient_Details;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.ResultListener;
import com.monitor.widget.Lato_Regular_Font;

import org.eclipse.paho.android.service.MqttAndroidClient;
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

    public static void login(final Context context, final RelativeLayout view, String name, String password)
    {
     if(!Comman.isNetworkConnected(context)){
         Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
     }else {
         final SweetAlertDialog dialog=Comman.sweetDialogProgress(context);
         JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.GET, URLS.LOGIN + "?name=" +name+ "&&password="+password, null, new Response.Listener<JSONObject>() {
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
                             mySharedPrefrence.setId(jp.getString("Usertype_Id"));
                             mySharedPrefrence.setUserType(jp.getString("Usertype"));
                             mySharedPrefrence.setDoctorEmail(jp.getString("Email"));
                             mySharedPrefrence.setDoctorId(jp.getString("UserID"));
                             Comman.log("AAAAAAAAA",""+jp.getString("Email"));
                             Intent i = new Intent(context, UserDashboard.class);
                             i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                             context.startActivity(i);
                             dialog.dismissWithAnimation();
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
                                 mySharedPrefrence.setPatientAge(jsonObject.getString("PatientId"));
                                 mySharedPrefrence.setPatientBed(jsonObject.getString("Bed_Number"));
                                 mySharedPrefrence.setPatientHospital(jsonObject.getString("hospital_Name"));
                                 mySharedPrefrence.setPatientName(jsonObject.getString("PatientName"));
//                                 mySharedPrefrence.setDoctorId(jsonObject.getString("DoctorID"));
                                 db.insertData(p_id, mac_id);
                                 JSONObject jp = response.getJSONObject("result");
                                 mySharedPrefrence.setId(jp.getString("Usertype_Id"));
                                 mySharedPrefrence.setUserType(jp.getString("Usertype"));
                                 mySharedPrefrence.setDoctorId(jp.getString("UserID"));
                                 mySharedPrefrence.setHospitalId(jp.getString("Hospital_Id"));
                                 JSONArray jsonArray=new JSONArray();
                                 jsonArray=response.getJSONArray("Nurse Details");
                                 Api_calling.arrayhospital.clear();
                                 Api_calling.macHash.clear();
                                 Api_calling.arrayhubId.clear();
                                 for(int i=0;i<jsonArray.length();i++)
                                 {
                                     JSONObject jsonObject1=jsonArray.getJSONObject(i);
                                     mySharedPrefrence.setHubId(jsonObject1.getString("HubId"));
                                     mySharedPrefrence.setHospital(jsonObject1.getString("hospital_Name"));
                                     Api_calling.arrayhospital.add(jsonObject1.getString("DoctorName"));
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
                                     mySharedPrefrence.setHospital(jsonObject.getString("hospital_Name"));
                                     Api_calling.arrayhospital.add(jsonObject.getString("DoctorName"));
                                     Api_calling.macHash.put(jsonObject.getString("DoctorName"),jsonObject.getString("DoctorID"));
                                     Api_calling.arrayhubId.add(jsonObject.getString("HubId"));
                                 }
                                 JSONObject jp = response.getJSONObject("result");
                                 mySharedPrefrence.setHospitalId(jp.getString("Hospital_Id"));
                                 mySharedPrefrence.setId(jp.getString("Usertype_Id"));
//                                 mySharedPrefrence.setDoctorId(jp.getString("DoctorID"));
                                 mySharedPrefrence.setUserType(jp.getString("Usertype"));
                                 Intent i = new Intent(context, ConfigActivity.class);
                                 i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                 context.startActivity(i);
                                 dialog.dismissWithAnimation();
                             }
                         }
                     }else {
                         Comman.show_Real_Message(context,view, Constant.FILL_CORRECT_EMAIL_AND_PASSWORD);
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
             Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
             Comman.log("LOGIN_ERROR",error.getMessage());
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
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
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
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
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
                            String p_id=jo.getString("PatientId");
                            String mac_id=jo.getString("DeviceMac");
                            db.deleteDatabase();
                            db.insertData(p_id,mac_id);
//                            Api_calling.getCurrentPatient(context,view,mySharedPrefrence);
                            Intent intent=new Intent(context, MainActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            intent.putExtra("name",mySharedPrefrence.getPatientName());
                            intent.putExtra("age",mySharedPrefrence.getPatientAge());
                            intent.putExtra("hospital",mySharedPrefrence.getPatientHospital());
                            intent.putExtra("bed",mySharedPrefrence.getPatientBed());
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
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
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
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
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
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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


    public static void dischargePatient(final Context context, final LinearLayout view, JSONObject jsonObject)
    {
        final SweetAlertDialog dialog=Comman.sweetDialogProgress(context);
        if(!Comman.isNetworkConnected(context)){
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
        }else {
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.DISCHARGE, jsonObject, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Discharge_Patient_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){
                            DataBase db=new DataBase(context,Constant.DB_NAME,null,Constant.DB_VERSION);
                            db.deleteDatabase();
                            Intent i=new Intent(context, ConfigActivity.class);
                            i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            context.startActivity(i);
                            dialog.dismissWithAnimation();
                        }else {
                            Comman.show_Real_Message(context,view, Constant.SOMETHING_WENT_WRONG);
                            dialog.dismissWithAnimation();
                        }

                    }catch (Exception e)
                    {
                        dialog.dismissWithAnimation();
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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






    public static void getAllHospital(final Context context, final LinearLayout view, final MySharedPrefrence mySharedPrefrence, final Hospital_Adapter hospital_adapter, final ArrayList<All_Hospital>list)
    {
        if(!Comman.isNetworkConnected(context)){
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
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
                            Gson gson=new GsonBuilder().create();
                            ArrayList<All_Hospital> rm = gson.fromJson(response.getString("result"), new TypeToken<ArrayList<All_Hospital>>() {
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
                        }

                    }catch (Exception e)
                    {
                        Comman.log("ALL_Hospital_ERRRRR_)))",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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
    public static void getAllPatients(final Context context, final LinearLayout view, final MySharedPrefrence mySharedPrefrence, final Patients_Adapter adapter, final ArrayList<All_Patients>list)
    {
        if(!Comman.isNetworkConnected(context)){
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
        }else {
            Comman.log("Usertype_Id",mySharedPrefrence.getId());
            JsonObjectRequest jsonObjectRequest=new JsonObjectRequest(Request.Method.POST, URLS.GETPATIENTSLIST+"?Usertype_Id="+mySharedPrefrence.getId()+"&&Email="+mySharedPrefrence.getDoctorEmail(), null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Comman.log("Pateints_LIST_RESPONSE", ":" + response);
                    try {
                        if (Boolean.parseBoolean(response.getString("status"))){

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
                        }

                    }catch (Exception e)
                    {
                        Comman.log("ALL_Hospital_ERRRRR_P",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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

    public static LiveModel getDashBoardDetails(final ResultListener resultListener, final Context context, final LinearLayout view, final MySharedPrefrence mySharedPrefrence, final DashboardAdapter dashboardAdapter, final ArrayList<PatientDetail>list, final Lato_Regular_Font t1, final Lato_Regular_Font t2)
    {
        LiveModel parentResult = null;
        if(!Comman.isNetworkConnected(context)){
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
        }else {
            Comman.log("Usertype_Id",mySharedPrefrence.getId());
            final JSONObject jo=new JSONObject();
            try {
                jo.put("Email",mySharedPrefrence.getDoctorEmail());
                Comman.log("AAAEMAIL",""+mySharedPrefrence.getDoctorEmail());
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

//                            ArrayList<LiveModel> rm = gson.fromJson(response.getString("result"), new TypeToken<ArrayList<LiveModel>>() {
//                            }.getType());

                            LiveModel parentResult = gson.fromJson(response.toString(), LiveModel.class);
                            t1.setText(""+parentResult.getTotalHospital());
                            t2.setText(""+parentResult.getTotalPatient());
                            list.addAll(parentResult.getResult().get(0).getPatientDetails());
                            dashboardAdapter.notifyDataSetChanged();
                            Comman.log("DATA", "DATA RESULT"+parentResult.getResult().get(0).getPatientDetails().size());

//                            mySharedPrefrence.setHubId(response.get);
//                            JSONArray jsonArray=response.getJSONArray("result");
//                            for (int i=0;i<jsonArray.length();i++)
//                            {   Patient_Details p = null;
//                                JSONArray jsonArray1=jsonArray.getJSONObject(i).getJSONArray("patient_Details");
//                                for(int j=0;j<jsonArray1.length();j++)
//                                {
//                                   p.se(jsonArray1.getJSONObject(i).getString("PatientName"));
//                                }
//
//                            }
//                            list.clear();
//                            list.addAll(parentResult.getResult().get(0).getPatientDetails());
//                            dashboardAdapter.notifyDataSetChanged();
                            resultListener.onResult(parentResult);
//                            DataBase db=new DataBase(context,Constant.DB_NAME,null, Constant.DB_VERSION);
//                            mySharedPrefrence.setMacAddress(response.getJSONObject("result").getString("DeviceMac"));
//                            mySharedPrefrence.setPatientId(response.getJSONObject("result").getString("PatientId"));
//                            String p_id=response.getJSONObject("result").getString("PatientId");
//                            String mac_id=response.getJSONObject("result").getString("DeviceMac");
//                            db.deleteDatabase();
//                            db.insertData(p_id,mac_id);
                        }

                    }catch (Exception e)
                    {
                        Comman.log("ALL_Hospital_ERRRRR",e.getMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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
            Comman.show_Real_Message(context,view, Constant.NO_INTERNET);
        }else {
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
                    Comman.show_Real_Message(context,view,Constant.SOMETHING_WENT_WRONG);
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


}
