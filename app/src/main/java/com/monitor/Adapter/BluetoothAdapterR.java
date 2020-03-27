package com.monitor.Adapter;

import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.monitor.R;
import com.monitor.activities.MainActivity;
import com.monitor.activities.UserDisplayActivity;
import com.monitor.http.Model.All_Hospital;
import com.monitor.http.Model.All_Patients;
import com.monitor.widget.Lato_Regular_Font;

import java.util.ArrayList;
import java.util.HashMap;

public class BluetoothAdapterR extends RecyclerView.Adapter<BluetoothAdapterR.NotificationHolder> {
    private LayoutInflater mInflater;
    private ArrayList<BluetoothDevice> mDevices;
    private HashMap<String, Integer> mRssiMap;
    Context context;
    public BluetoothAdapterR(Context context, ArrayList<BluetoothDevice> devices)
    {
        this.mInflater = LayoutInflater.from(context);
        this.mDevices  = devices;
        this.context=context;
    }
    @NonNull
    @Override
    public BluetoothAdapterR.NotificationHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater=LayoutInflater.from(context);
        View view=layoutInflater.inflate(R.layout.devices_dialog_bluetooth_item,parent,false);
        return new BluetoothAdapterR.NotificationHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationHolder holder, int position) {
        BluetoothDevice dev = mDevices.get(position);
        holder.tvName.setText(dev.getName());
       holder.tvAddr.setText("MAC: "+dev.getAddress());
    }
    @Override
    public int getItemCount() {
        return mDevices.size();
    }

    public class NotificationHolder extends RecyclerView.ViewHolder {
        TextView tvName ;
        TextView tvAddr;
        public NotificationHolder(@NonNull View itemView) {
            super(itemView);
            tvName=(TextView) itemView.findViewById(R.id.tvBtItemName);
            tvAddr=(TextView) itemView.findViewById(R.id.tvBtItemAddr);
        }
    }
}
