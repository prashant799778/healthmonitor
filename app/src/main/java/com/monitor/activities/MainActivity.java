package com.monitor.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.text.Html;
import android.text.format.Formatter;
import android.util.Log;
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
import android.widget.Toast;

import com.android.volley.misc.AsyncTask;
//import com.db.williamchart.data.DataPoint;
//import com.db.williamchart.view.LineChartView;
import com.google.android.material.snackbar.Snackbar;
import com.google.gson.JsonObject;
import com.monitor.R;
import com.monitor.bluetooth.BTController;
import com.monitor.dialogs.BluetoothDeviceAdapter;
import com.monitor.dialogs.SearchDevicesDialog;
import com.monitor.http.Api_calling;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.DataParser;
import com.monitor.util.ECG;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.NIBP;
import com.monitor.util.SpO2;
import com.monitor.util.Temp;
import com.monitor.util.WaveformViewTest;
import com.monitor.widget.GothamBookFontForLable;
import com.monitor.widget.Lato_Regular;
import com.monitor.widget.Lato_Regular_Font;
import com.monitor.widget.WaveformView;


import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

import cn.pedant.SweetAlert.SweetAlertDialog;
import io.socket.client.IO;
import io.socket.emitter.Emitter;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission_group.CAMERA;

public class MainActivity  extends BaseActivity implements BTController.Listener, DataParser.onPackageReceivedListener {

    private BTController mBtController;

    //UI
//    LineChartView gp;
    Lato_Regular_Font pname,p_age,p_location,p_bed_np,d_name;
    private LinearLayout btnBtCtr;
    private LinearLayout add;
    private LinearLayout bp;
    private LinearLayout logout;
    private TextView tvBtinfo;
    private TextView tvECGinfo;
    private TextView resp;
    private TextView tvSPO2info;
    JSONObject heartRate;
    JSONObject jsonObject;
    JSONObject spo2json;
    AssetFileDescriptor afd,afd1;
    JSONObject tempjson;
    JSONObject highPressure;
    GothamBookFontForLable ss,ss1;
    JSONObject pulseRate;
    JSONObject lowPressure;
    private TextView pr;
    private TextView tvTEMPinfo;
    private TextView tvNIBPinfo;
    String TAG="SmartICU_MainActivity";
    private LinearLayout llAbout;
    private TextView tvFWVersion;
    private TextView tvHWVersion;
    private WaveformView wfSpO2;
    private WaveformView wfECG;
    Lato_Regular_Font alarm,lead;
    MqttAsyncClient mqtt_Notifiaction;
    private Button cnt;
    JSONObject snd;
    Boolean isBeepSound=false,isAlermSound=false;
    JSONObject sp2;
    LinearLayout notification;
    JSONObject e;
    JSONObject bpp;
    JSONObject wave;
    JSONArray array;

    boolean isHeartRatHigh=false,isHeartRatLow=false,isSpo2High=false,isSpo2Low=false,isPulseRateHigh=false,isPulseRateLow=false,isTempHigh=false,isTempLow=false,isBpHighUpper=false,isBpLowUpper=false,isBpHighLower=false,isBpLowLower=false;
//boolean isHeartRatHigh=true,isHeartRatLow=true,isSpo2High=true,isSpo2Low=true,isPulseRateHigh=true,isPulseRateLow=true,isTempHigh=true,isTempLow=true,isBpHighUpper=true,isBpLowUpper=true,isBpHighLower=true,isBpLowLower=true;
    boolean tempboolean=false,ecgboolean=false,sop2boolean=false;
    MediaPlayer player;
    MediaPlayer player1;
    int s2=0;
    double tp=0;
    int plus_rate=0;
    int cuff=0;
    int hr=0,rp=0;
    int count=0;
    int ssss=0;
    String name="",age="",hosptal="",bed="";
    int data1=0,data2=0;
    MqttAsyncClient client_Json,client_Ecg;
    String topicId="";


    //    Socket socket;
//    int SocketServerPORT=5053;
//    String hostAddress="159.65.146.25";
    private static final String REQUEST_CONNECT_CLIENT = "request-connect-client";


    //Bluetooth
    BluetoothDeviceAdapter mBluetoothDeviceAdapter;
    SearchDevicesDialog mSearchDialog;
    ProgressDialog mConnectingDialog;
    ArrayList<BluetoothDevice> mBluetoothDevices;

