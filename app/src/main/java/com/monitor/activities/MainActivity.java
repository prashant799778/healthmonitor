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
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.text.format.Formatter;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
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
import com.monitor.widget.Lato_Regular_Font;
import com.monitor.widget.WaveformView;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
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
    Lato_Regular_Font pname,p_age,p_location,p_bed_np;
    private LinearLayout btnBtCtr;
    private LinearLayout add;
    private LinearLayout bp;
    private LinearLayout logout;
    private TextView tvBtinfo;
    private TextView tvECGinfo;
    private TextView resp;
    private TextView tvSPO2info;
    private TextView pr;
    private TextView tvTEMPinfo;
    private TextView tvNIBPinfo;
    private LinearLayout llAbout;
    private TextView tvFWVersion;
    private TextView tvHWVersion;
    private WaveformView wfSpO2;
    private WaveformView wfECG;
    private Button cnt;
    JSONObject snd;
    JSONObject sp2;
    JSONObject e;
    JSONObject bpp;
    int s2=0;
    double tp=0;
    int plus_rate=0;
    int cuff=0;
    int hr=0,rp=0;
    String name="",age="",hosptal="",bed="";
    MqttAndroidClient client;

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
        cnt = findViewById(R.id.cnt);




        final Intent intent=getIntent();
        if(intent!=null)
        {
            name=intent.getStringExtra("name");
            age=intent.getStringExtra("age");
            hosptal=intent.getStringExtra("hospital");
            bed=intent.getStringExtra("bed");

        }
//        gp=findViewById(R.id.gp);
        snd=new JSONObject();
        sp2=new JSONObject();
        e=new JSONObject();
        bpp=new JSONObject();
        checkPermission();
        connectMqtt();
