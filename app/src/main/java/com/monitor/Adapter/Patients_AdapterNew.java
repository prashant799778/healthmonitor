package com.monitor.Adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.monitor.R;
import com.monitor.activities.ShowPatientsActivity;
import com.monitor.http.Model.All_Patients;
import com.monitor.http.Model.Patients;
import com.monitor.widget.Lato_Regular_Font;

import java.util.ArrayList;

public class Patients_AdapterNew extends RecyclerView.Adapter<Patients_AdapterNew.NotificationHolder> {
    ArrayList<Patients >list;
    Context context;
    public Patients_AdapterNew(Context context, ArrayList<Patients>arrayList)
    {
        this.context=context;
        this.list=arrayList;
    }
    @NonNull
    @Override
    public Patients_AdapterNew.NotificationHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(context);
        View view=layoutInflater.inflate(R.layout.item_patient_layout,parent,false);
        return new Patients_AdapterNew.NotificationHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationHolder holder, int position) {
        final Patients ap=list.get(position);
        if((position%2)!=0){
            holder.itemView.setBackgroundColor(Color.parseColor("#25293b"));
        }
        else {
            holder.itemView.setBackgroundColor(Color.parseColor("#2a323c"));
        }
        holder.p_name.setText(ap.getPatientName());
        holder.age.setText(ap.getAge());
        holder.bloodgp.setText(ap.getBloodGroup());
        if(ap.getGender()!=null){
        if(ap.getGender().equalsIgnoreCase("0")&&ap.getGender()!=null)
        {
            holder.gender.setText("Female");

        }else if(ap.getGender().equalsIgnoreCase("1")){
            holder.gender.setText("Male");
        }else {
            holder.gender.setText("Other");
        }}else {
            holder.gender.setText("");
        }

        holder.bed.setText(ap.getBed_Number());
    }
    @Override
    public int getItemCount() {
        return list.size();
    }

    public class NotificationHolder extends RecyclerView.ViewHolder {
        Lato_Regular_Font p_name,age,bloodgp,gender,bed;
        public NotificationHolder(@NonNull View itemView) {
            super(itemView);
            p_name=itemView.findViewById(R.id.p_name);
            age=itemView.findViewById(R.id.age);
            bloodgp=itemView.findViewById(R.id.hospital);
            gender=itemView.findViewById(R.id.roomNo);
            bed=itemView.findViewById(R.id.bedNo);

        }
    }
}
