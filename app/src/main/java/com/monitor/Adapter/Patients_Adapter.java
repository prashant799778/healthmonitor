package com.monitor.Adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.monitor.R;
import com.monitor.activities.MainActivity;
import com.monitor.activities.UserDisplayActivity;
import com.monitor.http.Model.All_Hospital;
import com.monitor.http.Model.All_Patients;
import com.monitor.widget.Lato_Regular_Font;

import java.util.ArrayList;

public class Patients_Adapter extends RecyclerView.Adapter<Patients_Adapter.NotificationHolder> {
    ArrayList<All_Patients >list;
    Context context;
    public Patients_Adapter(Context context, ArrayList<All_Patients>arrayList)
    {
        this.context=context;
        this.list=arrayList;
    }
    @NonNull
    @Override
    public Patients_Adapter.NotificationHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(context);
        View view=layoutInflater.inflate(R.layout.item_patient_layout,parent,false);
        return new Patients_Adapter.NotificationHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationHolder holder, int position) {
        final All_Patients ap=list.get(position);
        holder.p_name.setText(ap.getPatientName());
        holder.age.setText("12");
        holder.hospital.setText(ap.getHospital_Name());
        holder.rooms.setText(ap.getBed_Number());
        holder.bed.setText(ap.getBed_Number());
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                Intent i = new Intent(context, UserDisplayActivity.class);
//                i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//                i.putExtra("name",ap.getPatientName());
//                i.putExtra("age","12");
//                i.putExtra("hospital",ap.getHospital_Name());
//                i.putExtra("bed",ap.getBed_Number());
////                context.startActivity(i);
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
            age=itemView.findViewById(R.id.age);
            hospital=itemView.findViewById(R.id.hospital);
            rooms=itemView.findViewById(R.id.roomNo);
            bed=itemView.findViewById(R.id.bedNo);

        }
    }
}
