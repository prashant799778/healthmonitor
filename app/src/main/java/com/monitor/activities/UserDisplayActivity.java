package com.monitor.activities;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.monitor.R;
import com.monitor.http.Api_calling;
import com.monitor.http.Model.Readings.Readings;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.DataParser;
import com.monitor.util.MySharedPrefrence;
import com.monitor.widget.GothamBookFontForLable;
import com.monitor.widget.Lato_Regular;
import com.monitor.widget.Lato_Regular_Font;
import com.monitor.widget.WaveformView;


import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class UserDisplayActivity extends BaseActivity  {
    private TextView tvBtinfo;
    private TextView tvECGinfo;
    Lato_Regular_Font pname,p_age,p_location,p_bed_np;
    private TextView resp;
    private TextView tvSPO2info;
    private TextView pr;
    GothamBookFontForLable ss;
    Lato_Regular_Font alarm;
    private TextView tvTEMPinfo;
    String bph="--",bpl="--";
    private TextView tvNIBPinfo;
    private WaveformView wfSpO2;
    private WaveformView wfECG;
    MqttAsyncClient client_json,client_ecg,mqtt_Notifiaction;
    SweetAlertDialog dialog;
    ProgressBar progressBar;
    Lato_Regular send,show;
    String hubId="",hospitalId="";
    int old=0,old0=0;
    DataParser parser;
    GothamBookFontForLable ss1;
    AssetFileDescriptor afd,afd1;
    String topic1d="",ecgValue="--",respValue="--";
    String spo2Text="",plus="",temp="";
//    boolean hrboolean=false,bhHigh=false,bhLow=false,sop2=false,pulseRateBoolean=false,tempBoolean=false;
    boolean isHeartRatHigh=false,isHeartRatLow=false,isSpo2High=false,isSpo2Low=false,isPulseRateHigh=false,isPulseRateLow=false,isTempHigh=false,isTempLow=false,isBpHighUpper=false,isBpLowUpper=false,isBpHighLower=false,isBpLowLower=false;
    String name="",age="",hosptal="",bed="",id="";
    MySharedPrefrence m;
    MediaPlayer player;
    MediaPlayer player1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_display);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        m=MySharedPrefrence.instanceOf(UserDisplayActivity.this);
        dialog= new SweetAlertDialog(UserDisplayActivity.this, SweetAlertDialog.PROGRESS_TYPE).setTitleText("Waiting for the Response...");
        dialog.show();



        try {
            afd = UserDisplayActivity.this.getAssets().openFd("beep1.mp3");
            player = new MediaPlayer();
            player.setDataSource(afd.getFileDescriptor(),afd.getStartOffset(),afd.getLength());
            player.prepare();
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        try {
            afd1 = UserDisplayActivity.this.getAssets().openFd("beep.mp3");
            player1 = new MediaPlayer();
            player1.setDataSource(afd1.getFileDescriptor(),afd1.getStartOffset(),afd1.getLength());
            player1.prepare();
            Comman.log("Alarm","Alarm");
        } catch (IOException e) {
            e.printStackTrace();
        }




        Intent intent=getIntent();
        if(intent!=null)
        {
            name=intent.getStringExtra("name");
            age=intent.getStringExtra("age");
            hosptal=intent.getStringExtra("hospital");
            bed=intent.getStringExtra("bed");
            id=intent.getStringExtra("id");
            hubId=intent.getStringExtra("hubId");
            hospitalId=intent.getStringExtra("hospitalId");
        }
        if (true)
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        else
            getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        tvBtinfo = (TextView) findViewById(R.id.connect);
        tvECGinfo = (TextView) findViewById(R.id.tvECGinfo);
        tvSPO2info = (TextView) findViewById(R.id.tvSPO2info);
        tvTEMPinfo = (TextView) findViewById(R.id.tvTEMPinfo);
        tvNIBPinfo = (TextView) findViewById(R.id.tvNIBPinfo);
        resp = (TextView) findViewById(R.id.resp);
        alarm=findViewById(R.id.alarm);
        ss=findViewById(R.id.ss);
        ss1=findViewById(R.id.ss1);
        wfSpO2 = (WaveformView) findViewById(R.id.wfSp02);
        wfECG = (WaveformView) findViewById(R.id.wfECG);
        pr = (TextView) findViewById(R.id.pr);
        pname=findViewById(R.id.p_name);
        p_age=findViewById(R.id.age);
        send=findViewById(R.id.send);
        show=findViewById(R.id.show);
        p_location=findViewById(R.id.location);
        p_bed_np=findViewById(R.id.bedNo);
        pname.setText(name);
        p_age.setText("Age "+age);
        p_location.setText(hosptal);
        p_bed_np.setText("Bed No."+bed);
        tvSPO2info.setText("--");
        pr.setText("--");
        String text = "<p>SPO<sub>2</sub></p>";
        ss.setText(Html.fromHtml(text));
        String text1 = "<p>SPO<sub>2</sub>(%)</p>";
        ss1.setText(Html.fromHtml(text1));



                send.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        sendNotification();
                    }
                });
        show.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showMessageList();
            }
        });
