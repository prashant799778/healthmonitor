package com.monitor.fragments;

import android.content.Intent;
import android.os.Bundle;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ProgressBar;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.monitor.Adapter.DashboardAdapter;
import com.monitor.Adapter.Fragment_Adapter;
import com.monitor.R;
import com.monitor.activities.LoginActivity;
import com.monitor.http.Api_calling;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.PatientDetail;

import com.monitor.http.Model.Readings.Readings;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.ResultListener;
import com.monitor.widget.Lato_Regular_Font;
import com.ogaclejapan.smarttablayout.SmartTabLayout;


import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.util.ArrayList;


public class DashBoard_Fragment extends Base_Fragment implements ResultListener {
    ArrayList<PatientDetail> list;
    DashboardAdapter hospital_adapter;
    LinearLayoutManager manager;
    RecyclerView recyclerView;
    ProgressBar progressBar;
    LinearLayout v;
    SmartTabLayout viewPagerTab;
    ImageButton lgout;
    Lato_Regular_Font bck1;
    ViewPager viewPager;
    public static MqttAsyncClient client;
    Lato_Regular_Font h_no,p_no;
    boolean isDetached=false;
    ResultListener resultListener;
    String topicId="";
    MySharedPrefrence sharedPrefrence;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view1=inflater.inflate(R.layout.fragment_dash_board_, container, false);
        Comman.log("start","start");
        this.resultListener = (ResultListener)this;
        h_no=view1.findViewById(R.id.t1);
        p_no=view1.findViewById(R.id.t2);
        lgout=view1.findViewById(R.id.bck);
        bck1=view1.findViewById(R.id.bck1);
        progressBar=view1.findViewById(R.id.pb);
        sharedPrefrence = MySharedPrefrence.instanceOf(getContext());
        list=new ArrayList<>();
        manager=new LinearLayoutManager(getContext());
        recyclerView=view1.findViewById(R.id.reclycle);
        recyclerView.setLayoutManager(manager);
        v=view1.findViewById(R.id.v);
          viewPagerTab = (SmartTabLayout) view1.findViewById(R.id.viewpagertab);
         viewPager = (ViewPager) view1.findViewById(R.id.viewpager);
        Api_calling.getDashBoardDetails(resultListener, getContext(),v,sharedPrefrence,h_no,p_no,progressBar,recyclerView,sharedPrefrence.getDoctorId(),getActivity(),this,viewPagerTab,viewPager);
       if (Comman.isNetworkConnected(getContext()))
        connectMqtt(null);
        lgout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
             sharedPrefrence.clearData();
             startActivity(new Intent(getContext(), LoginActivity.class));
            }
        });
        return view1;
    }
    public void connectMqtt(final LiveModel liveModel )
    {
        String clientId = MqttAsyncClient.generateClientId();
        try {
            client =
                    new MqttAsyncClient(Constant.SERVER_JSON_URL,
                            clientId,null);
            client.connect();
//            client.reconnect();
//             while (!client.isConnected()){}
//            if(client.isConnected()==true){
            if(client.isConnected())
               client.subscribe(topicId,0);
                Comman.log("Connection ","True");
//                onResult(liveModel);
//            }else {
//                Comman.log("Connection","Null");
//            }
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void onResult(LiveModel result) {
    }
    @Override
    public void onDetach() {
        super.onDetach();
        isDetached=true;
    }

    @Override
    public   void onPause() {
        super.onPause();
    }

    @Override
    public void onStart() {
        super.onStart();
        Api_calling.getDashBoardDetails(resultListener, getContext(),v,sharedPrefrence,h_no,p_no,progressBar,recyclerView,sharedPrefrence.getDoctorId(),getActivity(),this,viewPagerTab,viewPager);
    }
}
