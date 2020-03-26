package com.monitor.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.text.format.Formatter;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TimePicker;
import android.widget.Toast;

//import com.anurag.multiselectionspinner.MultiSelectionSpinnerDialog;
//import com.anurag.multiselectionspinner.MultiSpinner;
import com.crowdfire.cfalertdialog.CFAlertDialog;
import com.google.android.material.picker.MaterialDatePicker;
import com.google.android.material.picker.MaterialStyledDatePickerDialog;
import com.google.android.material.snackbar.Snackbar;
import com.jaredrummler.materialspinner.MaterialSpinner;
import com.monitor.Adapter.SpinnerHandler;
import com.monitor.R;
import com.monitor.http.Api_calling;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.Validation;
import com.monitor.widget.EditTextFontGothamBook;
import com.monitor.widget.Lato_Regular_Font;
import com.shagi.materialdatepicker.date.DatePickerFragmentDialog;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import cn.pedant.SweetAlert.SweetAlertDialog;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission_group.CAMERA;

public class ConfigActivity extends BaseActivity {
   DatePickerDialog picker;
    EditTextFontGothamBook name,age,room,bed,hospital,height,weight,mobileno,email;
   LinearLayout item_top_view;
    ImageButton lgout;
    Lato_Regular_Font bck1;
   MaterialSpinner  gender,bloodGp,doctor;
   MySharedPrefrence mySharedPrefrence;
   ArrayList<String >gnderList,bloodList;
   JSONArray doctorIdArray;
   JSONArray nurseIdArray;
   Lato_Regular_Font multi;
   String TAG="SmartICU_ConfigActivity";
   JSONObject heartRate,spo2,nibp,temp,pulseRate,lowPressure,highPressure;
//   String bedid="";
//    String hospital_name="";
private static final int PERMISSION_REQUEST_CODE = 200;
    Button save;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_config);
        Comman.log(TAG,":OnCreateMethod");
        item_top_view=findViewById(R.id.top_view);
        save=findViewById(R.id.LoginButton);
        name=findViewById(R.id.name);
        age=findViewById(R.id.age);
        room=findViewById(R.id.roomNo);
        lgout=findViewById(R.id.bck);
        bck1=findViewById(R.id.bck1);
        bed=findViewById(R.id.bedno);
        hospital=findViewById(R.id.hospitalname);
        multi=findViewById(R.id.doctorlist);
        email=findViewById(R.id.email);
        mobileno=findViewById(R.id.mobileNo);
        height=findViewById(R.id.Height);
        weight=findViewById(R.id.Weight);
        gnderList=new ArrayList<>();
        bloodList=new ArrayList<>();
        doctorIdArray=new JSONArray();
        nurseIdArray=new JSONArray();
        heartRate=new JSONObject();
        spo2=new JSONObject();
        nibp=new JSONObject();
        temp=new JSONObject();
        pulseRate=new JSONObject();
        highPressure=new JSONObject();
        lowPressure=new JSONObject();
        mySharedPrefrence=MySharedPrefrence.instanceOf(ConfigActivity.this);
        Api_calling.getDoctorList(ConfigActivity.this,item_top_view,mySharedPrefrence);
        gender = (MaterialSpinner) findViewById(R.id.gender);
        bloodGp = (MaterialSpinner) findViewById(R.id.bloodgp);
        doctor = (MaterialSpinner) findViewById(R.id.doctorList);



        gnderList.add("Female");
        gnderList.add("Male");
        gnderList.add("Other");



        bloodList.add("A+");
        bloodList.add("B+");
        bloodList.add("B-");
        bloodList.add("O+");
        bloodList.add("AB+");


        hospital.setText(mySharedPrefrence.getHospital());
        multi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setMultiChoice();
            }
        });
        SpinnerHandler.SpinnerHandler(ConfigActivity.this,gender,gnderList,"b");
        SpinnerHandler.SpinnerHandler(ConfigActivity.this,bloodGp,bloodList,"H");