//        topic1d="/"+hubId+"/"+hospitalId+"/"+mySharedPrefrence.getDoctorId()+"/"+id;
        topic1d=""+id;
        Comman.log("TopicId",""+topic1d);
        if (Comman.isNetworkConnected(UserDisplayActivity.this)){
        connectMqtt_Json();
        connectMqtt_Ecg();
        connect_Notification_MQTT();}
        pname.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(UserDisplayActivity.this,UserDashboard.class));
            }
        });
    }
    public void connectMqtt_Json()
    {
        String clientId=MqttAsyncClient.generateClientId();
        try {
            client_json=new MqttAsyncClient(Constant.SERVER_JSON_URL,clientId,null);
            client_json.connect();
            while (!client_json.isConnected()){}
            if(client_json.isConnected()){
            getJsonData();
            Comman.log("Connection Established","JSON");
            }else {}
        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }


    public void connect_Notification_MQTT()
    {
        String clientId=MqttAsyncClient.generateClientId();
        try {
            mqtt_Notifiaction=new MqttAsyncClient(Constant.SERVER_JSON_URL,clientId,null);
            mqtt_Notifiaction.connect();
            Comman.log("Connect Successfully","Notification");
        } catch (MqttException ex) {
            ex.printStackTrace();
        }


    }


    public void connectMqtt_Ecg()
    {
        String clientId=MqttAsyncClient.generateClientId();
        try {
            client_ecg=new MqttAsyncClient(Constant.SERVER_ECG_URL,clientId,null);
            client_ecg.connect();
            while (!client_ecg.isConnected()){}
            if(client_ecg.isConnected()){
                Comman.log("Connection Established","ECG");
            getEcgData();
            }else {connectMqtt_Ecg();
                Comman.log("Connection Not Established","ECG");
                System.exit(0);
            }
        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }
    public void getJsonData()
    {
        try {
            if(client_json!=null&&client_json.isConnected()) {
                dialog.dismiss();
                client_json.subscribe(topic1d, 0);
                client_json.subscribe(topic1d + "/spo2", 0);
                Comman.log("Topic For Json", topic1d);
                client_json.setCallback(new MqttCallback() {
                    @Override
                    public void connectionLost(Throwable cause) {
                        Comman.log("MQTT", "Connection Lost_JSon_Client_");
                    }

                    @Override
                    public void messageArrived(String topic, final MqttMessage message) throws Exception {
                        Comman.log("MQTT", "Topic_Id=" + topic + "From_Server_JSon_Client" + message);
                        if (topic.equalsIgnoreCase(topic1d)) {
                            UserDisplayActivity.this.runOnUiThread(new Runnable(){
                                public void run() {
                                    Gson gson=new GsonBuilder().create();
                                    Readings readings = gson.fromJson(message.toString(), Readings.class);
                                    setData(readings);                                }
                            });
                        } else {
                            UserDisplayActivity.this.runOnUiThread(new Runnable(){
                                public void run() {
                                    wfSpO2.addAmp(Integer.valueOf(message.toString()));

                                }
                            });

                        }
                        dialog.dismiss();

                    }

                    @Override
                    public void deliveryComplete(IMqttDeliveryToken token) {

                    }
                });
            }

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
    public void getEcgData()
    {
        dialog.dismiss();
        Comman.log("Tpoic",""+topic1d);
        try {
            client_ecg.subscribe(topic1d+"/ecg",0);
            client_ecg.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {
                    Comman.log("MQTT","Connection Lost_Ecg_Client");
                }
                @Override
                public void messageArrived(String topic, final MqttMessage message) throws Exception {
                    Comman.log("MQTTuuuuuuuuu","Topic_Id_From_Server_Ecg_Client"+message);
                    UserDisplayActivity.this.runOnUiThread(new Runnable(){
                        public void run() {
                            wfECG.addAmp(Integer.valueOf(message.toString()));

                        }
                    });
                }
                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {

                }
            });


        } catch (MqttException e) {
            e.printStackTrace();
        }

    }
    public void setData(final Readings readings)
    {

         ////////////////////////////////////////Start Spo2////////////////////////////////////
            if(readings.getSPO2().getSPO2().equalsIgnoreCase(""))
            {
                tvSPO2info.setText(spo2Text);
            }else {
                tvSPO2info.setText(""+readings.getSPO2().getSPO2());
                spo2Text=String.valueOf(readings.getSPO2().getSPO2());

            }
        if(readings.getSPO2().getSPO2().equalsIgnoreCase(""))
        {
            pr.setText(plus);
        }else {
            pr.setText(""+readings.getSPO2().getPulseRate1());
            plus=String.valueOf(readings.getSPO2().getPulseRate1());

        }


        if(!readings.getSPO2().getPulseRate1().equalsIgnoreCase("")){
        if(readings.getSPO2().getPulseRate1()!=null && Integer.parseInt(readings.getSPO2().getPulseRate1())>0 && Integer.parseInt(readings.getSPO2().getPulseRate1())<255)
        {
            if(!player.isPlaying())
            start_HR_Alarm(UserDisplayActivity.this);
        }
        }

//        if(!readings.getSPO2().getSPO2().isEmpty() && !readings.getSPO2().getSPO2().isEmpty() && Integer.parseInt(readings.getSPO2().getSPO2())!=127 && Integer.parseInt(readings.getSPO2().getPulseRate1())!=255) {
//            if ((!m.getHighSpo2().isEmpty() && Integer.parseInt(readings.getSPO2().getSPO2()) > Integer.valueOf(m.getHighSpo2()))) {
//                sop2=true;
//            } else if ((!m.getLowSpo2().isEmpty() && Integer.parseInt(readings.getSPO2().getSPO2()) <= Integer.valueOf(m.getLowSpo2()))) {
//                sop2=true;
//            }else {
//                sop2=false;
//            }
//            if ((!m.getHighPulseRate().isEmpty() && Integer.parseInt(readings.getSPO2().getPulseRate1()) > Integer.valueOf(m.getHighPulseRate()))) {
//                pulseRateBoolean=true;
//            } else if ((!m.getLowPulseRate().isEmpty() && Integer.parseInt(readings.getSPO2().getPulseRate1()) <= Integer.valueOf(m.getLowPulseRate()))) {
//                pulseRateBoolean=true;
//            }else {
//                pulseRateBoolean=false;
//            }
//        }else {
//
//        }




        //////////////////////////////////////////End Spo2/////////////////////////////////////////////


        if(readings.getECG().getHeartRate().isEmpty()){
            tvECGinfo.setText(ecgValue);
        }else {
            tvECGinfo.setText(ecgValue);
            ecgValue=readings.getECG().getHeartRate();
        }

        if(readings.getECG().getRespRate().isEmpty()){
            resp.setText(respValue);
        }else {
            resp.setText(respValue);
            respValue=readings.getECG().getRespRate();
        }


        //////////////////////////////////////Start Temperature/////////////////////////////////////////////////////////
        if(readings.getTEMP().equalsIgnoreCase("")){
            tvTEMPinfo.setText(""+temp);
        }else {
            tvTEMPinfo.setText(""+readings.getTEMP());
            temp=readings.getTEMP();
        }

//        if((!m.getTempUpper().isEmpty() && !readings.getTEMP().equalsIgnoreCase("") && Float.valueOf(readings.getTEMP())>=Integer.valueOf(m.getTempUpper()))){
//            tempBoolean=true;
//        }else  if((!m.getTempLower().isEmpty() && !readings.getTEMP().equalsIgnoreCase("")&& Float.valueOf(readings.getTEMP())<=Integer.valueOf(m.getTempLower()))) {
//            tempBoolean=true;
//        }else {
//            tempBoolean=false;
//        }
        ///////////////////////////////////////////////End Temperature////////////////////////////////////////////////////////



        //////////////////////////////////////////////Start Blood Pressure/////////////////////////////////////////////////////
        if((readings.getNIBP().getHigh().equalsIgnoreCase("")||readings.getNIBP().getHigh().equalsIgnoreCase("0"))&&(readings.getNIBP().getLow().equalsIgnoreCase("")||(readings.getNIBP().getLow().equalsIgnoreCase("0")))) {
            tvNIBPinfo.setText(bph+ "/" +bpl);
        }else {
            bph=readings.getNIBP().getHigh();
            bpl=readings.getNIBP().getLow();
            tvNIBPinfo.setText(bph+ "/" +bpl);
        }




        UserDisplayActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                /////////////////////////////////Temperature//////////////////////////////////////////////////
                if(!readings.getTEMP().isEmpty()){
                    if(Float.parseFloat(readings.getTEMP())>readings.getTemperature().getUpper()){
                        isTempHigh=false;
                    }else if(Float.parseFloat(readings.getTEMP())<readings.getTemperature().getLower()){
                        isTempLow=false;
                    }else {
                        isTempLow=false;
                        isTempHigh=false;
                    }}else {
                    isTempLow=false;
                    isTempHigh=false;
                }
                //////////////////////////////////////////////////Blood Pressure///////////////////////////////
                Comman.log("UserDisplay",""+readings.getNIBP().getHigh()+"  1Low"+readings.getNIBP().getLow());
                if(!readings.getNIBP().getHigh().equalsIgnoreCase("0") && !readings.getNIBP().getLow().equalsIgnoreCase("0")) {
                    Comman.log("UserDisplay",""+readings.getNIBP().getHigh()+"  2Low"+readings.getNIBP().getLow());
                    if (!readings.getNIBP().getHigh().isEmpty() && !readings.getNIBP().getLow().isEmpty()) {
                        if (Integer.parseInt(readings.getNIBP().getHigh()) > Integer.parseInt(readings.getHighPressure().getUpper())) {
                            Comman.log("UserDisplay",""+readings.getNIBP().getHigh()+"  3Low"+readings.getHighPressure().getUpper());
                            isBpHighUpper = true;
                        } else if (Integer.parseInt(readings.getNIBP().getHigh()) < Integer.parseInt(readings.getHighPressure().getLower())) {
                            Comman.log("UserDisplay",""+readings.getNIBP().getHigh()+"  4Low"+readings.getHighPressure().getLower());
                            isBpHighLower = true;
                        } else {
                            isBpHighLower = false;
                            isBpHighUpper = false;
                        }
                        if (Integer.parseInt(readings.getNIBP().getLow()) > Integer.parseInt(readings.getLowPressure().getUpper())) {
                            Comman.log("UserDisplay",""+readings.getNIBP().getLow()+"  5Low"+readings.getLowPressure().getUpper());
                            isBpLowUpper = true;
                        } else if (Integer.parseInt(readings.getNIBP().getLow()) < Integer.parseInt(readings.getLowPressure().getLower())) {
                            Comman.log("UserDisplay",""+readings.getNIBP().getLow()+"  6Low"+readings.getLowPressure().getLower());
                            isBpLowLower = true;
                        } else {
                            isBpLowLower = false;
                            isBpLowUpper = false;
                        }
                    }
                    else {
                        isBpLowLower = false;
                        isBpHighLower = false;
                        isBpHighUpper = false;
                        isBpLowUpper = false;
                    }
                }else {
                    isBpLowLower = false;
                    isBpHighLower = false;
                    isBpHighUpper = false;
                    isBpLowUpper = false;
                }
                //////////////////////////////////////////////ECG//////////////////////////////////////////////////
                if(!readings.getECG().getHeartRate().equalsIgnoreCase("0") && !readings.getECG().getHeartRate().isEmpty()) {
                    if (Integer.parseInt(readings.getECG().getHeartRate()) > Integer.parseInt(readings.getHeartRate().getUpper())) {
                        isHeartRatHigh = true;
                    } else if (Integer.parseInt(readings.getECG().getHeartRate()) < Integer.parseInt(readings.getHeartRate().getLower())) {
                        isHeartRatLow = true;
                    } else {
                        isHeartRatLow = false;
                        isHeartRatHigh = false;
                    }
                }else {
                    isHeartRatLow = false;
                    isHeartRatHigh = false;
                }
                if(!readings.getSPO2().getSPO2().equalsIgnoreCase("0") && !readings.getSPO2().getSPO2().isEmpty() && !readings.getSPO2().getPulseRate1().equalsIgnoreCase("0") && !readings.getSPO2().getPulseRate1().isEmpty() ){
                    if(Integer.parseInt(readings.getSPO2().getSPO2())>readings.getSpo2().getUpper())
                    {
                        isSpo2High=true;
                    }else if(Integer.parseInt(readings.getSPO2().getSPO2())<readings.getSpo2().getLower()){
                        isSpo2Low=true;
                    }else {
                        isSpo2Low=false;
                        isSpo2High=false;
                    }
                    if(Integer.parseInt(readings.getSPO2().getPulseRate1())>Integer.parseInt(readings.getPulseRate().getUpper()))
                    {
                        isPulseRateHigh=true;
                    }else if(Integer.parseInt(readings.getSPO2().getPulseRate1())<Integer.parseInt(readings.getPulseRate().getLower())){
                        isPulseRateLow=true;
                    }
                    else {
                        isPulseRateHigh=false;
                        isPulseRateLow=false;
                    }}else {
                    isPulseRateHigh=false;
                    isPulseRateLow=false;
                    isSpo2Low=false;
                    isSpo2High=false;
                }
                setAlart();
//                checkVisibility();
            }
        });



