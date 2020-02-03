package com.monitor.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.monitor.R;
import com.monitor.fragments.All_Patients_Fragment;
import com.monitor.fragments.DashBoard_Fragment;
import com.monitor.fragments.Hospital_Fragment;
import com.monitor.fragments.Profile_Fragment;
import com.monitor.util.Comman;

import java.util.ArrayList;

public class UserDashboard extends AppCompatActivity {
    DashBoard_Fragment df;
    Hospital_Fragment hf;
    Profile_Fragment profile;
    All_Patients_Fragment pf;
    ArrayList<Fragment> fmArray;
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    BottomNavigationView bottomNavigationView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_dashboard);
        df = new DashBoard_Fragment();
        hf = new Hospital_Fragment();
        pf = new All_Patients_Fragment();
        profile=new Profile_Fragment();
        fmArray = new ArrayList<>();
        fmArray.add(df);
        fmArray.add(hf);
        fmArray.add(pf);
        fmArray.add(profile);
        fragmentManager = getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();


        bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottom_navigation);


        fragmentManager = getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.framlayout, fmArray.get(0), "D");
        fragmentTransaction.commit();
        bottomNavigationView.setOnNavigationItemSelectedListener(

                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.home:
                                fragmentManager = getSupportFragmentManager();
                                fragmentTransaction = fragmentManager.beginTransaction();
                                fragmentTransaction.replace(R.id.framlayout, fmArray.get(0), "D");
                                fragmentTransaction.commit();
                                return true;
                            case R.id.bullhorn:
                                fragmentManager = getSupportFragmentManager();
                                fragmentTransaction = fragmentManager.beginTransaction();
                                fragmentTransaction.replace(R.id.framlayout, fmArray.get(1),"H");
                                fragmentTransaction.commit();
                                return true;

                            case R.id.disscuss:
                                fragmentManager = getSupportFragmentManager();
                                fragmentTransaction = fragmentManager.beginTransaction();
                                fragmentTransaction.replace(R.id.framlayout, fmArray.get(2),"P");
                                fragmentTransaction.commit();
                                return true;
                            case R.id.rocket_launch:
                                fragmentManager = getSupportFragmentManager();
                                fragmentTransaction = fragmentManager.beginTransaction();
                                fragmentTransaction.replace(R.id.framlayout, fmArray.get(3),"Profile");
                                fragmentTransaction.commit();
                                return true;

                        }
                        return true;
                    }
                });
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();
//        df = (DashBoard_Fragment) getSupportFragmentManager().findFragmentByTag("D");
        if (fmArray.get(0) != null && fmArray.get(0).isVisible()) {
            Comman.log("A","AAAAAAAAAAAAAAA");
            finishAffinity();
        } else {
            Comman.log("B","BBBBBBBBBBBBBBBBBBBBbbb");
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.framlayout, fmArray.get(0), "D");
            fragmentTransaction.commit();
            bottomNavigationView.getMenu().getItem(0).setChecked(true);
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        super.onActivityResult(requestCode, resultCode, data);
        // check if the request code is same as what is passed  here it is 2
        if(requestCode==2)
        {
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.framlayout, fmArray.get(2), "P");
            fragmentTransaction.commit();
        }
        else {
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.framlayout, fmArray.get(0), "D");
            fragmentTransaction.commit();
        }
    }


}
