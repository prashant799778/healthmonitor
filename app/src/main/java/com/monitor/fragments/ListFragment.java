package com.monitor.fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ProgressBar;

import com.monitor.Adapter.DashboardAdapter;
import com.monitor.R;
import com.monitor.http.Model.LiveModel;
import com.monitor.http.Model.PatientDetail;
import com.monitor.http.Model.Result;
import com.monitor.util.Comman;
import com.monitor.util.MySharedPrefrence;
import com.monitor.util.ResultListener;
import com.monitor.widget.Lato_Regular_Font;

import org.eclipse.paho.client.mqttv3.MqttAsyncClient;

import java.util.ArrayList;


public class ListFragment extends Base_Fragment {
    ArrayList<PatientDetail> list;
    LinearLayoutManager manager;
    RecyclerView recyclerView;
    ProgressBar progressBar;
    LinearLayout v;
    Result result;
    public static MqttAsyncClient client;
    MySharedPrefrence sharedPrefrence;
    public ListFragment(Result result)
    {    super();
        Comman.log("ArraySize",""+result.getPatientDetails().size());
        this.list=new ArrayList<>();
        this.result=result;
        this.list= (ArrayList<PatientDetail>) result.getPatientDetails();
    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view=inflater.inflate(R.layout.fragment_list, container, false);
        progressBar=view.findViewById(R.id.pb);
        sharedPrefrence = MySharedPrefrence.instanceOf(getContext());
        manager=new LinearLayoutManager(getContext());
        recyclerView=view.findViewById(R.id.reclycle);
        recyclerView.setLayoutManager(manager);
        v=view.findViewById(R.id.v);
        DashboardAdapter adapter=new DashboardAdapter(getContext(),list,String.valueOf(result.getHospitalId()),String.valueOf(result.getHubId()),sharedPrefrence.getDoctorId(),getActivity(),result.getHospitalName());
        recyclerView.setAdapter(adapter);
        adapter.notifyDataSetChanged();
        return view;
    }
}