//        getData();
//        try {
//            socket=IO.socket(Constant.SERVER_URL);
//        } catch (URISyntaxException ex) {
//            ex.printStackTrace();
//        }
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
    }


    private void initData() {
        // enable the Bluetooth Adapter
        mBtController = BTController.getDefaultBTController(this);
        mBtController.registerBroadcastReceiver(this);
        mBtController.enableBtAdpter();
        mDataParser = new DataParser(this);
        mDataParser.start();
    }

    private void initView() {
        //UI widgets
        add = (LinearLayout) findViewById(R.id.add);
        logout=findViewById(R.id.logout);
        bp=findViewById(R.id.pb);
        r=findViewById(R.id.r);
        pname=findViewById(R.id.p_name);
        p_age=findViewById(R.id.age);
        p_location=findViewById(R.id.location);
        p_bed_np=findViewById(R.id.bedNo);
        pname.setText(name);
        p_age.setText("Age "+age);
        p_location.setText(hosptal);
        p_bed_np.setText("Bed No."+bed);
        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                startActivity(new Intent(MainActivity.this, ConfigActivity.class));
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
                alertDialog.setTitleText("Do you Want Discharge this Patient")
                        .setConfirmText("Yes").setCancelText("No").setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                    @Override
                    public void onClick(SweetAlertDialog sweetAlertDialog) {
                        alertDialog.dismissWithAnimation();
                    }
                }).setConfirmClickListener(new SweetAlertDialog.OnSweetClickListener() {
                    @Override
                    public void onClick(SweetAlertDialog sweetAlertDialog) {
                        Api_calling.dischargePatient(MainActivity.this,r,setJSon());
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
        finish();
//        disConnect();
        System.exit(0); //for release "mBluetoothDevices" on key_back down
        mBtController.unregisterBroadcastReceiver(this);
    }

    @Override
    protected void onStop() {
        super.onStop();
        System.exit(0); //for release "mBluetoothDevices" on key_back down
        mBtController.unregisterBroadcastReceiver(this);
    }

    //BTController implements
    @Override
    public void onFoundDevice(BluetoothDevice device) {
//    Log.d("BL....",device.getName());
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
//        try {
//            snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate",random(100,45)).put("Rest Rate",random(40,25))).put("SPO2",sp2.put("SPO2",s2).put("Pulse Rate",plus_rate)).put("NIBP",bpp.put("Cuff",cuff).put("High","").put("Low","").put("Mean","")).put("TEMP",tp).put("usercreate",m.getUserType());
////            call(snd);
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
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
        if(client.isConnected()) {
            try {
                client.disconnect();
            } catch (MqttException ex) {
                ex.printStackTrace();
            }
        }
//        try {
////            client.disconnect();
////            client.close();
//        } catch (MqttException ex) {
//            ex.printStackTrace();
//        }
    }

    @Override
    public void onReceiveData(byte[] dat) {
        mDataParser.add(dat);
    }


    //DataParser implements
    @Override
    public void onSpO2WaveReceived(int dat) {
        wfSpO2.addAmp(dat);

//        List<DataPoint>dd=new ArrayList<>();
//        dd.add(dat,new DataPoint(dat));
//        gp.drawLine(dd);
    }

    @Override
    public void onSpO2Received(final SpO2 spo2) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(spo2.getSpO2()==127){
                tvSPO2info.setText("--");}else { tvSPO2info.setText(String.valueOf(spo2.getSpO2()));}
                if(spo2.getPulseRate()==255){
                    pr.setText("--");
                }else {pr.setText(String.valueOf(spo2.getPulseRate()));}
                try {
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate",hr).put("Resp Rate",rp)).put("SPO2",sp2.put("SPO2",spo2.getSpO2()).put("Pulse Rate",spo2.getPulseRate())).put("NIBP",bpp.put("Cuff",cuff).put("High","").put("Low","").put("Mean","")).put("TEMP",tp).put("usercreate",m.getUserType());
                    sendData(snd);
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
    public void onECGWaveReceived(int dat) {
        wfECG.addAmp(dat);
    }

    @Override
    public void onECGReceived(final ECG ecg) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                tvECGinfo.setText(String.valueOf(ecg.getHeartRate()));
                resp.setText(String.valueOf(ecg.getRestRate()));
                try {
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate",ecg.getHeartRate()).put("Resp Rate",ecg.getRestRate()).put("SPO2",sp2.put("SPO2",s2).put("Pulse Rate",plus_rate)).put("NIBP",bpp.put("Cuff",cuff).put("High","").put("Low","").put("Mean","")).put("TEMP",tp).put("usercreate",m.getUserType()));
                    sendData(snd);
                    hr=ecg.getHeartRate();
                    rp=ecg.getRestRate();
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
                tvTEMPinfo.setText(temp.toString());
                try {
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate",hr)).put("Resp Rate",rp).put("SPO2",sp2.put("SPO2",s2).put("Pulse Rate",plus_rate)).put("NIBP",bpp.put("Cuff",cuff).put("High","").put("Low","").put("Mean","")).put("TEMP",temp.getTemperature()).put("usercreate",m.getUserType());
                    tp=temp.getTemperature();
                    sendData(snd);
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
                tvNIBPinfo.setText(nibp.toString());
                try {
                    snd.put("PatientId",m.getPatientId()).put("RESP","").put("ECG",e.put("Heart Rate",hr).put("Resp Rate",rp)).put("SPO2",sp2.put("SPO2",s2).put("Pulse Rate",plus_rate)).put("NIBP",bpp.put("Cuff",nibp.getCuffPressure()).put("High",nibp.getHighPressure()).put("Low",nibp.getLowPressure()).put("Mean",nibp.getMeanPressure())).put("TEMP",tp).put("usercreate",m.getUserType());
                    sendData(snd);
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



//    public Emitter.Listener onNewMessage = new Emitter.Listener() {
//        @Override
//        public void call(final Object... args) {
//            MainActivity.this.runOnUiThread(new Runnable() {
//                @Override
//                public void run() {
//                    Log.d(TAG, "New message 090909***");
//                    JSONObject data = (JSONObject) args[0];
//                    int core0 = 0;
//                    int core1 = 0;
//                    int cpu_usage_in = 0;
//                    try {
//                        core0 = data.getInt("core0_in");
//                        core1 = data.getInt("core1_in");
//                        cpu_usage_in = data.getInt("cpu_usage_in");
//                    } catch (JSONException e) {
//                        Log.e(TAG, e.getMessage());
//                    }
//
////                    btnCore0.setText(getResources().getString(R.string.core0, String.valueOf(core0)));
////                    btnCore1.setText(getResources().getString(R.string.core1, String.valueOf(core1)));
////                    btnCPUUsage.setText(getResources().getString(R.string.cpu_usge, String.valueOf(cpu_usage_in)));
//
////                    updateButtonBackgroundColor(btnCore0, core0);
////                    updateButtonBackgroundColor(btnCore1, core1);
////                    updateButtonBackgroundColor(btnCPUUsage, cpu_usage_in);
//
//                    onServerDataReceived();
//                }
//            });
//        }
//    };


//    class Mytask extends AsyncTask<JSONObject, Void, Void> {
//        private JSONObject jsonData;
//        private boolean success;
//        Socket socket = null;
//        DataInputStream dataInputStream = null;
//        DataOutputStream dataOutputStream = null;
//
//        @Override
//        protected Void doInBackground(JSONObject... params) {
//            try {
//                jsonData = params[0];
//                Log.d("DATA1", "" + jsonData);
//                // Create a new Socket instance and connect to host
//                socket = new Socket(Constant.hostAddress, Constant.SocketServerPORT);
////                socket=new S
////                socket=IO.socket();
//
//                dataOutputStream = new DataOutputStream(
//                        socket.getOutputStream());
//                dataInputStream = new DataInputStream(socket.getInputStream());
//
//                // transfer JSONObject as String to the server
//                dataOutputStream.writeUTF(jsonData.toString());
//                Log.d("1", "waiting for response from host");
//
//                // Thread will wait till server replies
//                String response = dataInputStream.readUTF();
//                Log.d("Response", response);
////                sock
//                if (response != null && response.equals("Connection Accepted")) {
//                    success = true;
//                } else {
//                    success = false;
//                }
//
//            } catch (IOException e) {
//                e.printStackTrace();
//                success = false;
//            } finally {
//
//                // close socket
//                if (socket != null) {
//                    try {
//                        Log.d("4", "closing the socket");
//                        socket.close();
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//
//                // close input stream
//                if (dataInputStream != null) {
//                    try {
//                        dataInputStream.close();
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//
//                // close output stream
//                if (dataOutputStream != null) {
//                    try {
//                        dataOutputStream.close();
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//
//            return null;
//        }
//    }

//    private void connectToHost() {
//
//        if (Constant.hostAddress == null) {
//            Log.d("3", "Host Address is null");
//            return;
//        }
//
//        String ipAddress = getLocalIpAddress();
//        JSONObject jsonData = new JSONObject();
//
//        try {
//            jsonData.put("request", REQUEST_CONNECT_CLIENT);
//            jsonData.put("ipAddress", ipAddress);
//        } catch (JSONException e) {
//            e.printStackTrace();
//            Log.d("2", "can't put request");
//            return;
//        }
//        Log.d("DATA", "" + jsonData);
//        new Mytask().execute(jsonData);
//    }
//
//    private String getLocalIpAddress() {
//        WifiManager wm = (WifiManager) getSystemService(WIFI_SERVICE);
//        String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());
//        return ip;
//    }
//    public void call(final JSONObject jsonObject)
//    {
//
//        if(socket !=null && socket.connected())
//        {
//            socket.emit("new message", jsonObject);
//            Comman.log("INSIDE_IF",jsonObject.toString());
//        }
//        else
//        {
//            Comman.log("INSIDE_ELSE","INSIDE_ELSE");
//            connectSocketNew(jsonObject);
//        }
////        try {
////            socket = IO.socket(Constant.SERVER_URL);
////        } catch (URISyntaxException e) {
////            e.printStackTrace();
////        }
////        socket.on(io.socket.client.Socket.EVENT_CONNECT, new Emitter.Listener() {
////
////            @Override
////            public void call(Object... args) {
////                socket.emit("new message", jsonObject);
//////                socket.disconnect();
////            }
////
////        }).on("new message", new Emitter.Listener() {
////
////            @Override
////            public void call(Object... args) {}
////
////        }).on(io.socket.client.Socket.EVENT_DISCONNECT, new Emitter.Listener() {
////
////            @Override
////            public void call(Object... args) {}
////
////        });
////        socket.connect();
////        JSONObject obj = new JSONObject();
////        try {
////            obj.put("hello", "server");
////            obj.put("binary","VAAG");
////        } catch (JSONException e) {
////            e.printStackTrace();
////        }
////        Comman.log("Sending an object",jsonObject.toString());
////        socket.emit("new message", jsonObject);
////
////// Receiving an object
////        socket.on("new message", new Emitter.Listener() {
////            @Override
////            public void call(Object... args) {
////                JSONObject obj = (JSONObject)args[0];
////                Comman.log("Receiving an object",obj.toString());
////            }
////        });
////
////
//    }


//    public void connectSocket(final JSONObject jsonObject)
//    {
//        try {
//            socket = IO.socket(Constant.SERVER_URL);
//        } catch (URISyntaxException e) {
//            e.printStackTrace();
//        }
//        socket.on(io.socket.client.Socket.EVENT_CONNECT, new Emitter.Listener() {
//            @Override
//            public void call(Object... args) {
//                socket.emit("new message", jsonObject);
//                Comman.log("Sent Data Inside",jsonObject.toString());
//            }
//
//        }).on("new message", new Emitter.Listener() {
//
//            @Override
//            public void call(Object... args) {
//                Comman.log("Sent Data Insideee",jsonObject.toString());
////                socket.emit("new message", jsonObject);
//            }
//
//        }).on(io.socket.client.Socket.EVENT_DISCONNECT, new Emitter.Listener() {
//
//            @Override
//            public void call(Object... args) {
////                socket.emit("new message", jsonObject);
//            }
//
//        });
//        socket.connect();
//    }
    public int random(int start_range,int end_range)
    {
        Random random = new Random();
        int randomNumber = random.nextInt(start_range-end_range) + end_range;
       return randomNumber;
    }
//    public void connectSocketNew(final JSONObject jsonObject)
//    {
//        socket.on(io.socket.client.Socket.EVENT_CONNECT, new Emitter.Listener() {
//            @Override
//            public void call(Object... args) {
//                socket.emit("new message",jsonObject);
//                Comman.log("INSIDE_ELSE_SEND_DATA",jsonObject.toString());
//            }
//        });
//        socket.connect();
//    }





    public void connectMqtt()
    {
//        AlarmManager alarmManager = (AlarmManager)getSystemService(ALARM_SERVICE);

        String clientId = MqttClient.generateClientId();
         client =
                new MqttAndroidClient(getApplicationContext(), Constant.SERVER_URL,
                        clientId);
        Comman.log("Mqtt Client Id",":"+clientId);
        try {
            IMqttToken token = client.connect();
            token.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    Comman.log("Connection Established","SuccessFully");
//                    getData();
                }
                @Override
                public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                    Comman.log("Connection Established","Not");
                    Comman.log("Connection Error",":"+exception);

                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
            Comman.log("Connection Error",":"+e);
        }
    }
    public void sendData(JSONObject jsonObject)
    {
        Comman.log("Send Data Form My Side",":"+jsonObject);
            MqttMessage message = new MqttMessage();
            message.setPayload(jsonObject.toString().getBytes());
        try {
            if(client.isConnected())
            {
                String id="";
//                id="/"+m.getHubId()+"/"+m.getHospitalId()+"/"+m.getDoctorId()+"/"+m.getPatientId();
                id="/"+m.getHubId()+"/"+m.getHospitalId()+"/1/"+m.getPatientId();
                Comman.log("TopicID To Server",":"+id);
                client.publish(id, message);

//                client.publish("/h1/h1/d1/p2", message);Co
            }
            else
            {
                connectMqtt();
            }

        } catch (MqttException ex) {
            ex.printStackTrace();
        }
    }
    public void getData()
        {
            Comman.log("Inside","getDataFunction");
            String topic = "/1/1/1/11";
        int qos = 1;
        try {
            final IMqttToken subToken = client.subscribe(topic,qos);

            client.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {

                }

                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {

                    Comman.log("Response1",":"+message.toString());
                }

                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {

                }
            });
            subToken.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    // The message was published
                    Comman.log("Response",""+subToken.toString());
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken,
                                      Throwable exception) {
                    Comman.log("ERROR",":"+exception);
                    // The subscription could not be performed, maybe the user was not
                    // authorized to subscribe on the specified topic e.g. using wildcards

                }

            });
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



    public JSONObject setJSon()
    {
        JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("Usertype_Id",m.getId()).put("PatientId",m.getPatientId()).put("DeviceMac",m.getMakeAddress());
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
//        disConnect();
//        mBtController.disconnect();
    }
}



