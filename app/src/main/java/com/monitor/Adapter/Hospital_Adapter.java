package com.monitor.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.monitor.R;
import com.monitor.http.Model.All_Hospital;
import com.monitor.widget.Lato_Regular_Font;

import java.util.ArrayList;

public class Hospital_Adapter extends RecyclerView.Adapter<Hospital_Adapter.NotificationHolder> {
    ArrayList<All_Hospital >list;
    Context context;
    public Hospital_Adapter(Context context, ArrayList<All_Hospital>arrayList)
    {
        this.context=context;
        this.list=arrayList;
    }
    @NonNull
    @Override
    public Hospital_Adapter.NotificationHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(context);
        View view=layoutInflater.inflate(R.layout.item_hospital_layout,parent,false);
        return new Hospital_Adapter.NotificationHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationHolder holder, int position) {
        All_Hospital hp=list.get(position);
        holder.h_name.setText(hp.getHospital_name());
        holder.no.setText(hp.getPatient_count());
        holder.hospital.setText(hp.getHospital_name());


    }



    @Override
    public int getItemCount() {
        return list.size();
    }

    public class NotificationHolder extends RecyclerView.ViewHolder {
        Lato_Regular_Font h_name,no,hospital;
        public NotificationHolder(@NonNull View itemView) {
            super(itemView);
            h_name=itemView.findViewById(R.id.p_name);
            no=itemView.findViewById(R.id.age);
            hospital=itemView.findViewById(R.id.hospital);

        }
    }
}