//        if(!readings.getNIBP().getHigh().equalsIgnoreCase("") && !readings.getNIBP().getLow().equalsIgnoreCase("")){
//            if((!m.getHighPressureUpper().isEmpty() && Integer.valueOf(readings.getNIBP().getHigh())>=Integer.valueOf(m.getHighPressureUpper())))
//            {
//                bhHigh=true;
//            }
//            else if((!m.getHighPressureLower().isEmpty() &&Integer.valueOf(readings.getNIBP().getHigh())<=Integer.valueOf(m.getHighPressureLower()))){
//                bhHigh=true;
//            }else {
//                bhHigh=false;
//            }
//            if((!m.getLowPressureLower().isEmpty() && Integer.valueOf(readings.getNIBP().getLow())<=Integer.valueOf(m.getLowPressureLower())))
//            {
//                bhLow=true;
//            }else if((!m.getLowPressureUpper().isEmpty() && Integer.valueOf(readings.getNIBP().getLow())>=Integer.valueOf(m.getLowPressureUpper()))){
//                bhLow=true;
//            }else {
//                bhLow=false;
//            }
//        }
        //////////////////////////////////////////////End Blood Pressure/////////////////////////////////////////////////////
    }
    @Override
    protected void onPause() {
        super.onPause(); }
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        if(client_ecg.isConnected()&&client_ecg!=null && client_json.isConnected()&& client_json!=null && mqtt_Notifiaction.isConnected() && mqtt_Notifiaction!=null) {
            try {
                mqtt_Notifiaction.disconnect();
                client_ecg.disconnect();
                client_json.disconnect();
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
    }
    public void checkVisibility()
    {
        if(!isBpHighLower && !isBpHighUpper && !isBpLowLower && !isBpLowUpper && !isSpo2High && !isSpo2Low && !isHeartRatHigh && !isHeartRatLow && !isPulseRateHigh && !isPulseRateLow && !isTempHigh && !isTempLow)
        {
            alarm.setVisibility(View.GONE);
        }
    }
    public void setAlart()
    {
        final ArrayList<String> msg=new ArrayList<>();
        if(isBpHighLower)
        {
            if(!player1.isPlaying())
            startAlarm(UserDisplayActivity.this);
            msg.add("High Bp at Low");
        }
        if(isBpHighUpper){
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("High Bp at High");
        }
        if(isBpLowLower)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Low Bp at Low");
        }
        if(isBpLowUpper)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Low Bp at High");
        }
        if(isSpo2High)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Spo2 High");
        }
        if(isSpo2Low)
        {
            msg.add("Spo2 Low");
        }
        if(isHeartRatHigh)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Heart Rate high");
        }
        if(isHeartRatLow)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Heart Rate Low");
        }
        if(isPulseRateHigh)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Pulse Rate High");
        }
        if (isPulseRateLow)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Pulse Rate Low");
        }
        if(isTempHigh)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Temp High");
        }
        if(isTempLow)
        {
            if(!player1.isPlaying())
                startAlarm(UserDisplayActivity.this);
            msg.add("Temp Low");
        }
        if(msg.size()!=0){
            for(int i=0;i<msg.size();i++) {
                final int j=i;
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                            alarm.setText(msg.get(j));
                            alarm.setVisibility(View.VISIBLE);
                    }
                }, 20000*j+1);
            }}else {
            alarm.setVisibility(View.GONE);
        }

    }
    public void sendNotification()
    {
        Comman.log("Notification___","Inside");
            AlertDialog.Builder builder = new AlertDialog.Builder(UserDisplayActivity.this);
            LayoutInflater layoutInflater = LayoutInflater.from(UserDisplayActivity.this);
            View view2 = layoutInflater.inflate(R.layout.notification_layout, null);
            Button send = view2.findViewById(R.id.ok);
            final EditText editText = view2.findViewById(R.id.edit);
            final AlertDialog dialog = builder.create();
            dialog.setView(view2);
            dialog.show();
            send.setOnClickListener(new View.OnClickListener()
            {
                @Override
                public void onClick (View v){
                dialog.dismiss();
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("name", "" + m.getDoctorName()).put("email", "" + m.getDoctorEmail()).put("text", "" + editText.getText().toString()).put("doctorId", "" + m.getDoctorId()).put("PatientId", "" + topic1d);
                    Comman.log("Published Message Notification___TOPIC", "" + jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                String topicIdrr = "" + topic1d + "/Notification";
                Comman.log("TopicId", "" + topicIdrr);
                MqttMessage message = new MqttMessage();
                message.setQos(0);
                message.setPayload(String.valueOf(jsonObject).getBytes());
                try {
                    if (mqtt_Notifiaction != null && mqtt_Notifiaction.isConnected()) {
                        mqtt_Notifiaction.publish(topicIdrr, message);
                        Comman.log("Published Notification___TOPIC" + topicIdrr, "" + message);
                    } else {
                        Comman.log("Published ELSE__TOPIC" + topicIdrr, "" + message);
                    }
                } catch (MqttException ex) {
                    ex.printStackTrace();
                }
            }
            });
    }


    public void showMessageList()
    {
        final AlertDialog.Builder builder = new AlertDialog.Builder(UserDisplayActivity.this);
        LayoutInflater layoutInflater=LayoutInflater.from(UserDisplayActivity.this);
        View view2=layoutInflater.inflate(R.layout.message_history_layout,null);
        Button send=view2.findViewById(R.id.ok);
        ListView listView=view2.findViewById(R.id.list);
        TextView textView=view2.findViewById(R.id.nodata);
        ProgressBar progressBar=view2.findViewById(R.id.pb);
        final AlertDialog dialog=builder.create();
        dialog.setView(view2);
        dialog.show();
        Api_calling.getMessageList(UserDisplayActivity.this,listView,progressBar,dialog,m.getDoctorId(),topic1d,textView);
        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
            }
        });
    }
    private   void start_HR_Alarm(Context context)
    {
        Comman.log("START","ALERM");
//        try {
        player.start();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }


    private void startAlarm(Context context)
    {
        Comman.log("START","ALERM11");
        player1.start();
    }
}
