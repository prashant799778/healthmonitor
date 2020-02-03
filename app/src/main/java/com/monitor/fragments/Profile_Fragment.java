package com.monitor.fragments;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ProgressBar;

import com.monitor.R;
import com.monitor.activities.EditProfileActivity;
import com.monitor.activities.LoginActivity;
import com.monitor.activities.MainActivity;
import com.monitor.http.Api_calling;
import com.monitor.http.Model.Doctor_Details;
import com.monitor.http.Model.Patients;
import com.monitor.util.Comman;
import com.monitor.util.MySharedPrefrence;
import com.monitor.widget.Lato_Regular_Font;

import java.util.ArrayList;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class Profile_Fragment extends Base_Fragment {
    LinearLayout logout,edit;
    Lato_Regular_Font name,age,gender,email;
    MySharedPrefrence mySharedPrefrence;
    Profile_Fragment fragment;
    LayoutInflater layoutInflater;
    Lato_Regular_Font h1,h2,h3;
    ProgressBar progressBar;
    LinearLayout add,add1;
    LinearLayout v;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        View view=inflater.inflate(R.layout.fragment_profile_, container, false);
        mySharedPrefrence=MySharedPrefrence.instanceOf(getContext());
//        layoutInflater=LayoutInflater.from(getContext());
        name=view.findViewById(R.id.name);
        edit=view.findViewById(R.id.edit);
        fragment=new Profile_Fragment();
        email=view.findViewById(R.id.email);
        gender=view.findViewById(R.id.gender);
        age=view.findViewById(R.id.age);
        logout=view.findViewById(R.id.bck);
        v=view.findViewById(R.id.vvv);
        progressBar=view.findViewById(R.id.pb);
        h1=view.findViewById(R.id.total_p);
        h2=view.findViewById(R.id.total_h);
        h3=view.findViewById(R.id.total_hub);
        edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getActivity(), EditProfileActivity.class));
            }
        });
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final SweetAlertDialog alertDialog= new SweetAlertDialog(getContext(), SweetAlertDialog.WARNING_TYPE);
//                                    alertDialog.getButton(SweetAlertDialog.BUTTON_CONFIRM).setBackgroundColor(getResources().getColor(R.color.signinbuttoncolor));
                alertDialog.setTitleText("Do you Want Logout")
                        .setConfirmText("Yes").setCancelText("No").setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                    @Override
                    public void onClick(SweetAlertDialog sweetAlertDialog) {
                        mySharedPrefrence.clearData();
                        startActivity(new Intent(getActivity(),LoginActivity.class));
                        alertDialog.dismissWithAnimation();
                        getActivity().finish();
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
        return view;
    }
//    public void setData(ArrayList<Doctor_Details> list,LayoutInflater layoutInflater)
//    {
//        Comman.log("IIIIIIIIIIIIIIIIIIIIIIIIIIII","FFFFFFFFFFFFFFFFFFFFFFFFFFF");
//        View ed=layoutInflater.inflate(R.layout.item_font,null);
//        for(int i=0;i<list.size();i++)
//        {
//            Lato_Regular_Font f;
//            f=ed.findViewById(R.id.dynamicFont);
//            Doctor_Details p=list.get(i);
//            f.setText(p.getHospitalName());
//            f.setTag(i);
//            add.addView(ed);
//        }
//        name.setText("Name       "+mySharedPrefrence.getDoctorName());
//        email.setText("Email       "+mySharedPrefrence.getDoctorEmail());
//        setGender("1");
//    }
//    public void setGender(String id)
//    {
//        switch (id)
//        {
//            case "1" :
//                email.setText("Gender       "+"Male");
//                break;
//            case "0" :
//                email.setText("Gender       "+"Female");
//                break;
//        }
//    }

    @Override
    public void onStart() {
        super.onStart();
        Api_calling.getDoctorProfile(name,email,gender,age,getContext(),fragment,mySharedPrefrence,v,progressBar,h1,h2,h3);
        Api_calling.checkUserSession(getActivity(),getContext());
    }
}