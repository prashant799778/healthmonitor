package com.monitor.Adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.monitor.R;
import com.monitor.activities.Main2Activity;
import com.monitor.activities.UserDisplayActivity;
import com.monitor.http.Model.All_Patients;
import com.monitor.http.Model.Live;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.PatientDetail;
import com.monitor.http.Model.Result;
import com.monitor.widget.Lato_Regular_Font;

import java.util.ArrayList;

public class DashboardAdapter extends RecyclerView.Adapter<DashboardAdapter.NotificationHolder> {
    ArrayList<PatientDetail>list;
    Context context;
    String hospitalId= "";
    String hubId = "";
    public DashboardAdapter(Context context, ArrayList<PatientDetail>arrayList, String hospitalId, String hubId)
    {
        this.context=context;
        this.list=arrayList;
        this.hospitalId = hospitalId;
        this.hubId = hubId;
    }
    @NonNull
    @Override
    public DashboardAdapter.NotificationHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(context);
        View view=layoutInflater.inflate(R.layout.item_card_for_patients,parent,false);
        return new DashboardAdapter.NotificationHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationHolder holder, int position) {
        final PatientDetail pd=list.get(position);
//        Result r= (Result) ap.getResult();
//        PatientDetail p= (PatientDetail) r.getPatientDetails();
        holder.p_name.setText(pd.getPatientName());
        if(pd.getHeartRate()==null){holder.age.setText("-");}else {
        holder.age.setText(pd.getHeartRate());}
        if(pd.getsPO2()==null){holder.hospital.setText("-");}else {
        holder.hospital.setText(""+pd.getsPO2());}
        if(pd.getPulseRate()==null){holder.rooms.setText("/-");}else {
        holder.rooms.setText("/"+pd.getPulseRate());}
        if(pd.getRespRate()==null){holder.bed.setText("-");}else {
        holder.bed.setText(""+pd.getRespRate());}
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(context, UserDisplayActivity.class);
                i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                i.putExtra("name",pd.getPatientName());
                i.putExtra("age","12");
                i.putExtra("hospital","2");
                i.putExtra("bed",""+pd.getPatientId());
                context.startActivity(i);
            }
        });


    }



    @Override
    public int getItemCount() {
        return list.size();
    }

    public class NotificationHolder extends RecyclerView.ViewHolder {
        Lato_Regular_Font p_name,age,hospital,rooms,bed;
        public NotificationHolder(@NonNull View itemView) {
            super(itemView);
            p_name=itemView.findViewById(R.id.p_name);
            age=itemView.findViewById(R.id.t1);
            hospital=itemView.findViewById(R.id.t2);
            rooms=itemView.findViewById(R.id.t3);
            bed=itemView.findViewById(R.id.t4);

        }
    }
}
