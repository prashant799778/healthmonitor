package com.monitor.fragments;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.monitor.Adapter.DashboardAdapter;
import com.monitor.Adapter.Fragment_Adapter;
import com.monitor.Adapter.Hospital_Adapter;
import com.monitor.R;
import com.monitor.activities.LoginActivity;
import com.monitor.activities.MainActivity;
import com.monitor.http.Api_calling;
import com.monitor.http.Model.All_Hospital;
import com.monitor.http.Model.Live;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.PatientDetail;
import com.monitor.http.Model.Patient_Details;
import com.monitor.http.Model.Readings;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.ResultListener;
import com.monitor.widget.Lato_Regular_Font;
import com.ogaclejapan.smarttablayout.SmartTabLayout;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import java.util.ArrayList;


public class DashBoard_Fragment extends Base_Fragment implements ResultListener {
    ArrayList<PatientDetail> list;
    DashboardAdapter hospital_adapter;
    LinearLayoutManager manager;
    RecyclerView recyclerView;
    LinearLayout v;
    ImageButton lgout;
    Lato_Regular_Font bck1;
    MqttAndroidClient client;

    Lato_Regular_Font h_no,p_no;
    boolean isDetached=false;

    ResultListener resultListener;

    MySharedPrefrence sharedPrefrence;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view1=inflater.inflate(R.layout.fragment_dash_board_, container, false);
        this.resultListener = (ResultListener)this;
        h_no=view1.findViewById(R.id.t1);
        p_no=view1.findViewById(R.id.t2);
        lgout=view1.findViewById(R.id.bck);
        bck1=view1.findViewById(R.id.bck1);
        sharedPrefrence = MySharedPrefrence.instanceOf(getContext());
        connectMqtt(null);
        list=new ArrayList<>();
        manager=new LinearLayoutManager(getContext());
        recyclerView=view1.findViewById(R.id.reclycle);
        recyclerView.setLayoutManager(manager);
        v=view1.findViewById(R.id.v);
        hospital_adapter=new DashboardAdapter(getContext(),list, "", "");
        recyclerView.setAdapter(hospital_adapter);
        Api_calling.getDashBoardDetails(resultListener, getContext(),v,sharedPrefrence,hospital_adapter,list,h_no,p_no);
        ViewPager viewPager = (ViewPager) view1.findViewById(R.id.viewpager);
        final Fragment_Adapter adapter = new  Fragment_Adapter (
                this.getChildFragmentManager());
        viewPager.setAdapter(adapter);
        final SmartTabLayout viewPagerTab = (SmartTabLayout) view1.findViewById(R.id.viewpagertab);
        viewPagerTab.setViewPager(viewPager);

///////////////////////////////////////////Listeners////////////////////////////////////////////
        lgout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
             sharedPrefrence.clearData();
             startActivity(new Intent(getContext(), LoginActivity.class));
            }
        });
        bck1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sharedPrefrence.clearData();
                startActivity(new Intent(getContext(), LoginActivity.class));
            }
        });






        TextView view = (TextView) viewPagerTab.getTabAt(0);
        view.setTextColor(Color.RED);

        viewPagerTab.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }
            @Override
            public void onPageSelected(int position) {
                int count = adapter.getCount();
                for (int i = 0; i < count; i++) {
                    TextView view = (TextView) viewPagerTab.getTabAt(i);
                    view.setTextColor(Color.BLACK);
                }
                TextView view = (TextView) viewPagerTab.getTabAt(position);
                view.setTextColor(Color.RED);
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
        return view1;
    }


    public void connectMqtt(final LiveModel liveModel )
    { if(liveModel!=null){
        String clientId = MqttClient.generateClientId();
        client =
                new MqttAndroidClient(getContext(), Constant.SERVER_URL,
                        clientId);
        Comman.log("MQTTTT","Mqtt Client Id:"+clientId);
        try {
            if(client!=null && !client.isConnected()){
            IMqttToken token = client.connect();
            token.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    Comman.log("MQTTTT","SuccessFully");
//                    resultListener.onResult(li);
                       onResult(liveModel);

                }
                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    Comman.log("MQTTTT","Not Connection Established");
                    Comman.log("MQTTTT","Connection Error :"+exception);

                }
            });}
        } catch (MqttException e) {
            e.printStackTrace();
            Comman.log("Connection Error",":"+e);
        }
    }}
    public void sendData(JSONObject jsonObject)
    {
        Comman.log("Send Data Form My Side",":"+jsonObject);
        MqttMessage message = new MqttMessage();
        message.setPayload(jsonObject.toString().getBytes());
        try {
            client.publish("/h1/h1/d1/p1", message);
            client.publish("/h1/h1/d1/p2", message);
        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }

    public void getData(String hubId, String hospitalId, String doctorId, final LiveModel result)
    {
        Comman.log("MQTTTT!!!!!!!!!!!","getDataFunction");
        Comman.log("MQTTTT","getDataFunction");
//        String topic = "/"+hubId+"/"+hospitalId+"/"+doctorId+"/+";
        String topic = "/"+hubId+"/"+hospitalId+"/1/+";
//        String topic = "#";
        Comman.log("MQTTTT", ""+topic);
        int qos = 1;
        try {   if(client!=null){
            final IMqttToken subToken = client.subscribe(topic,qos);

            client.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {
                    Comman.log("MQTTTT",":Connection lost");
                }

                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {

                    Comman.log("MQTTTT",":Message received");
                    Gson gson=new GsonBuilder().create();
                    Readings readings = gson.fromJson(message.toString(), Readings.class);
                    updateData(readings);
                }
                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {

                }
            });
            subToken.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    // The message was published
                    Comman.log("MQTTTT","onSuccess Token "+subToken.toString());
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken,
                                      Throwable exception) {
                    Comman.log("MQTTTT","onFailure "+exception);
                    connectMqtt(result);
                    // The subscription could not be performed, maybe the user was not
                    // authorized to subscribe on the specified topic e.g. using wildcards

                }

            });}
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void disConnect()
    {
        try {
            IMqttToken disconToken = client.disconnect();
            disconToken.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    // we are now successfully disconnected
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken,
                                      Throwable exception) {
                    // something went wrong, but probably we are disconnected anyway
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onResult(LiveModel result) {
//        connectMqtt();
        if(client==null || !client.isConnected()){connectMqtt(result);}else{
        if (result != null && result.getResult().size()>0)
        {
            list.clear();
            list.addAll(result.getResult().get(0).getPatientDetails());
            hospital_adapter.notifyDataSetChanged();
            for (int i=0; i<result.getResult().size(); i++)
            {
                if(result.getResult().get(i).getHubId() != null && result.getResult().get(i).getHospitalId() != null);
                    getData(""+result.getResult().get(i).getHubId(), ""+result.getResult().get(i).getHospitalId(), sharedPrefrence.getDoctorId(),result);
            }
        }}
    }


    public void updateData(Readings readings)
    {
//        Comman.log("MATCHING", "UPDATE DATA");
        for (int i=0; i<list.size(); i++)
        {
//            Comman.log("MATCHING", "MATCHING"+list.get(i).getPatientId()+" AND "+readings.getPatientId());
            if(Integer.valueOf(list.get(i).getPatientId()) == Integer.valueOf(readings.getPatientId())) {
//                Comman.log("MATCHING1", "MATCHING1"+list.get(i).getPatientId()+" AND "+readings.getPatientId());
                PatientDetail det = list.get(i);
                det.setHeartRate(""+readings.getECG().getHeartRate());
                det.setsPO2(readings.getSPO2().getSPO2());
                det.setPulseRate(readings.getSPO2().getPulseRate());
                det.setRespRate(readings.getECG().getRespRate());
                list.set(i,det);
            }
            hospital_adapter.notifyDataSetChanged();
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();

        isDetached=true;
    }

    @Override
    public   void onPause() {
        super.onPause();
//        Comman.log("PPPPPP","LOOOO PAUSE");
//        if(!isDetached && client!=null && client.isConnected())
//        {     Comman.log("PPPPPP","LOOOO PAUSE");
//            try {
//                client.disconnect();
//                Comman.log("PPPPPP","LOOOO PAUSE DISCONNECT");
//            } catch (MqttException e) {
//                e.printStackTrace();
//            }
//        }
    }

}