    //data
//    io.socket.client.Socket socket;
    DataParser mDataParser;
    MySharedPrefrence m;
    LinearLayout r;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        m=MySharedPrefrence.instanceOf(MainActivity.this);
        try {
            afd = MainActivity.this.getAssets().openFd("peak.wav");
            player = new MediaPlayer();
            player.setDataSource(afd.getFileDescriptor(),afd.getStartOffset(),afd.getLength());
            player.prepare();
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        try {
            afd1 = MainActivity.this.getAssets().openFd("alarm.wav");
            player1 = new MediaPlayer();
            player1.setDataSource(afd1.getFileDescriptor(),afd1.getStartOffset(),afd1.getLength());
            player1.prepare();
            Comman.log("Alarm","Alarm");
        } catch (IOException e) {
            e.printStackTrace();
        }




        cnt = findViewById(R.id.cnt);
        d_name=findViewById(R.id.doctor);
        final Intent intent=getIntent();
        if(intent!=null)
        {
            name=intent.getStringExtra("name");
            age=intent.getStringExtra("age");
            hosptal=intent.getStringExtra("hospital");
            bed=intent.getStringExtra("bed");

        }
//        gp=findViewById(R.id.gp);
         heartRate=new JSONObject();
        spo2json=new JSONObject();
         tempjson=new JSONObject();
         highPressure=new JSONObject();
         lowPressure=new JSONObject();
         pulseRate=new JSONObject();
         jsonObject=new JSONObject();
        snd=new JSONObject();
        sp2=new JSONObject();
        e=new JSONObject();
        bpp=new JSONObject();
        wave=new JSONObject();
        array=new JSONArray();
        checkPermission();



        if(!Comman.isNetworkConnected(MainActivity.this)){
            Toast.makeText(MainActivity.this, ""+Constant.NO_INTERNET, Toast.LENGTH_LONG).show();
        }else {
        connectMqtt_JSon();
        connectMqtt_Ecg();
        cnnect_MQTT_Notification();
        }






//        connectMqtt_Spo2();
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (true)
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        else
            getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
//        cnt.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
////                connectToHost();
//               call();
//            }
//        });
        initData();
        initView();
//        final Handler handler= new Handler();
//        handler.postDelayed(new Runnable() {
//            @Override
//            public void run() {
////                Comman.log("RamdomValues","InsideMEthod");
//                wfSpO2.addAmp(randomValue());
//                handler.postDelayed(this,50);
//            }
//        },50);
    }
    private void initData() {
        Comman.log(TAG,":OnCreateMethod_INITDATA");
        // enable the Bluetooth Adapter
        mBtController = BTController.getDefaultBTController(this);
        mBtController.registerBroadcastReceiver(this);
        mBtController.enableBtAdpter();
        mDataParser = new DataParser(this);
        mDataParser.start();
    }

    private void initView() {
        //UI widgets
        Comman.log(TAG,":OnCreateMethod_INITVIEW");
        add = (LinearLayout) findViewById(R.id.add);
        logout=findViewById(R.id.logout);
        notification=findViewById(R.id.notification);
        bp=findViewById(R.id.pb);
        r=findViewById(R.id.r);
        pname=findViewById(R.id.p_name);
        p_age=findViewById(R.id.age);
        p_location=findViewById(R.id.location);
        p_bed_np=findViewById(R.id.bedNo);
        alarm=findViewById(R.id.alarm);
        lead=findViewById(R.id.lead);
        ss=findViewById(R.id.ss);
        ss1=findViewById(R.id.ss1);
        pname.setText(name);
        p_age.setText("Age "+age);
        p_location.setText(m.getHospital());
        p_bed_np.setText("Bed No."+bed);
        d_name.setText("Doctor - "+m.getDoctorName());
        String text = "<p>SPO<sub>2</sub></p>";
        ss.setText(Html.fromHtml(text));
        String text1 = "<p>SPO<sub>2</sub>(%)</p>";
        ss1.setText(Html.fromHtml(text1));
        Comman.log("Status","-------"+        m.isAlarmOn());
        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                mBtController.unregisterBroadcastReceiver(MainActivity.this);
//                    disconnect("/1/1/1/11");
//                throw new RuntimeException("Test Crash"); // Force a crash
                startActivity(new Intent(MainActivity.this, AlarmActivity.class));
//                setAlart();
//                if(!player1.isPlaying() && m.isAlarmOn())
//                    startAlarm(MainActivity.this);
            }
        });
        notification.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showMessageList();
            }
        });
        bp.setOnClickListener(new View.OnClickListener() {
            int i=0;
            @Override
            public void onClick(View v) {
                if(i==0){
                mBtController.write(DataParser.CMD_START_NIBP);i=1;}else {
                mBtController.write(DataParser.CMD_STOP_NIBP);i=0;}
            }
        });
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final SweetAlertDialog alertDialog= new SweetAlertDialog(MainActivity.this, SweetAlertDialog.WARNING_TYPE);
//                                    alertDialog.getButton(SweetAlertDialog.BUTTON_CONFIRM).setBackgroundColor(getResources().getColor(R.color.signinbuttoncolor));
                alertDialog.setTitleText("Do you want to Discharge this Patient")
                        .setConfirmText("Yes").setCancelText("No").setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                    @Override
                    public void onClick(SweetAlertDialog sweetAlertDialog) {
                        alertDialog.dismissWithAnimation();
                    }
                }).setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                    @Override
                    public void onClick(SweetAlertDialog sweetAlertDialog) {
//                        System.exit(0); //for release "mBluetoothDevices" on key_back down
                        Api_calling.dischargePatient(MainActivity.this,r,setJSon(),client_Ecg,client_Json,mBtController);
//                        startActivity(new Intent(MainActivity.this,ConfigActivity.class));
////                        System.exit(0); //for release "mBluetoothDevices" on key_back down
//                        mBtController.unregisterBroadcastReceiver(MainActivity.this);
                        alertDialog.dismissWithAnimation();
                    }
                });
                alertDialog.show();