//        if(Api_calling.arrayhospital.size()>=0)
//        {
            SpinnerHandler.SpinnerHandler(ConfigActivity.this,doctor,Api_calling.arrayhospital,"H");
//        }
        Comman.log("Size  of Array is that" ,":"+Api_calling.arrayhospital.size());




//        hospital = (MaterialSpinner) findViewById(R.id.hospital);
//        Api_calling.getHospitalList(ConfigActivity.this,item_top_view,hospital);
//        bed.setItems("1", "2", "3", "4", "5");
//        bed.setOnItemSelectedListener(new MaterialSpinner.OnItemSelectedListener<String>() {
//
//            @Override
//            public void onItemSelected(MaterialSpinner view, int position, long id, String item) {
//                  bedid=item;
//                Snackbar.make(view, "Clicked " + item, Snackbar.LENGTH_LONG).show();
//            }
//        });
//        Comman.log("ffff",Api_calling.arrayhospital.toString());
//        Comman.log("ffff",Api_calling.arraybed.toString());
//        SpinnerHandler.SpinnerHandler(ConfigActivity.this,bed,Api_calling.arraybed,"b");
//        SpinnerHandler.SpinnerHandler(ConfigActivity.this,hospital,Api_calling.arrayhospital,"H");
//        final EditText editText= findViewById(R.id.date);
//        final EditText time= findViewById(R.id.time);
//        editText.setFocusable(false);
//       editText.setClickable(true);
//        hospital.setOnItemSelectedListener(new MaterialSpinner.OnItemSelectedListener<String>() {
//
//            @Override
//            public void onItemSelected(MaterialSpinner view, int position, long id, String item) {
//                bedid=item;
//                Snackbar.make(view, "Clicked " + item, Snackbar.LENGTH_LONG).show();
//            }
//        });
//      time.setFocusable(false);
//       time.setClickable(true);
//        time.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//                final Calendar cldr = Calendar.getInstance();
//                int hour= cldr.get(Calendar.HOUR_OF_DAY);
//                int minute = cldr.get(Calendar.MINUTE);
//               boolean hr24= true;
//                TimePickerDialog pickerDialog= new TimePickerDialog(ConfigActivity.this, new TimePickerDialog.OnTimeSetListener() {
//                    @Override
//                    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
//                          time.setText(hourOfDay+":"+minute);
//                    }
//                },hour,minute,hr24);
//
//                pickerDialog.show();
//
//            }
//        });
//        editText.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//                final Calendar cldr = Calendar.getInstance();
//                int day = cldr.get(Calendar.DAY_OF_MONTH);
//                int month = cldr.get(Calendar.MONTH);
//                int year = cldr.get(Calendar.YEAR);
//                DatePickerFragmentDialog datePickerFragmentDialog=DatePickerFragmentDialog.newInstance(new DatePickerFragmentDialog.OnDateSetListener() {
//                    @Override
//                    public void onDateSet(DatePickerFragmentDialog view, int year, int monthOfYear, int dayOfMonth) {
//                       editText.setText(dayOfMonth + "/" + (monthOfYear + 1) + "/" + year);
//
//
//                    }
//                },year, month, day);
//                datePickerFragmentDialog.show(getSupportFragmentManager(),null);
//                datePickerFragmentDialog.setMaxDate(System.currentTimeMillis());
//                datePickerFragmentDialog.setYearRange(1900,year);
//                datePickerFragmentDialog.setCancelColor(getResources().getColor(R.color.colorPrimaryDark));
//                datePickerFragmentDialog.setOkColor(getResources().getColor(R.color.colorPrimary));
//                datePickerFragmentDialog.setAccentColor(getResources().getColor(R.color.colorAccent));
////                datePickerFragmentDialog.setOkText(getResources().getString(R.string.ok_dob));
////                datePickerFragmentDialog.setCancelText(getResources().getString(R.string.cancel_dob));
//
//
//
//
//
//
////                final Calendar cldr = Calendar.getInstance();
////                int day = cldr.get(Calendar.DAY_OF_MONTH);
////                int month = cldr.get(Calendar.MONTH);
////                int year = cldr.get(Calendar.YEAR);
////                // date picker dialog
////                MaterialDatePicker.Builder<Long> builder = MaterialDatePicker.Builder.datePicker();
//////                builder.setTitleText(R.string.your_text);
////                MaterialDatePicker<Long> picker = builder.build();
////                picker.show(getSupportFragmentManager(), picker.toString());
//////                picker = new DatePickerDialog(ConfigActivity.this,
//////                        new DatePickerDialog.OnDateSetListener() {
//////                            @Override
//////                            public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
//////                                editText.setText(dayOfMonth + "/" + (monthOfYear + 1) + "/" + year);
//////                            }
//////                        }, year, month, day);
//////                picker.show();
//            }
//        });




