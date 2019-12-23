package com.monitor.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Space;

import com.google.android.material.snackbar.Snackbar;
import com.monitor.R;
import com.monitor.database.DataBase;
import com.monitor.http.Api_calling;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission_group.CAMERA;

public class SplashActivity extends AppCompatActivity {
    MySharedPrefrence mySharedPrefrence;
    LinearLayout r;
    DataBase db;
    Cursor c;
    private static final int PERMISSION_REQUEST_CODE = 200;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        r=findViewById(R.id.r);
        db=new DataBase(this, Constant.DB_NAME,null,Constant.DB_VERSION);
        c=db.fetchAllData();
        Comman.log("DATA_BASE_COUNT",c.getCount()+"");
        mySharedPrefrence=MySharedPrefrence.instanceOf(this);
        if(!mySharedPrefrence.getId().isEmpty()) {
            Api_calling.getCurrentPatient(SplashActivity.this, r, mySharedPrefrence);
        }
//        Api_calling.getDeviceList(SplashActivity.this,r);
//        requestPermissions();
//        if(!checkPermission()) {
//            requestPermission();
//        }
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Comman.log("SHARED_VALUE",""+mySharedPrefrence.getId());
                if(mySharedPrefrence.getUserType().isEmpty()) {
                    Intent intent = new Intent(SplashActivity.this, LoginActivity.class);
                    startActivity(intent);}else {
                    callActivity(mySharedPrefrence.getUserType().trim());
                }
//                }else if(c.getCount()!=0){
//                    Intent intent=new Intent(SplashActivity.this,MainActivity.class);
//                    startActivity(intent);
//                }
//                else if(!mySharedPrefrence.getUserType().isEmpty()){
//                }
            }
        },1000);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        finishAffinity();
    }


//    String[] perms = {"android.permission.FINE_LOCATION", "android.permission.CAMERA"};
//
//    int permsRequestCode = 200;
//
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case PERMISSION_REQUEST_CODE:
                if (grantResults.length > 0) {

                    boolean locationAccepted = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                    boolean cameraAccepted = grantResults[1] == PackageManager.PERMISSION_GRANTED;

                    if (locationAccepted && cameraAccepted)
                        Snackbar.make(r, "Permission Granted, Now you can access location data and camera.", Snackbar.LENGTH_LONG).show();
                    else {

                        Snackbar.make(r, "Permission Denied, You cannot access location data and camera.", Snackbar.LENGTH_LONG).show();

                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            if (shouldShowRequestPermissionRationale(ACCESS_FINE_LOCATION)) {
                                showMessageOKCancel("You need to allow access to both the permissions",
                                        new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                                                    requestPermissions(new String[]{ACCESS_FINE_LOCATION, CAMERA},
                                                            PERMISSION_REQUEST_CODE);
                                                }
                                            }
                                        });
                                return;
                            }
                        }

                    }
                }


                break;
        }
    }


    private void showMessageOKCancel(String message, DialogInterface.OnClickListener okListener) {
        new AlertDialog.Builder(SplashActivity.this)
                .setMessage(message)
                .setPositiveButton("OK", okListener)
                .setNegativeButton("Cancel", null)
                .create()
                .show();
    }

    private void requestPermission() {

        ActivityCompat.requestPermissions(this, new String[]{ACCESS_FINE_LOCATION, CAMERA}, PERMISSION_REQUEST_CODE);

    }
    private boolean checkPermission() {
        int result = ContextCompat.checkSelfPermission(getApplicationContext(), ACCESS_FINE_LOCATION);
        int result1 = ContextCompat.checkSelfPermission(getApplicationContext(), CAMERA);
        return result == PackageManager.PERMISSION_GRANTED && result1 == PackageManager.PERMISSION_GRANTED;
    }

    public void  callActivity(String value)
    {
        switch (value)
        {
            case "Doctor":
                Intent intent1 = new Intent(SplashActivity.this, UserDashboard.class);
                startActivity(intent1);
                break;
            case "Nurse":
                if(c.getCount()!=0) {
                    Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                    intent.putExtra("name",mySharedPrefrence.getPatientName());
                    intent.putExtra("age",mySharedPrefrence.getPatientAge());
                    intent.putExtra("hospital",mySharedPrefrence.getPatientHospital());
                    intent.putExtra("bed",mySharedPrefrence.getPatientBed());
                    startActivity(intent);
                }else {
                    Intent intent=new Intent(SplashActivity.this,ConfigActivity.class);
                    startActivity(intent);
                }
                break;
        }

    }

}
