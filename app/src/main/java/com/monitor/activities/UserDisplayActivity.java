package com.monitor.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.monitor.R;
import com.monitor.http.Model.Readings;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
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

import java.util.Random;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class UserDisplayActivity extends BaseActivity {
    private TextView tvBtinfo;
    private TextView tvECGinfo;
    Lato_Regular_Font pname,p_age,p_location,p_bed_np;
    private TextView resp;
    private TextView tvSPO2info;
    private TextView pr;
    private TextView tvTEMPinfo;
    private TextView tvNIBPinfo;
    private WaveformView wfSpO2;
    private WaveformView wfECG;
    MqttAndroidClient client;
     SweetAlertDialog dialog;
    ProgressBar progressBar;
    String name="",age="",hosptal="",bed="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_display);
//        progressBar.findViewById(R.id.pb);
        connectMqtt();
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        Intent intent=getIntent();
        if(intent!=null)
        {
            name=intent.getStringExtra("name");
            age=intent.getStringExtra("age");
            hosptal=intent.getStringExtra("hospital");
            bed=intent.getStringExtra("bed");

        }
        dialog= new SweetAlertDialog(UserDisplayActivity.this, SweetAlertDialog.PROGRESS_TYPE).setTitleText("Waiting for the Response...");
        dialog.show();
        tvBtinfo = (TextView) findViewById(R.id.connect);
        tvECGinfo = (TextView) findViewById(R.id.tvECGinfo);
        tvSPO2info = (TextView) findViewById(R.id.tvSPO2info);
        tvTEMPinfo = (TextView) findViewById(R.id.tvTEMPinfo);
        tvNIBPinfo = (TextView) findViewById(R.id.tvNIBPinfo);
        wfSpO2 = (WaveformView) findViewById(R.id.wfSp02);
        wfECG = (WaveformView) findViewById(R.id.wfECG);

        Comman.log("TTTTTTTTTTTTTTT","GGGGGGGGGGGGGGGGGGGGG");
//        wfSpO2.addAmp(random(100,60));
//        wfECG.addAmp(random(100,60));
        pr = (TextView) findViewById(R.id.pr);
        pname=findViewById(R.id.p_name);
        p_age=findViewById(R.id.age);
        p_location=findViewById(R.id.location);
        p_bed_np=findViewById(R.id.bedNo);
        pname.setText(name);
        p_age.setText("Age "+age);
        p_location.setText(hosptal);
        p_bed_np.setText("Bed No."+bed);
    }
    public void connectMqtt()
    {
        String clientId = MqttClient.generateClientId();
        client =
                new MqttAndroidClient(UserDisplayActivity.this, Constant.SERVER_URL,
                        clientId);
        Comman.log("Mqtt Client Id",":"+clientId);

        if (!client.isConnected()) {
            try { if(client!=null) {
                IMqttToken token = client.connect();
                token.setActionCallback(new IMqttActionListener() {
                    @Override
                    public void onSuccess(IMqttToken asyncActionToken) {
                        Comman.log("Connection Established", "SuccessFully");
                        getData();
                    }

                    @Override
                    public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                        Comman.log("Connection Established", "Not");
                        Comman.log("Connection Error", ":" + exception);
                    }
                });
            }
            } catch (MqttException e) {
                e.printStackTrace();
                Comman.log("Connection Error", ":" + e);
            }
        }
    }
    public void getData()
    {
        Comman.log("Inside","getDataFunction");
        String topic = "/1/1/1/"+bed;
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
                    Gson gson=new GsonBuilder().create();
                    Readings readings=gson.fromJson(message.toString(),Readings.class);
                    setData(readings);
                    dialog.dismissWithAnimation();
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
    public void setData(Readings readings)
    { Comman.log("WAVE1111","dasdddddd");


        if(readings.getECG().getHeartRate()==null){wfECG.addAmp(0);}else {
            tvECGinfo.setText(readings.getECG().getHeartRate()+"");
        wfECG.addAmp(readings.getECG().getHeartRate());}



        if(readings.getSPO2().getPulseRate()==null
                ||readings.getSPO2().getPulseRate()==127){
            Comman.log("PPPP","IF");
            wfSpO2.addAmp(0);
        }else {
            Comman.log("PPPP","ELSE");
            tvSPO2info.setText(""+readings.getSPO2().getSPO2());
            pr.setText(""+readings.getSPO2().getPulseRate());
            wfSpO2.addAmp(readings.getSPO2().getPulseRate());

        }
//        Comman.log("WAVE",""+readings.getECG().getHeartRate());
//        tvBtinfo.setText(readings.);
        tvNIBPinfo.setText("Cuff- "+readings.getNIBP().getCuff()+" \n"+"High-  "+readings.getNIBP().getHigh()+" Low-  "+readings.getNIBP().getLow());
        tvTEMPinfo.setText(""+readings.getTEMP()+"");
//        Comman.log("WAVE1111",""+readings.getSPO2().getPulseRate());
//        wfSpO2.addAmp(random(100,60));
//        wfECG.addAmp(random(100,60));

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        if(client.isConnected())
        {
            try {
                client.disconnect();
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
//        disConnect();
    }
    public int random(int start_range,int end_range)
    {
        Random random = new Random();
        int randomNumber = random.nextInt(start_range-end_range) + end_range;
        return randomNumber;
    }
}