//        lgout.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                mySharedPrefrence.clearData();
//                startActivity(new Intent(ConfigActivity.this, LoginActivity.class));
//            }
//        });
        lgout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final SweetAlertDialog alertDialog= new SweetAlertDialog(ConfigActivity.this, SweetAlertDialog.WARNING_TYPE);
//                                    alertDialog.getButton(SweetAlertDialog.BUTTON_CONFIRM).setBackgroundColor(getResources().getColor(R.color.signinbuttoncolor));
                alertDialog.setTitleText("Do you Want Logout")
                        .setConfirmText("Yes").setCancelText("No").setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                    @Override
                    public void onClick(SweetAlertDialog sweetAlertDialog) {
                        mySharedPrefrence.clearData();
                startActivity(new Intent(ConfigActivity.this, LoginActivity.class));
                        alertDialog.dismissWithAnimation();
                        finish();
                    }
                }).setCancelClickListener(new SweetAlertDialog.OnSweetClickListener() {
                    @Override
                    public void onClick(SweetAlertDialog sweetAlertDialog) {
//                        System.exit(0); //for release "mBluetoothDevices" on key_back down
//                        mBtController.unregisterBroadcastReceiver(MainActivity.this);
                        alertDialog.dismissWithAnimation();
                    }
                });
                alertDialog.show();
            }
        });
