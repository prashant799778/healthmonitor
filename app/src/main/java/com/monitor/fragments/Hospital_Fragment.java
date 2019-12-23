package com.monitor.fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.monitor.Adapter.Hospital_Adapter;
import com.monitor.R;
import com.monitor.http.Api_calling;
import com.monitor.http.Model.All_Hospital;
import com.monitor.util.MySharedPrefrence;

import java.util.ArrayList;

public class Hospital_Fragment extends Base_Fragment {
    ArrayList<All_Hospital> list;
    Hospital_Adapter hospital_adapter;
    LinearLayoutManager manager;
    RecyclerView recyclerView;
    LinearLayout v;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view=inflater.inflate(R.layout.fragment_hospital_, container, false);
         list=new ArrayList<>();
         MySharedPrefrence mySharedPrefrence=MySharedPrefrence.instanceOf(getContext());
         manager=new LinearLayoutManager(getContext());
         recyclerView=view.findViewById(R.id.reclycle);
         recyclerView.setLayoutManager(manager);
         v=view.findViewById(R.id.v);
         hospital_adapter=new Hospital_Adapter(getContext(),list);
         recyclerView.setAdapter(hospital_adapter);
        Api_calling.getAllHospital(getContext(),v,mySharedPrefrence,hospital_adapter,list);


        return view;
    }

}