//                setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
//                            @Override
//                            public void onClick(SweetAlertDialog sDialog) {
//                                sDialog.dismissWithAnimation();
////                                                    Intent intent=new Intent(context, Show.class);
////                                                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
////                                                    context. startActivity(intent);
//                            }
//                        })


            }
        });
        btnBtCtr = (LinearLayout) findViewById(R.id.bluetooth);
        btnBtCtr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!mBtController.isBTConnected()) {
                    mSearchDialog.show();
                    mSearchDialog.startSearch();
                    mBtController.startScan(true);
                } else {
                    mBtController.disconnect();
                    tvBtinfo.setText("");
                }
            }
        });
        tvBtinfo = (TextView) findViewById(R.id.connect);
        tvECGinfo = (TextView) findViewById(R.id.tvECGinfo);
        tvSPO2info = (TextView) findViewById(R.id.tvSPO2info);
        pr = (TextView) findViewById(R.id.pr);
        resp = (TextView) findViewById(R.id.resp);
        tvTEMPinfo = (TextView) findViewById(R.id.tvTEMPinfo);
        tvNIBPinfo = (TextView) findViewById(R.id.tvNIBPinfo);
//        llAbout = (LinearLayout) findViewById(R.id.llAbout);
//        tvFWVersion = (TextView) findViewById(R.id.tvFWverison);
//        tvHWVersion = (TextView) findViewById(R.id.tvHWverison);

        //Bluetooth Search Dialog
        mBluetoothDevices = new ArrayList<>();
        mBluetoothDeviceAdapter = new BluetoothDeviceAdapter(MainActivity.this, mBluetoothDevices);
        mSearchDialog = new SearchDevicesDialog(MainActivity.this, mBluetoothDeviceAdapter) {
            @Override
            public void onStartSearch() {
                mBtController.startScan(true);
            }

            @Override
            public void onClickDeviceItem(int pos) {
                Comman.log("GETTTTTTTTTTTTT","GETTTTTTTTTTTTT");
                BluetoothDevice device = mBluetoothDevices.get(pos);
                Log.d("DEVICE.......", device.getAddress() + "===" + device.getName() + "=======");
                mBtController.startScan(false);
                mBtController.connect(MainActivity.this, device);
                tvBtinfo.setText(device.getName() + ": " + device.getAddress());
                mConnectingDialog.show();
                mSearchDialog.dismiss();
            }
        };
        mSearchDialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialog) {
                mBtController.startScan(false);
            }
        });

        mConnectingDialog = new ProgressDialog(MainActivity.this);
        mConnectingDialog.setMessage("Connecting...");

        //About Information