//        bck1.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                mySharedPrefrence.clearData();
//                startActivity(new Intent(ConfigActivity.this, LoginActivity.class));
//            }
//        });
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Comman.log("1",""+name);
                if(Validation.isFilled(name)&&Validation.isFilled(age)&&Validation.isFilled(room)&&Validation.isFilled(bed)&&Validation.isFilled(hospital)&&(!gender.getText().toString().equalsIgnoreCase("Select")) && !multi.getText().toString().equalsIgnoreCase("")){
                    Comman.log("INSIDE","INSIDE");
                    Api_calling.addPatient(ConfigActivity.this,item_top_view,jsonObject(mySharedPrefrence.getId()));
                }else {Comman.show_Real_Message(ConfigActivity.this,item_top_view, Constant.PLEASE_FILL_ALL_FIELD);}
            }
        });


}
public JSONObject jsonObject(String usertype)
{
    Comman.log("Nurse Id",mySharedPrefrence.getNurseId());
    JSONObject jsonObject=new JSONObject();
    try {
//        doctorIdArray=new JSONArray();
        nurseIdArray=new JSONArray();
        mySharedPrefrence.setDoctorId1(Api_calling.macHash.get(doctor.getText().toString().trim()));
        mySharedPrefrence.setPatientAge(age.getText().toString());
        mySharedPrefrence.setPatientBed(bed.getText().toString());
//        mySharedPrefrence.setPatientHospital(Api_calling.arrayhospital.get(0));
        mySharedPrefrence.setDoctorId1(Api_calling.macHash.get(doctor.getText().toString().trim()));
        mySharedPrefrence.setDoctorName(multi.getText().toString().trim());
        jsonObject.put("Usertype_Id",usertype).put("age",age.getText().toString()).put("PatientName",name.getText().toString())
                .put("DeviceMac",getIP()).put("Bed_Number",bed.getText().toString()).put("roomNumber",room.getText().toString())
                .put("usercreate",mySharedPrefrence.getUserType()).put("DoctorId",doctorIdArray)
                .put("hospitalId",mySharedPrefrence.getHospitalId()).put("startdate","2019-12-12 11:11:03").put("gender",gender.getSelectedIndex()).put("BloodGroup",bloodGp.getText().toString())
                .put("heartRate",heartRate.put("upper","120").put("lower","80").put("status","true")).put("spo2",spo2.put("upper","120").put("lower","80").put("status","true")
        ).put("pulseRate",pulseRate.put("upper","120").put("lower","80").put("status","true")).
                put("highPressure",highPressure.put("upper","120").put("lower","80").put("status","true"))
                .put("lowPressure",lowPressure.put("upper","120").put("lower","80").put("status","true")).put("temperature",temp.put("upper","120").put("lower","80").put("status","true")).put("nurseId",
                nurseIdArray.put(Integer.valueOf(mySharedPrefrence.getNurseId())));

    }catch (Exception e){
        Comman.log("Add Patient Json Error",e.getMessage());
    }
    Comman.log("Add Patient Json",jsonObject.toString());
    return jsonObject;
}
    @Override
    public void onBackPressed() {
        super.onBackPressed();
//        startActivity(new Intent(ConfigActivity.this,SplashActivity.class));
        finishAffinity();
    }

    public String getIP()
    {

        WifiManager wm = (WifiManager) getSystemService(WIFI_SERVICE);
        String ipAddress = Formatter.formatIpAddress(
                wm.getConnectionInfo().getIpAddress());

        return ipAddress;
    }

    @Override
    protected void onStart() {
        super.onStart();
        Api_calling.getDoctorList(ConfigActivity.this,item_top_view,mySharedPrefrence);
    }


    public void setMultiChoice()
    {
        multi.setText("");
        doctorIdArray=new JSONArray();
        final ArrayList<String>value=new ArrayList<>();
        final String []str=new String[Api_calling.arrayhospital.size()];
        boolean []barray=new boolean[Api_calling.arrayhospital.size()];
        for (int i=0;i<Api_calling.arrayhospital.size();i++)
        {
            str[i]=Api_calling.arrayhospital.get(i);
            barray[i]=false;
        }
        CFAlertDialog.Builder builder = new CFAlertDialog.Builder(this);
        builder.setDialogStyle(CFAlertDialog.CFAlertStyle.ALERT);
        builder.setMessage("Select Doctor").setTextColor(Color.WHITE);
        builder.setMultiChoiceItems(str,barray, new DialogInterface.OnMultiChoiceClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int index, boolean b) {
                Comman.log("Selected",""+str[index]+" Status"+b);
                if(b)
                {
                 value.add(str[index]);
                 Comman.log("DoctorId",""+Api_calling.macHash.get(str[index]));
                 doctorIdArray.put(Integer.valueOf(Api_calling.macHash.get(str[index])));
                }else {
                    doctorIdArray.remove(index);
                    value.remove(str[index]);
                }
            }
        });
        builder.addButton("  Ok   ", Color.parseColor("#ffffff"), Color.parseColor("#1e1e2f"), CFAlertDialog.CFAlertActionStyle.POSITIVE, CFAlertDialog.CFAlertActionAlignment.END, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
                Comman.log("DoctorId Final Arrya",""+doctorIdArray.toString());
                multi.setText(value.toString().replace("[","").replace("]","").trim());
            }
        });
        builder.show();
    }
}
