package com.monitor.dialogs;

import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;


import com.monitor.R;
import com.monitor.util.Comman;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by ZXX on 2015/12/30.
 */
public class BluetoothDeviceAdapter extends BaseAdapter
{

    private LayoutInflater mInflater;
    private ArrayList<BluetoothDevice> mDevices;
    private HashMap<String, Integer> mRssiMap;

    public BluetoothDeviceAdapter(Context context, ArrayList<BluetoothDevice> devices)
    {
        this.mInflater = LayoutInflater.from(context);
        this.mDevices  = devices;
//        this.notifyDataSetChanged();
        Comman.log("BLUETOOth","BluetoothDeviceAdapter666666666666666666666");

    }

    @Override
    public int getCount() {
        return mDevices.size();
    }

    @Override
    public Object getItem(int position) {
        return mDevices.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        BluetoothDevice dev = mDevices.get(position);

        LinearLayout llItem = null;
        if(convertView != null)
        {
            llItem = (LinearLayout) convertView;
        }
        else
        {
            llItem  = (LinearLayout) mInflater.inflate(R.layout.devices_dialog_bluetooth_item,null);
        }
        Comman.log("BLUETOOth","BluetoothDeviceAdapter77777777777777"+dev.getAddress());
        TextView tvName = (TextView) llItem.findViewById(R.id.tvBtItemName);
        TextView tvAddr = (TextView) llItem.findViewById(R.id.tvBtItemAddr);
        tvName.setText(dev.getName());
        tvAddr.setText("MAC: "+dev.getAddress());
//        Log.d("BL...... SearchDevicesDialog(",dev.getName());

        return llItem;
    }
    public  void update(ArrayList<BluetoothDevice> devices)
    {
        Comman.log("BLUETOOth",":INsideUPDATE---"+this.mDevices.size());
//     this.mDevices.addAll(devices);
     this.notifyDataSetChanged();
        Comman.log("BLUETOOth",":INsideUPDATE---1--"+this.mDevices.size());

    }
}