//        llAbout.setOnClickListener(new View.OnClickListener() {
//@Override
//public void onClick(View v) {
//        mBtController.write(DataParser.CMD_FW_VERSION);
//        mBtController.write(DataParser.CMD_HW_VERSION);
//        }
//        });

        //SpO2 & ECG waveform
        wfSpO2 = (WaveformView) findViewById(R.id.wfSp02);
        wfECG = (WaveformView) findViewById(R.id.wfECG);
    }

    public void onClick(View v) {
        Log.d("BL.....", v.getId() + "");
        switch (v.getId()) {
            case R.id.bluetooth:
                if (!mBtController.isBTConnected()) {
                    mSearchDialog.show();
                    mSearchDialog.startSearch();
                    mBtController.startScan(true);
                } else {
//                    socket.disconnect();
//                    socket.close();
                    mBtController.disconnect();
                    tvBtinfo.setText("");
                }
                break;
//        case R.id.btnNIBPStart:
//        mBtController.write(DataParser.CMD_START_NIBP);
//        break;
//        case R.id.btnNIBPStop:
//        mBtController.write(DataParser.CMD_STOP_NIBP);
//        break;
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
//        finish();
//        disConnect();
//        System.exit(0); //for release "mBluetoothDevices" on key_back down
//        mBtController.unregisterBroadcastReceiver(this);
    }

    @Override
    protected void onStop() {
        super.onStop();
//        System.exit(0); //for release "mBluetoothDevices" on key_back down
//        mBtController.unregisterBroadcastReceiver(this);
    }

    //BTController implements
    @Override
    public void onFoundDevice(BluetoothDevice device) {
//    Log.d("BL....",device.getName());
        Comman.log("GGGGGGGGGGGGGGGGGGGGGgggg","GGGGGGGGGGGGGGGGGGGGGgggg");
        if (mBluetoothDevices.contains(device))
            return;
        mBluetoothDevices.add(device);
        mBluetoothDeviceAdapter.notifyDataSetChanged();
    }

    @Override
    public void onStopScan() {
        mSearchDialog.stopSearch();
    }

    @Override
    public void onStartScan() {
        mBluetoothDevices.clear();
        mBluetoothDeviceAdapter.notifyDataSetChanged();
    }

    @Override
    public void onConnected() {
        mConnectingDialog.setMessage("Connected √");
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mConnectingDialog.dismiss();
                    }
                });
            }
        }, 800);

        tvBtinfo.setText("Disconnect");
    }

    @Override
    public void onDisconnected() {
        tvBtinfo.setText("Search Devices");
    }

    @Override
    public void onReceiveData(byte[] dat) {
        mDataParser.add(dat);
    }


    //DataParser implements
    @Override
    public void onSpO2WaveReceived(int dat) {
        data1=dat;
        wfSpO2.addAmp(dat);
        sendSpo2(dat);
    }

    @Override
    public void onRespReceived(int dat) {

    }

    @Override
    public void onSpO2Received(final SpO2 spo2) {
        if(spo2.getPulseRate()>0 && spo2.getPulseRate()<255)
        {
           if(!player.isPlaying() && m.isAlarmOn())
               start_HR_Alarm(MainActivity.this);
        }
        runOnUiThread(new Runnable() {
            @Override
            public void run() {

                final ArrayList msg=new ArrayList();
                if(!tempboolean)
                {
                    msg.add("Temperature   unplugged  ");
                }
                if(!ecgboolean)
                {
                    msg.add("ECG:  unplugged ");
                }
                if(!sop2boolean)
                {
                    msg.add("Spo2  unplugged ");
                }
                if(msg.size()!=0){
                for(int i=0;i<msg.size();i++) {
                    final int j=i;
                    new Handler().postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            if (tempboolean) {
                                lead.setText(msg.get(j).toString());
                                lead.setVisibility(View.VISIBLE);
                                Comman.log("FFF",""+msg.get(j).toString());
                            }
                            lead.setVisibility(View.VISIBLE);
                        }
                    }, 10000*j+1);
                }}else {
                    lead.setVisibility(View.GONE);
                }
                if(spo2.getSpO2()!=127 && spo2.getPulseRate()!=255 && spo2.getPulseRate()!=0 && spo2.getPulseRate()!=0) {
                    sop2boolean=true;
                    if ((!m.getHighSpo2().isEmpty() && spo2.getSpO2() > Integer.valueOf(m.getHighSpo2()) && spo2.getSpO2() != 127)) {
                        isSpo2High=true;
                        alarm.setVisibility(View.VISIBLE);
                    } else if ((!m.getLowSpo2().isEmpty() && spo2.getSpO2() < Integer.valueOf(m.getLowSpo2()) && spo2.getSpO2() != 127)) {
                        isSpo2High=true;
                        alarm.setVisibility(View.VISIBLE);
                    }else {
                        isSpo2High=false;
                        isSpo2Low=false;
                    }
                    if ((!m.getHighPulseRate().isEmpty() && spo2.getPulseRate() > Integer.valueOf(m.getHighPulseRate()) && spo2.getPulseRate() != 255)) {
                        isPulseRateHigh=true;
                    } else if ((!m.getLowPulseRate().isEmpty() && spo2.getPulseRate() < Integer.valueOf(m.getLowPulseRate()) && spo2.getPulseRate() != 255)) {
                        isPulseRateLow=true;
                    }else {
                        isPulseRateLow=false;
                        isPulseRateHigh=false;
                    }
                }
                else {
                    isSpo2High=false;
                    isSpo2Low=false;
                    isPulseRateLow=false;
                    isPulseRateHigh=false;
                    Comman.log("TTTTTT","Spo2 Fasle");
                    sop2boolean=false;

                }
                if(spo2.getSpO2()==127){
                tvSPO2info.setText("--");}else { tvSPO2info.setText(String.valueOf(spo2.getSpO2()));}
                if(spo2.getPulseRate()==255){
                    pr.setText("--");
                }else {pr.setText(String.valueOf(spo2.getPulseRate()));}
                try {
                    if(spo2.getSpO2()==127&&spo2.getPulseRate()==255){
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate","").put("Resp Rate","")).put("SPO2",sp2.put("SPO2","")).put("Pulse Rate1","").put("NIBP",bpp.put("Cuff",cuff).put("High","").put("Low","").put("Mean","")).put("TEMP","").put("usercreate",m.getUserType()).put("heartRate",heartRate.put("upper",""+m.getHighHeartLimit()).put("lower",""+m.getLowHeartLimit()).put("status","true"))
                            .put("spo2",spo2json.put("upper",""+m.getHighSpo2()).put("lower",""+m.getLowSpo2()).put("status","true"))
                            .put("pulseRate",pulseRate.put("upper",""+m.getHighPulseRate()).put("lower",""+m.getLowPulseRate()).put("status","true"))
                            .put("highPressure",highPressure.put("upper",""+m.getHighPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("lowPressure",lowPressure.put("upper",""+m.getLowPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("temperature",tempjson.put("upper",""+m.getTempUpper()).put("lower",""+m.getTempLower()).put("status","true"));
                sendDataJson(snd);
                    }else {
                        snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate","").put("Resp Rate","")).put("SPO2",sp2.put("SPO2",""+spo2.getSpO2()).put("Pulse Rate1",""+spo2.getPulseRate())).put("NIBP",bpp.put("Cuff",cuff).put("High","").put("Low","").put("Mean","")).put("TEMP","").put("usercreate",m.getUserType()).put("heartRate",heartRate.put("upper",""+m.getHighHeartLimit()).put("lower",""+m.getLowHeartLimit()).put("status","true"))
                                .put("spo2",spo2json.put("upper",""+m.getHighSpo2()).put("lower",""+m.getLowSpo2()).put("status","true"))
                                .put("pulseRate",pulseRate.put("upper",""+m.getHighPulseRate()).put("lower",""+m.getLowPulseRate()).put("status","true"))
                                .put("highPressure",highPressure.put("upper",""+m.getHighPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                                .put("lowPressure",lowPressure.put("upper",""+m.getLowPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                                .put("temperature",tempjson.put("upper",""+m.getTempUpper()).put("lower",""+m.getTempLower()).put("status","true"));
                        sendDataJson(snd);
                    }
                    if(spo2.getSpO2()==127){
                    s2=0;}else {
                        s2=spo2.getSpO2();
                    }
                    if(spo2.getPulseRate()==255){
                        plus_rate=0;}else {
                        plus_rate=spo2.getPulseRate();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }
    @Override
    public void onECGWaveReceived(final int dat) {
        data2=dat;
        wfECG.addAmp(dat);
        sendEcg(dat);
    }

    @Override
    public void onECGReceived(final ECG ecg) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                checkVisibility();
                if(ecg.getRestRate()!=0 && ecg.getHeartRate()!=0) {
                         ecgboolean=true;
                    if ((!m.getHighHeartLimit().isEmpty() && ecg.getHeartRate() > Integer.valueOf(m.getHighHeartLimit())) && ecg.getHeartRate() != 0) {
                        isHeartRatHigh=true;
                    } else if (!m.getLowHeartLimit().isEmpty() && ecg.getHeartRate() < Integer.valueOf(m.getLowHeartLimit()) && ecg.getHeartRate() != 0) {
                        isHeartRatLow=true;
                    }else {
                        isHeartRatHigh=false;
                        isHeartRatLow=false;
                    }
                }else {
                    isHeartRatHigh=false;
                    isHeartRatLow=false;
                    ecgboolean=false;
                }
                if(ecg.getHeartRate()==0){tvECGinfo.setText("--");}else {tvECGinfo.setText(String.valueOf(ecg.getHeartRate()));}
                if(ecg.getRestRate()==0){ resp.setText("--");}else { resp.setText(String.valueOf(ecg.getRestRate()));}

                try {
                    if(ecg.getHeartRate()==0)
                    {
                        snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate","").put("Resp Rate","")).put("SPO2",sp2.put("SPO2","").put("Pulse Rate1","")).put("NIBP",bpp.put("Cuff","").put("High","").put("Low","").put("Mean","")).put("TEMP","").put("usercreate",m.getUserType()).put("heartRate",heartRate.put("upper",""+m.getHighHeartLimit()).put("lower",""+m.getLowHeartLimit()).put("status","true"))
                                .put("spo2",spo2json.put("upper",""+m.getHighSpo2()).put("lower",""+m.getLowSpo2()).put("status","true"))
                                .put("pulseRate",pulseRate.put("upper",""+m.getHighPulseRate()).put("lower",""+m.getLowPulseRate()).put("status","true"))
                                .put("highPressure",highPressure.put("upper",""+m.getHighPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                                .put("lowPressure",lowPressure.put("upper",""+m.getLowPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                                .put("temperature",tempjson.put("upper",""+m.getTempUpper()).put("lower",""+m.getTempLower()).put("status","true"));
                        sendDataJson(snd);
                    }else {
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate",""+ecg.getHeartRate()).put("Resp Rate",""+ecg.getRestRate())).put("SPO2",sp2.put("SPO2","").put("Pulse Rate1","")).put("NIBP",bpp.put("Cuff","").put("High","").put("Low","").put("Mean","")).put("TEMP","").put("usercreate",m.getUserType()).put("heartRate",heartRate.put("upper",""+m.getHighHeartLimit()).put("lower",""+m.getLowHeartLimit()).put("status","true"))
                            .put("spo2",spo2json.put("upper",""+m.getHighSpo2()).put("lower",""+m.getLowSpo2()).put("status","true"))
                            .put("pulseRate",pulseRate.put("upper",""+m.getHighPulseRate()).put("lower",""+m.getLowPulseRate()).put("status","true"))
                            .put("highPressure",highPressure.put("upper",""+m.getHighPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("lowPressure",lowPressure.put("upper",""+m.getLowPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("temperature",tempjson.put("upper",""+m.getTempUpper()).put("lower",""+m.getTempLower()).put("status","true"));
                    sendDataJson(snd);
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }
    @Override
    public void onTempReceived(final Temp temp) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                setAlart();
                    tempboolean=true;
                    if ((!m.getTempUpper().isEmpty() && temp.getTemperature() > Integer.valueOf(m.getTempUpper()))) {
//                        isTempHigh=true;
                    } else if ((!m.getTempLower().isEmpty() && temp.getTemperature() < Integer.valueOf(m.getTempLower()))) {
//                        isTempLow=true;
                    }else {
                        isTempHigh=false;
                        isTempLow=false;
                    }
                tvTEMPinfo.setText(String.valueOf(temp.getTemperature()));
                try {
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate","").put("Resp Rate","")).put("SPO2",sp2.put("SPO2","").put("Pulse Rate1","")).put("NIBP",bpp.put("Cuff","").put("High","").put("Low","").put("Mean","")).put("TEMP",""+temp.getTemperature()).put("usercreate",m.getUserType()).put("heartRate",heartRate.put("upper",""+m.getHighHeartLimit()).put("lower",""+m.getLowHeartLimit()).put("status","true"))
                            .put("spo2",spo2json.put("upper",""+m.getHighSpo2()).put("lower",""+m.getLowSpo2()).put("status","true"))
                            .put("pulseRate",pulseRate.put("upper",""+m.getHighPulseRate()).put("lower",""+m.getLowPulseRate()).put("status","true"))
                            .put("highPressure",highPressure.put("upper",""+m.getHighPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("lowPressure",lowPressure.put("upper",""+m.getLowPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("temperature",tempjson.put("upper",""+m.getTempUpper()).put("lower",""+m.getTempLower()).put("status","true"));
                    tp=temp.getTemperature();
                    sendDataJson(snd);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    public void onNIBPReceived(final NIBP nibp) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
//                Comman.log("BPPPPPPPPPPPPPPP","Value High"+nibp.getHighPressure()+" Low Value"+nibp.getLowPressure());
                if(nibp.getLowPressure()!=0 && nibp.getHighPressure()!=0){
                if((!m.getHighPressureUpper().isEmpty() && nibp.getHighPressure()>Integer.valueOf(m.getHighPressureUpper())))
                {
                    isBpHighUpper=true;
//                    Comman.log("BPPPPPPPPPPPPPPP","All High true");
                }
                else if((!m.getHighPressureLower().isEmpty() && nibp.getHighPressure()<Integer.valueOf(m.getHighPressureLower()))){
                    isBpHighLower=true;
//                    Comman.log("BPPPPPPPPPPPPPPP","All High Low true");
                }else {
                    isBpHighUpper=false;
                    isBpHighLower=false;
//                    Comman.log("BPPPPPPPPPPPPPPP","All High False");
                }
                if((!m.getLowPressureLower().isEmpty() && nibp.getLowPressure()<Integer.valueOf(m.getLowPressureLower())))
                {
                    isBpLowLower=true;
                }else if((!m.getLowPressureUpper().isEmpty() && nibp.getLowPressure()>Integer.valueOf(m.getLowPressureUpper()))){
                    isBpLowUpper=true;
                }else {
//                    Comman.log("BPPPPPPPPPPPPPPP","All Low False");
                    isBpLowUpper=false;
                    isBpLowLower=false;
                }
                }else {
//                    Comman.log("BPPPPPPPPPPPPPPP","All False");
                    isBpLowUpper=false;
                    isBpLowLower=false;
                    isBpHighUpper=false;
                    isBpHighLower=false;

                }
//                Comman.log("highValue"+nibp.getHighPressure(),"lowValue"+nibp.getLowPressure());
                if(nibp.getHighPressure()==0 && nibp.getLowPressure()==0){
                    tvNIBPinfo.setText("--/--");
                }else {
                tvNIBPinfo.setText(""+nibp.getHighPressure()+"/"+nibp.getLowPressure());
                }
                try {
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate","").put("Resp Rate","")).put("SPO2",sp2.put("SPO2","").put("Pulse Rate1","")).put("NIBP",bpp.put("Cuff",""+nibp.getCuffPressure()).put("High",""+nibp.getHighPressure()).put("Low",""+nibp.getLowPressure()).put("Mean",""+nibp.getMeanPressure())).put("TEMP","").put("usercreate",m.getUserType()).put("heartRate",heartRate.put("upper",""+m.getHighHeartLimit()).put("lower",""+m.getLowHeartLimit()).put("status","true"))
                            .put("spo2",spo2json.put("upper",""+m.getHighSpo2()).put("lower",""+m.getLowSpo2()).put("status","true"))
                            .put("pulseRate",pulseRate.put("upper",""+m.getHighPulseRate()).put("lower",""+m.getLowPulseRate()).put("status","true"))
                            .put("highPressure",highPressure.put("upper",""+m.getHighPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("lowPressure",lowPressure.put("upper",""+m.getLowPressureUpper()).put("lower",""+m.getLowPressureLower()).put("status","true"))
                            .put("temperature",tempjson.put("upper",""+m.getTempUpper()).put("lower",""+m.getTempLower()).put("status","true"));
                    sendDataJson(snd);
                    cuff=nibp.getCuffPressure();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    public void onFirmwareReceived(final String str) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                tvFWVersion.setText("Firmware Version:" + str);
            }
        });
    }

    @Override
    public void onHardwareReceived(final String str) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                tvHWVersion.setText("Hardware Version:" + str);
            }
        });

    }












    public void connectMqtt_JSon()
    {
        String clientId=MqttAsyncClient.generateClientId();
        try {
            client_Json=new MqttAsyncClient(Constant.SERVER_JSON_URL,clientId,null);
            client_Json.connect();
            Comman.log("Connect Successfully","JSON");
        } catch (MqttException ex) {
            ex.printStackTrace();
        }


    }
    public void connectMqtt_Ecg()
    {
        String clientId=MqttAsyncClient.generateClientId();
        try {
            client_Ecg=new MqttAsyncClient(Constant.SERVER_ECG_URL,clientId,null);
            client_Ecg.connect();
            Comman.log("Connect Successfully","ECG");
            Comman.log("Connect Successfully","ECG_Status"+client_Ecg.isConnected());
        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }
    public void sendSpo2(int a)
    {
//        topicId="/"+m.getHubId()+"/"+m.getHospitalId()+"/"+m.getDoctorId1()+"/"+m.getPatientId();
        topicId=""+m.getPatientId();
        MqttMessage message = new MqttMessage();
        message.setQos(0);
        message.setPayload(String.valueOf(a).getBytes());
        try {
            if(client_Json!=null &&client_Json.isConnected())
            {
                client_Json.publish(topicId+"/spo2", message);
                Comman.log("Published Message spo2___TOPIC"+topicId,""+message);
            }else {
//                client_Json.reconnect();
            }

        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }
    public void sendEcg(int a)
    {

        MqttMessage message = new MqttMessage();
        message.setQos(0);
        message.setPayload(String.valueOf(a).getBytes());
        try {
            if(client_Ecg!=null && client_Ecg.isConnected())
            {
                client_Ecg.publish(topicId+"/ecg", message);
                Comman.log("Published Message ECG___TOPIC"+topicId,""+message);
            }
            else
            {
//                client_Ecg.reconnect();
            }

        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }




    public void sendDataJson(JSONObject a)
    {
        MqttMessage message = new MqttMessage(a.toString().getBytes());
        message.setQos(0);
        try {
            if(client_Json!=null &&client_Json.isConnected())
            {
                client_Json.publish(topicId, message);
                Comman.log("Published Message JSON",""+message);
            }
            else
            {
                connectMqtt_JSon();
            }

        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }
    public JSONObject setJSon()
    {
        JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("Usertype_Id",m.getId()).put("PatientId",m.getPatientId()).put("DeviceMac",m.getMakeAddress()).put("DoctorID",m.getDoctorId()).put("DoctorID",""+m.getDoctorId1());
        } catch (JSONException ex) {
            ex.printStackTrace();
        }
        Comman.log("Discharge_JSON",jsonObject.toString());
        return jsonObject;
    }
    public void checkPermission() {
        if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{ Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 102);
            return;
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        try {
            if(client_Ecg !=null && client_Ecg.isConnected())
            {
                client_Ecg.disconnect();
            }
            if(client_Json !=null && client_Json.isConnected())
            {
                client_Json.disconnect();
            }
             mBtController.unregisterBroadcastReceiver(MainActivity.this);
             mBtController.disconnect();

        }catch (Exception e)
        {

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
        final ArrayList<String>msg=new ArrayList<>();
        if(isBpHighLower || isBpHighUpper || isBpLowLower || isBpLowUpper || isSpo2High || isHeartRatHigh || isHeartRatLow || isPulseRateHigh || isPulseRateLow) {
            if (!player1.isPlaying() && m.isAlarmOn())
                startAlarm(MainActivity.this);
        }
        if(isBpHighLower)
        {
            msg.add("High Bp at Low");
        }
        if(isBpHighUpper){
            msg.add("High Bp at High");
        }
        if(isBpLowLower)
        {
            msg.add("Low Bp at Low");
        }
        if(isBpLowUpper)
        {
            msg.add("Low Bp at High");
        }
        if(isSpo2High)
        {
            msg.add("Spo2 High");
        }
        if(isSpo2Low)
        {
            msg.add("Spo2 Low");
        }
        if(isHeartRatHigh)
        {
            msg.add("Heart Rate high");
        }
        if(isHeartRatLow)
        {
            msg.add("Heart Rate Low");
        }
        if(isPulseRateHigh)
        {
            msg.add("Pulse Rate High");
        }
        if (isPulseRateLow)
        {
            msg.add("Pulse Rate Low");
        }
        if(isTempHigh)
        {
//            if(!player1.isPlaying() && m.isAlarmOn())
//                startAlarm(MainActivity.this);
            msg.add("Temp High");
        }
        if(isTempLow)
        {
//            if(!player1.isPlaying() && m.isAlarmOn())
//                startAlarm(MainActivity.this);
            msg.add("Temp Low");
        }
        if(msg.size()!=0){
            for(int i=0;i<msg.size();i++) {
                final int j=i;
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        if (tempboolean) {
                            alarm.setText(msg.get(j));
                            alarm.setVisibility(View.VISIBLE);
                            Comman.log("FFF",""+msg.get(j));
                        }
                        alarm.setVisibility(View.VISIBLE);
                    }
                }, 20000*j+1);
            }}else {
            alarm.setVisibility(View.GONE);
        }


    }



    public void getNotification()
    {
        String notificationTopic=m.getPatientId()+"/Notification";
        Comman.log("Connection_Established","Connection MQTT_Notfication_    "+notificationTopic);
        try {
            if(mqtt_Notifiaction!=null && mqtt_Notifiaction.isConnected()) {
                mqtt_Notifiaction.subscribe(notificationTopic, 0);
                mqtt_Notifiaction.setCallback(new MqttCallback() {
                    @Override
                    public void connectionLost(Throwable cause) {
                        Comman.log("Connection_Established", "Connection MQTT_Notfication");
                    }

                    @Override
                    public void messageArrived(String topic, final MqttMessage message) throws Exception {
                        Comman.log("Connection_Established", "MQTT_Notfication    " + topic);
                        runOnUiThread(new Runnable() {
                            public void run() {
                                Comman.log("Connection_Established", "" + message);
                                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                                LayoutInflater layoutInflater = LayoutInflater.from(MainActivity.this);
                                View view2 = layoutInflater.inflate(R.layout.nurse_notification, null);
                                Button send = view2.findViewById(R.id.ok);
                                Lato_Regular_Font msg = view2.findViewById(R.id.msg);
                                Lato_Regular name = view2.findViewById(R.id.name);
                                final AlertDialog dialog = builder.create();
                                dialog.setView(view2);
                                dialog.show();
                                try {
                                    JSONObject jsonObject = new JSONObject(message.toString());
                                    msg.setText("Message :-" + jsonObject.getString("text"));
                                    name.setText(jsonObject.getString("name"));
                                } catch (JSONException ex) {
                                    ex.printStackTrace();
                                    Comman.log("ERROR", "" + ex.getMessage());
                                }
                                send.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View v) {
                                        dialog.dismiss();
                                    }
                                });
                            }
                        });
                    }

                    @Override
                    public void deliveryComplete(IMqttDeliveryToken token) {

                        Comman.log("ERROR", "" + token.toString());
                    }
                });
            }
//            else {
//                if(mqtt_Notifiaction!=null && mqtt_Notifiaction.isConnected())
//                mqtt_Notifiaction.reconnect();
//            }


        } catch (MqttException e) {
            e.printStackTrace();
        }

    }

    public void cnnect_MQTT_Notification()
    {

        try {
            String clientId=MqttAsyncClient.generateClientId();
            mqtt_Notifiaction=new MqttAsyncClient(Constant.SERVER_JSON_URL,clientId,null);
            mqtt_Notifiaction.connect();
            Comman.log("Connect Successfully","NotificationMQtt");
//            if(mqtt_Notifiaction.isConnected())
         new Handler().postDelayed(new Runnable() {
             @Override
             public void run() {
                 getNotification();
             }
         },1000);
            Comman.log("Connect Successfully","Status"+mqtt_Notifiaction.isConnected());
        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }




    public void showMessageList()
    {
        final AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        LayoutInflater layoutInflater=LayoutInflater.from(MainActivity.this);
        View view2=layoutInflater.inflate(R.layout.message_history_layout,null);
        Button send=view2.findViewById(R.id.ok);
        TextView textView=view2.findViewById(R.id.nodata);
        ListView listView=view2.findViewById(R.id.list);
        ProgressBar progressBar=view2.findViewById(R.id.pb);
        final AlertDialog dialog=builder.create();
        dialog.setView(view2);
        dialog.show();
        Api_calling.getMessageList(MainActivity.this,listView,progressBar,dialog,"",m.getPatientId(),textView);
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

    public int randomValue()
    {
        Random random = new Random();
        Comman.log("RamdomValues","-- "+(random.nextInt(90)+10));
         return (((random.nextInt(90)+10)));
    }
}



