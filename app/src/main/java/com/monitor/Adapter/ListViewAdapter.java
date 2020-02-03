package com.monitor.Adapter;

import android.content.Context;
import android.database.DataSetObserver;
import android.icu.text.SimpleDateFormat;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ListAdapter;

import androidx.annotation.RequiresApi;

import com.monitor.R;
import com.monitor.widget.Lato_Regular;
import com.monitor.widget.Lato_Regular_Font;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;


public class ListViewAdapter implements ListAdapter {
    Context context;
    String id="";
    JSONArray jsonArray;
   public ListViewAdapter(Context context, JSONArray jsonArray)
   {
       this.context=context;
       this.jsonArray=jsonArray;
   }
    @Override
    public boolean areAllItemsEnabled() {
        return false;
    }

    @Override
    public boolean isEnabled(int position) {
        return false;
    }

    @Override
    public void registerDataSetObserver(DataSetObserver observer) {

    }

    @Override
    public void unregisterDataSetObserver(DataSetObserver observer) {

    }

    @Override
    public int getCount() {
        return jsonArray.length();
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        LayoutInflater layoutInflater=LayoutInflater.from(context);
        if(convertView==null) {
            convertView = layoutInflater.inflate(R.layout.list_layout, parent, false);
            Lato_Regular name,date;
            Lato_Regular_Font msg;
            name=convertView.findViewById(R.id.name);
            date=convertView.findViewById(R.id.date);
            msg=convertView.findViewById(R.id.msg);

            try {
                if(jsonArray.getJSONObject(position).has("PatientName")&& jsonArray.getJSONObject(position).getString("PatientName")!=null)
                name.setText("P Name:-"+jsonArray.getJSONObject(position).getString("PatientName"));
                if(jsonArray.getJSONObject(position).has("dateCreate")&& jsonArray.getJSONObject(position).getString("dateCreate")!=null)
                date.setText("Date :-"+setDate(jsonArray.getJSONObject(position).getString("dateCreate")));
                if(jsonArray.getJSONObject(position).has("text")&& jsonArray.getJSONObject(position).getString("text")!=null)
                msg.setText("Message :-"+jsonArray.getJSONObject(position).getString("text"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return convertView;
    }
    @Override
    public int getItemViewType(int i) {
        return 1;
    }

    @Override
    public int getViewTypeCount() {
       if(jsonArray.length()<=0){
           return 1;
       }
        return jsonArray.length();
    }

    @Override
    public boolean isEmpty() {
        return false;
    }
    @RequiresApi(api = Build.VERSION_CODES.N)
    public String setDate(String date)
    {
        SimpleDateFormat input = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        SimpleDateFormat output = new SimpleDateFormat("dd/MM/yyyy");

        Date d = new Date();
        try {
            d = input.parse(date);
        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        String formatted="";
        if(output.format(d)!=null)
            formatted= output.format(d);
        return formatted;
    }
}