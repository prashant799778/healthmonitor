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

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission_group.CAMERA;

public class ConfigActivity extends BaseActivity {
   DatePickerDialog picker;
    EditTextFontGothamBook name,age,room,bed,hospital;
   LinearLayout item_top_view;
    ImageButton lgout;
    Lato_Regular_Font bck1;
   MaterialSpinner  gender,bloodGp,doctor;
   MySharedPrefrence mySharedPrefrence;
   ArrayList<String >gnderList,bloodList;
//   String bedid="";
//    String hospital_name="";
private static final int PERMISSION_REQUEST_CODE = 200;

    Button save;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_config);
        item_top_view=findViewById(R.id.top_view);
        save=findViewById(R.id.LoginButton);
        name=findViewById(R.id.name);
        age=findViewById(R.id.age);
        room=findViewById(R.id.roomNo);
        lgout=findViewById(R.id.bck);
        bck1=findViewById(R.id.bck1);
        bed=findViewById(R.id.bedno);
        hospital=findViewById(R.id.hospitalname);
        gnderList=new ArrayList<>();
        bloodList=new ArrayList<>();
        mySharedPrefrence=MySharedPrefrence.instanceOf(ConfigActivity.this);
        gender = (MaterialSpinner) findViewById(R.id.gender);
        bloodGp = (MaterialSpinner) findViewById(R.id.bloodgp);
        doctor = (MaterialSpinner) findViewById(R.id.doctorList);
        gnderList.add("Male");
        gnderList.add("Female");
        gnderList.add("Other");

        bloodList.add("A+");
        bloodList.add("B+");
        bloodList.add("B-");
        bloodList.add("O+");
        bloodList.add("AB+");
        hospital.setText(mySharedPrefrence.getHospital());
        SpinnerHandler.SpinnerHandler(ConfigActivity.this,gender,gnderList,"b");
        SpinnerHandler.SpinnerHandler(ConfigActivity.this,bloodGp,bloodList,"H");
        SpinnerHandler.SpinnerHandler(ConfigActivity.this,doctor,Api_calling.arrayhospital,"H");
        Api_calling.getDoctorList(ConfigActivity.this,item_top_view,mySharedPrefrence);



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




        lgout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mySharedPrefrence.clearData();
                startActivity(new Intent(ConfigActivity.this, LoginActivity.class));
            }
        });
        bck1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mySharedPrefrence.clearData();
                startActivity(new Intent(ConfigActivity.this, LoginActivity.class));
            }
        });
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Comman.log("1",""+name);
                if(Validation.isFilled(name)&&Validation.isFilled(age)&&Validation.isFilled(room)&&Validation.isFilled(bed)){
                    Comman.log("INSIDE","INSIDE");
                    Api_calling.addPatient(ConfigActivity.this,item_top_view,jsonObject(mySharedPrefrence.getId()));
                }else {Comman.show_Real_Message(ConfigActivity.this,item_top_view, Constant.PLEASE_FILL_ALL_FIELD);}
            }
        });

}
public JSONObject jsonObject(String usertype)
{
    JSONObject jsonObject=new JSONObject();
    try {mySharedPrefrence.setDoctorId(Api_calling.macHash.get(doctor.getText().toString().trim()));
        mySharedPrefrence.setPatientAge(age.getText().toString());
        mySharedPrefrence.setPatientBed(bed.getText().toString());
        mySharedPrefrence.setPatientHospital(Api_calling.arrayhospital.get(0));
        jsonObject.put("Usertype_Id",usertype).put("PatientName",name.getText().toString()).put("DeviceMac",getIP()).put("Bed_Number",bed.getText().toString()).put("usercreate",mySharedPrefrence.getUserType()).put("DoctorID",Api_calling.macHash.get(doctor.getText().toString().trim())).put("hospital_Name",mySharedPrefrence.getHospital()).put("startdate","2019-12-12 11:11:03").put("BloodGroup",bloodGp.getText().toString());

    }catch (Exception e){
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
}
