package com.monitor.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.monitor.R;
import com.monitor.fragments.All_Patients_Fragment;
import com.monitor.fragments.DashBoard_Fragment;
import com.monitor.fragments.Hospital_Fragment;

import java.util.ArrayList;

public class UserDashboard extends AppCompatActivity {
    DashBoard_Fragment df;
    Hospital_Fragment hf;
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
        fmArray = new ArrayList<>();
        fmArray.add(df);
        fmArray.add(hf);
        fmArray.add(pf);

        fragmentManager = getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();


        bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottom_navigation);


        fragmentManager = getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.framlayout, fmArray.get(0), "Dashboard");
        fragmentTransaction.commit();


        bottomNavigationView.setOnNavigationItemSelectedListener(

                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.home:
                                fragmentManager = getSupportFragmentManager();
                                fragmentTransaction = fragmentManager.beginTransaction();
                                fragmentTransaction.replace(R.id.framlayout, fmArray.get(0), "Dashboard");
                                fragmentTransaction.commit();
                                return true;
                            case R.id.bullhorn:
                                fragmentManager = getSupportFragmentManager();
                                fragmentTransaction = fragmentManager.beginTransaction();
                                fragmentTransaction.replace(R.id.framlayout, fmArray.get(1));
                                fragmentTransaction.commit();
                                return true;

                            case R.id.disscuss:
                                fragmentManager = getSupportFragmentManager();
                                fragmentTransaction = fragmentManager.beginTransaction();
                                fragmentTransaction.replace(R.id.framlayout, fmArray.get(2));
                                fragmentTransaction.commit();
                                return true;
                            case R.id.rocket_launch:

                                return true;

                        }
                        return true;
                    }
                });
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        df = (DashBoard_Fragment) getSupportFragmentManager().findFragmentByTag("Dashboard");
        if (df != null && df.isVisible()) {
            finishAffinity();
        } else {
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.framlayout, fmArray.get(0), "Dashboard");
            fragmentTransaction.commit();
            bottomNavigationView.getMenu().getItem(0).setChecked(true);
        }
    }
}
