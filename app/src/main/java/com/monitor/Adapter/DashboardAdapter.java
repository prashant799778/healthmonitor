package com.monitor.Adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.monitor.R;
import com.monitor.activities.UserDisplayActivity;
import com.monitor.fragments.DashBoard_Fragment;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.PatientDetail;
import com.monitor.http.Model.Readings.Readings;
import com.monitor.util.Comman;
import com.monitor.util.Constant;
import com.monitor.util.MySharedPrefrence;
import com.monitor.widget.Lato_Regular_Font;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.util.ArrayList;
import java.util.Collection;

public class DashboardAdapter extends RecyclerView.Adapter<DashboardAdapter.NotificationHolder> {
    ArrayList<PatientDetail>list;
    Context context;
    String hospitalId= "";
    String hospitalName="";
    String doctorId= "";
    String hubId = "";
    String t1="--",t2="--",t3="--",t4="--";
    Activity activity;
    MySharedPrefrence m;
    String userTopic="";
    public DashboardAdapter(Context context, ArrayList<PatientDetail>arrayList, String hospitalId, String hubId, String doctorId, Activity activity,String hospitalName)
    {
        Comman.log("JJJJJJJHospitalId   "+hospitalId,"HubId  "+hubId+"  DoctorID  "+doctorId+"..ArraySize"+arrayList.size());
        this.context=context;
        this.list=arrayList;
        this.m=MySharedPrefrence.instanceOf(context);
        this.hospitalId = hospitalId;
        this.doctorId=doctorId;
        this.hubId = hubId;
        this.hospitalName=hospitalName;
        this.activity=activity;
    }
    @NonNull
    @Override
    public DashboardAdapter.NotificationHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(context);
        View view=layoutInflater.inflate(R.layout.item_card_for_patients,parent,false);
        return new DashboardAdapter.NotificationHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final NotificationHolder holder, int position) {
        final PatientDetail pd=list.get(position);
//        final MqttAsyncClient client=null;
//        connectMqtt(client);
//        Comman.log("Patients_Details",""+pd.getPatientId());
//        final String userTopic="/" + hubId + "/" + hospitalId + "/" + doctorId + "/" + pd.getPatientId();
        userTopic=""+pd.getPatientId();
//        Comman.log("Click","Click"+holder.itemView.getId()+"..."+holder.getLayoutPosition()+"...."+holder.getItemId());

        try {
            if(DashBoard_Fragment.client!=null && DashBoard_Fragment.client.isConnected()) {
                DashBoard_Fragment.client.subscribe(userTopic, 0);
                Comman.log("Connection Subscribe","Id....."+userTopic);
                DashBoard_Fragment.client.setCallback(new MqttCallback() {
                    @Override
                    public void connectionLost(Throwable cause) {
                           Comman.log("Connection Lost","Connection Lost In Adapter"+cause);
                        try {
                            if(!DashBoard_Fragment.client.isConnected())
                                DashBoard_Fragment.client.reconnect();
                        } catch (MqttException e) {
                            e.printStackTrace();
                        }
                    }
                    @Override
                    public void messageArrived(final String topic, final MqttMessage message) throws Exception {
                        Comman.log("Patient...ID......"+""+pd.getPatientId(),".......From API..Topic..."+topic);
//                       if(topic.equalsIgnoreCase(userTopic))
                        activity.runOnUiThread(new Runnable(){
                            public void run() {
//                                Comman.log("Message Received and TopicId"+userTopic,"Message Received In Adapter"+message.toString());
                                Gson gson=new GsonBuilder().create();
                        Readings readings = gson.fromJson(message.toString(), Readings.class);
//                        Comman.log("Inside","Inside");
                        updateData(readings,holder,topic);
//                        notifyDataSetChanged();
                            }
                        });

                    }

                    @Override
                    public void deliveryComplete(IMqttDeliveryToken token) {

                    }
                });
            }



        } catch (MqttException e) {
            e.printStackTrace();
        }
//        holder.p_name.setText(pd.getPatientName());
//        holder.age.setText("--");
//        holder.bed.setText("--");
//        holder.hospital.setText("--/");
        holder.hospital.setText("");
        holder.p_name.setText(pd.getPatientName());


        if(pd.getHR()==null){
            holder.hr.setText("--");
        }else {
        holder.hr.setText(pd.getHR());
//            t1=pd.getHR();
        }
        if(pd.getSp2()==null)
        {
            holder.spo2.setText("--/--");
        }else {
            holder.spo2.setText(""+pd.getSp2()+"/"+pd.getPR());
        }
        if(pd.getRESP()==null)
        {
            holder.resp.setText("--");
        }else {
        holder.resp.setText(pd.getRESP());
        }









//        holder.rooms.setText("--/--");
        String text1 = "<p>SPO<sub>2</sub> / PR(bmp)</p>";
        holder.ss.setText(Html.fromHtml(text1));

//        if(pd.getHeartRate()==null||pd.getHeartRate().equalsIgnoreCase("")){holder.age.setText("-");}else {
//        holder.age.setText(pd.getHeartRate());}
//        if(pd.getsPO2()==null){holder.hospital.setText("-");}else {
//        holder.hospital.setText(""+pd.getsPO2());}
//        if(pd.getPulseRate()==null){holder.rooms.setText("/-");}else {
//        holder.rooms.setText("/"+pd.getPulseRate());}
//        if(pd.getRespRate()==null){holder.bed.setText("-");}else {
//        holder.bed.setText(""+pd.getRespRate());
//        }
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(context, UserDisplayActivity.class);
                Comman.log("Click","Click"+holder.itemView.getId()+"..."+holder.getLayoutPosition()+"...."+holder.getItemId());
                i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//                if (DashBoard_Fragment.client.isConnected() && DashBoard_Fragment.client!=null) {
//                    try {
//                        DashBoard_Fragment.client.disconnect();
//                    } catch (MqttException e) {
//                        e.printStackTrace();
//                    }
//                }
                i.putExtra("name",""+pd.getPatientName());
                if(pd.getAge()==null)
                {
                    i.putExtra("age","");
                }else {
                i.putExtra("age",""+pd.getAge());}
                i.putExtra("hospital",""+hospitalName);
                i.putExtra("bed",""+pd.getBedNumber());
                i.putExtra("id",""+pd.getPatientId());
                i.putExtra("hubId",""+hubId);
                i.putExtra("hospitalId",""+hospitalId);
                context.startActivity(i);
            }
        });
        holder.setIsRecyclable(false);


    }


    @Override
    public int getItemCount() {
        return list.size();
    }

    public class NotificationHolder extends RecyclerView.ViewHolder {
        Lato_Regular_Font p_name,hr,hospital,spo2,resp,ss;
        public NotificationHolder(@NonNull View itemView) {
            super(itemView);
            p_name=itemView.findViewById(R.id.p_name);
            hr=itemView.findViewById(R.id.t1);
            hospital=itemView.findViewById(R.id.t2);
            spo2=itemView.findViewById(R.id.t3);
            resp=itemView.findViewById(R.id.t4);
            ss=itemView.findViewById(R.id.ss);

        }
    }
    public void updateData(Readings readings, NotificationHolder holder,String apiTopic){

        int i=0;
        while (i<list.size())
        {
            if(apiTopic.equalsIgnoreCase(String.valueOf(list.get(i).getPatientId()))){
                PatientDetail patientDetail = list.get(i);
                   if(readings.getSPO2().getSPO2()!=null){
                       if(!(readings.getSPO2().getSPO2().equalsIgnoreCase("127")||readings.getSPO2().getSPO2().equalsIgnoreCase("")))
                           t2=""+readings.getSPO2().getSPO2();
                       patientDetail.setSp2(String.valueOf(t2));
                   }
                   if(readings.getECG().getHeartRate()!=null){
                       if (!(readings.getECG().getHeartRate().equalsIgnoreCase("")))
                           t1 = readings.getECG().getHeartRate();
                       patientDetail.setHR(t1);
                   }
                if(readings.getSPO2().getPulseRate1()!=null)
                { if(!(readings.getSPO2().getPulseRate1().equalsIgnoreCase("255")||readings.getSPO2().getPulseRate1().equalsIgnoreCase("")))
                        t3=readings.getSPO2().getPulseRate1();
                        patientDetail.setPR(t3);
                }
                if(readings.getECG().getRespRate()!=null){
                    if(!(readings.getECG().getRespRate().equalsIgnoreCase("")))
                        t4=readings.getECG().getRespRate();
                    patientDetail.setRESP(t4);
                }
                    list.set(i,patientDetail);
                notifyDataSetChanged();
                break;
            }
            i++;
        }
//        if(readings.getECG().getHeartRate().equalsIgnoreCase(""))
//        {
//            holder.age.setText(t1);
//        }else {
//            holder.age.setText(t1);
//            t1=readings.getECG().getHeartRate();
//        }
//        if(readings.getSPO2().getSPO2().equalsIgnoreCase("127")||readings.getSPO2().getSPO2().equalsIgnoreCase(""))
//        {
//            holder.hospital.setText(t2);
//        }else {
//            holder.hospital.setText(""+t2);
//            t2=""+readings.getSPO2().getSPO2();
//        }
//        if(readings.getSPO2().getPulseRate1()!=null)
//        if(readings.getSPO2().getPulseRate1().equalsIgnoreCase("255")||readings.getSPO2().getPulseRate1().equalsIgnoreCase("")){
//            holder.rooms.setText(t2+"/"+t3);
//        }else {
//            holder.rooms.setText(t2+"/"+t3);
//            t3=readings.getSPO2().getPulseRate1();
//        }
//        if(readings.getECG().getRespRate().equalsIgnoreCase(""))
//        {
//            holder.bed.setText(t4);
//        }else {
//            holder.bed.setText(t4);
//            t4=readings.getECG().getRespRate();
//        }
    }
    public void connectMqtt(MqttAsyncClient client )
    {
        String clientId = MqttAsyncClient.generateClientId();
        try {
            client =
                    new MqttAsyncClient(Constant.SERVER_JSON_URL,
                            clientId,null);
            client.connect();
//            client.reconnect();
            while (!client.isConnected()){}
            if(client.isConnected()==true){
//               client.subscribe(topicId,0);
                Comman.log("Connection ","True");
//                onResult(liveModel);
            }else {
                Comman.log("Connection","Null");
            }
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

}
